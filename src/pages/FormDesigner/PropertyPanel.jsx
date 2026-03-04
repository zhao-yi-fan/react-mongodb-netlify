import { Input, Switch, InputNumber, Button, Space, Divider, Empty, Typography } from 'antd';
import { PlusOutlined, MinusCircleOutlined, DoubleRightOutlined } from '@ant-design/icons';

const { Text } = Typography;

const TYPES_WITH_OPTIONS = ['radio', 'checkbox', 'select'];
const TYPES_WITH_PLACEHOLDER = ['input', 'textarea', 'number', 'select', 'datepicker'];

export default function PropertyPanel({ field, onUpdate, onCollapse }) {
  if (!field) {
    return (
      <div className="property-panel">
        <div className="panel-header">
          <div className="panel-title">属性配置</div>
          <Button
            type="text"
            size="small"
            icon={<DoubleRightOutlined />}
            onClick={onCollapse}
            className="collapse-btn"
          />
        </div>
        <Empty description="请选择一个字段" image={Empty.PRESENTED_IMAGE_SIMPLE} style={{ marginTop: 60 }} />
      </div>
    );
  }

  const handleOptionChange = (index, key, value) => {
    const newOptions = [...(field.options || [])];
    newOptions[index] = { ...newOptions[index], [key]: value };
    onUpdate({ options: newOptions });
  };

  const addOption = () => {
    const options = [...(field.options || [])];
    const idx = options.length + 1;
    options.push({ label: `选项${idx}`, value: `opt${idx}` });
    onUpdate({ options });
  };

  const removeOption = (index) => {
    const options = [...(field.options || [])];
    options.splice(index, 1);
    onUpdate({ options });
  };

  return (
    <div className="property-panel">
      <div className="panel-header">
        <div className="panel-title">属性配置</div>
        <Button
          type="text"
          size="small"
          icon={<DoubleRightOutlined />}
          onClick={onCollapse}
          className="collapse-btn"
        />
      </div>
      <div className="prop-list">
        <div className="prop-item">
          <Text className="prop-label">组件类型</Text>
          <Input value={field.type} disabled size="small" />
        </div>

        <div className="prop-item">
          <Text className="prop-label">标签名称</Text>
          <Input
            value={field.label}
            onChange={(e) => onUpdate({ label: e.target.value })}
            size="small"
          />
        </div>

        <div className="prop-item">
          <Text className="prop-label">字段名</Text>
          <Input
            value={field.name}
            onChange={(e) => onUpdate({ name: e.target.value })}
            size="small"
          />
        </div>

        {TYPES_WITH_PLACEHOLDER.includes(field.type) && (
          <div className="prop-item">
            <Text className="prop-label">占位文字</Text>
            <Input
              value={field.placeholder}
              onChange={(e) => onUpdate({ placeholder: e.target.value })}
              size="small"
            />
          </div>
        )}

        <div className="prop-item">
          <Text className="prop-label">是否必填</Text>
          <Switch
            checked={field.required}
            onChange={(checked) => onUpdate({ required: checked })}
            size="small"
          />
        </div>

        {field.type === 'rate' && (
          <div className="prop-item">
            <Text className="prop-label">星星数量</Text>
            <InputNumber
              value={field.count || 5}
              min={1}
              max={10}
              onChange={(v) => onUpdate({ count: v })}
              size="small"
              style={{ width: '100%' }}
            />
          </div>
        )}

        {field.type === 'upload' && (
          <div className="prop-item">
            <Text className="prop-label">按钮文字</Text>
            <Input
              value={field.buttonText || '点击上传'}
              onChange={(e) => onUpdate({ buttonText: e.target.value })}
              size="small"
            />
          </div>
        )}

        {TYPES_WITH_OPTIONS.includes(field.type) && (
          <>
            <Divider style={{ margin: '12px 0' }} />
            <Text className="prop-label" style={{ marginBottom: 8, display: 'block' }}>
              选项配置
            </Text>
            {(field.options || []).map((opt, idx) => (
              <div key={idx} className="option-row">
                <Input
                  value={opt.label}
                  onChange={(e) => handleOptionChange(idx, 'label', e.target.value)}
                  placeholder="标签"
                  size="small"
                  style={{ flex: 1 }}
                />
                <Input
                  value={opt.value}
                  onChange={(e) => handleOptionChange(idx, 'value', e.target.value)}
                  placeholder="值"
                  size="small"
                  style={{ flex: 1 }}
                />
                <Button
                  type="text"
                  size="small"
                  danger
                  icon={<MinusCircleOutlined />}
                  onClick={() => removeOption(idx)}
                />
              </div>
            ))}
            <Button
              type="dashed"
              size="small"
              icon={<PlusOutlined />}
              onClick={addOption}
              block
              style={{ marginTop: 8 }}
            >
              添加选项
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
