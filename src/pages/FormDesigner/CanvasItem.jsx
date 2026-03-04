import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button } from 'antd';
import { DeleteOutlined, HolderOutlined } from '@ant-design/icons';
import FieldRenderer from './FieldRenderer';

export default function CanvasItem({ field, isSelected, onSelect, onDelete }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: field.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`canvas-item ${isSelected ? 'selected' : ''}`}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
    >
      <div className="canvas-item-handle" {...attributes} {...listeners}>
        <HolderOutlined />
      </div>
      <div className="canvas-item-content">
        <div className="canvas-item-label">
          {field.required && <span className="required-mark">*</span>}
          {field.label}
        </div>
        <FieldRenderer field={field} disabled />
      </div>
      <div className="canvas-item-actions">
        <Button
          type="text"
          size="small"
          danger
          icon={<DeleteOutlined />}
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        />
      </div>
    </div>
  );
}
