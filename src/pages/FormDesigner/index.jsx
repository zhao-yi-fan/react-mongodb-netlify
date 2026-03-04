import { useState, useCallback, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  DndContext,
  DragOverlay,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';
import { Button, Space, message, Modal, Input, Typography } from 'antd';
import {
  SaveOutlined,
  EyeOutlined,
  ExportOutlined,
  ImportOutlined,
  ClearOutlined,
  DoubleLeftOutlined,
  DoubleRightOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import ComponentPanel from './ComponentPanel';
import DroppableCanvas from './DroppableCanvas';
import CanvasItem from './CanvasItem';
import PropertyPanel from './PropertyPanel';
import FormPreviewModal from './FormPreviewModal';
import request from '../../utils/request';
import { COMPONENT_LIST } from './componentConfig';
import './formDesigner.scss';

const { Title } = Typography;

let idCounter = Date.now();
const genId = () => `field_${idCounter++}`;

export default function FormDesigner() {
  const { id: editId } = useParams();
  const navigate = useNavigate();
  const [fields, setFields] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [formName, setFormName] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [saving, setSaving] = useState(false);
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [importJson, setImportJson] = useState('');
  const [leftCollapsed, setLeftCollapsed] = useState(false);
  const [rightCollapsed, setRightCollapsed] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (editId) {
      request.get(`/formById?id=${editId}`).then((res) => {
        const form = res.data;
        setFormName(form.name || '');
        setFormDesc(form.description || '');
        setFields(
          (form.schema || []).map((f) => ({ ...f, id: f.id || genId() }))
        );
      }).catch(() => message.error('加载表单失败'));
    }
  }, [editId]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const selectedField = fields.find((f) => f.id === selectedId) || null;

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);

    const activeType = active.data?.current?.type;

    if (activeType === 'component') {
      const compKey = active.data.current.compKey;
      const template = COMPONENT_LIST.find((c) => c.key === compKey);
      if (!template) return;

      // 必须拖到画布区域（canvas droppable 或已有字段上）才生效
      if (!over) return;
      const isCanvasDrop = over.id === 'canvas' || fields.some((f) => f.id === over.id);
      if (!isCanvasDrop) return;

      const newField = {
        id: genId(),
        type: template.key,
        label: template.label,
        name: `field_${Date.now()}`,
        placeholder: template.defaultPlaceholder || '',
        required: false,
        rules: [],
        options: template.defaultOptions || [],
        ...template.defaultProps,
      };

      const overIndex = fields.findIndex((f) => f.id === over.id);
      if (overIndex >= 0) {
        setFields((prev) => {
          const copy = [...prev];
          copy.splice(overIndex, 0, newField);
          return copy;
        });
      } else {
        setFields((prev) => [...prev, newField]);
      }
      setSelectedId(newField.id);
      return;
    }

    if (!over) return;
    if (active.id !== over.id) {
      setFields((prev) => {
        const oldIndex = prev.findIndex((f) => f.id === active.id);
        const newIndex = prev.findIndex((f) => f.id === over.id);
        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  };

  const handleDeleteField = useCallback(
    (id) => {
      setFields((prev) => prev.filter((f) => f.id !== id));
      if (selectedId === id) setSelectedId(null);
    },
    [selectedId]
  );

  const handleUpdateField = useCallback((id, updates) => {
    setFields((prev) =>
      prev.map((f) => (f.id === id ? { ...f, ...updates } : f))
    );
  }, []);

  const handleSave = async () => {
    if (!formName.trim()) {
      message.warning('请输入表单名称');
      return;
    }
    if (fields.length === 0) {
      message.warning('请至少添加一个表单字段');
      return;
    }
    setSaving(true);
    try {
      const payload = {
        name: formName,
        description: formDesc,
        schema: fields.map(({ id, ...rest }) => ({ id, ...rest })),
      };
      if (editId) payload.id = editId;
      await request.post('/formSave', payload);
      message.success('保存成功');
      setSaveModalOpen(false);
      navigate('/forms');
    } catch (err) {
      message.error(err.error || '保存失败');
    } finally {
      setSaving(false);
    }
  };

  const handleExport = () => {
    const json = JSON.stringify(fields, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `form-schema-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    message.success('导出成功');
  };

  const handleImport = () => {
    try {
      const parsed = JSON.parse(importJson);
      if (!Array.isArray(parsed)) throw new Error();
      setFields(parsed.map((f) => ({ ...f, id: f.id || genId() })));
      setImportModalOpen(false);
      setImportJson('');
      message.success('导入成功');
    } catch {
      message.error('JSON 格式不正确');
    }
  };

  const handleClear = () => {
    Modal.confirm({
      title: '确认清空',
      content: '确定要清空所有字段吗？',
      onOk: () => {
        setFields([]);
        setSelectedId(null);
      },
    });
  };

  const dragOverlayField = activeId
    ? fields.find((f) => f.id === activeId) ||
      (() => {
        const comp = COMPONENT_LIST.find(
          (c) => c.key === activeId?.replace?.('comp-', '')
        );
        return comp ? { type: comp.key, label: comp.label } : null;
      })()
    : null;

  return (
    <div className="form-designer-page">
      <div className="designer-toolbar">
        <Title level={4} style={{ margin: 0 }}>
          {editId ? '编辑表单' : '表单设计器'}
        </Title>
        <Space>
          <Button icon={<EyeOutlined />} onClick={() => setPreviewOpen(true)} disabled={!fields.length}>
            预览
          </Button>
          <Button icon={<ImportOutlined />} onClick={() => setImportModalOpen(true)}>
            导入
          </Button>
          <Button icon={<ExportOutlined />} onClick={handleExport} disabled={!fields.length}>
            导出
          </Button>
          <Button icon={<ClearOutlined />} onClick={handleClear} disabled={!fields.length} danger>
            清空
          </Button>
          <Button type="primary" icon={<SaveOutlined />} onClick={() => setSaveModalOpen(true)} disabled={!fields.length}>
            保存
          </Button>
        </Space>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="designer-body">
          <div className={`designer-left ${leftCollapsed ? 'collapsed' : ''}`}>
            {leftCollapsed ? (
              <div className="collapsed-panel" onClick={() => setLeftCollapsed(false)}>
                <AppstoreOutlined />
                <span className="collapsed-label">组件</span>
                <DoubleRightOutlined className="collapsed-arrow" />
              </div>
            ) : (
              <ComponentPanel onCollapse={() => setLeftCollapsed(true)} />
            )}
          </div>

          <div className="designer-center" ref={canvasRef}>
            <div className="canvas-title">画布</div>
            <DroppableCanvas>
              {fields.length === 0 ? (
                <div className="canvas-empty">从左侧拖拽组件到此处</div>
              ) : (
                <SortableContext items={fields.map((f) => f.id)} strategy={verticalListSortingStrategy}>
                  {fields.map((field) => (
                    <CanvasItem
                      key={field.id}
                      field={field}
                      isSelected={selectedId === field.id}
                      onSelect={() => setSelectedId(field.id)}
                      onDelete={() => handleDeleteField(field.id)}
                    />
                  ))}
                </SortableContext>
              )}
            </DroppableCanvas>
          </div>

          <div className={`designer-right ${rightCollapsed ? 'collapsed' : ''}`}>
            {rightCollapsed ? (
              <div className="collapsed-panel" onClick={() => setRightCollapsed(false)}>
                <SettingOutlined />
                <span className="collapsed-label">属性</span>
                <DoubleLeftOutlined className="collapsed-arrow" />
              </div>
            ) : (
              <PropertyPanel
                field={selectedField}
                onUpdate={(updates) => selectedId && handleUpdateField(selectedId, updates)}
                onCollapse={() => setRightCollapsed(true)}
              />
            )}
          </div>
        </div>

        <DragOverlay>
          {dragOverlayField ? (
            <div className="drag-overlay-item">
              {dragOverlayField.label || dragOverlayField.type}
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      <FormPreviewModal
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        fields={fields}
      />

      <Modal
        title="保存表单"
        open={saveModalOpen}
        onCancel={() => setSaveModalOpen(false)}
        onOk={handleSave}
        confirmLoading={saving}
        okText="保存"
      >
        <div style={{ marginBottom: 16 }}>
          <div style={{ marginBottom: 8, fontWeight: 500 }}>表单名称 *</div>
          <Input
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
            placeholder="请输入表单名称"
          />
        </div>
        <div>
          <div style={{ marginBottom: 8, fontWeight: 500 }}>表单描述</div>
          <Input.TextArea
            value={formDesc}
            onChange={(e) => setFormDesc(e.target.value)}
            placeholder="请输入表单描述（选填）"
            rows={3}
          />
        </div>
      </Modal>

      <Modal
        title="导入 JSON"
        open={importModalOpen}
        onCancel={() => setImportModalOpen(false)}
        onOk={handleImport}
        okText="导入"
      >
        <Input.TextArea
          value={importJson}
          onChange={(e) => setImportJson(e.target.value)}
          placeholder="粘贴表单 JSON 配置..."
          rows={10}
          style={{ fontFamily: 'monospace' }}
        />
      </Modal>
    </div>
  );
}
