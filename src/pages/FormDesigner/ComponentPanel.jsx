import { useDraggable } from '@dnd-kit/core';
import { Button } from 'antd';
import { DoubleLeftOutlined } from '@ant-design/icons';
import { COMPONENT_LIST } from './componentConfig';

function DraggableComp({ comp }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `comp-${comp.key}`,
    data: { type: 'component', compKey: comp.key },
  });

  const Icon = comp.icon;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`comp-item ${isDragging ? 'dragging' : ''}`}
    >
      <Icon className="comp-icon" />
      <span>{comp.label}</span>
    </div>
  );
}

export default function ComponentPanel({ onCollapse }) {
  return (
    <div className="component-panel">
      <div className="panel-header">
        <div className="panel-title">组件</div>
        <Button
          type="text"
          size="small"
          icon={<DoubleLeftOutlined />}
          onClick={onCollapse}
          className="collapse-btn"
        />
      </div>
      <div className="comp-grid">
        {COMPONENT_LIST.map((comp) => (
          <DraggableComp key={comp.key} comp={comp} />
        ))}
      </div>
    </div>
  );
}
