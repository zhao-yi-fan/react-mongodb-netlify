import { useDroppable } from '@dnd-kit/core';

export default function DroppableCanvas({ children }) {
  const { setNodeRef, isOver } = useDroppable({ id: 'canvas' });

  return (
    <div
      ref={setNodeRef}
      className={`droppable-canvas ${isOver ? 'drag-over' : ''}`}
    >
      {children}
    </div>
  );
}
