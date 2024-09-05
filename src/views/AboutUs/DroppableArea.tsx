import React from 'react';

interface DropProps {
  index: number;
  onDrop: (item: any, index: number) => void;
  one: any;
  handleTouchEnd?: (e: React.TouchEvent) => void;
}

const DroppableArea: React.FC<DropProps> = ({ index,  one, handleTouchEnd }) => {
  return (
    <div
    data-droppable
    data-index={index}
    style={{
      border: '2px dotted white',
      padding: 5,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      transform: index < 3 ? 'rotate(180deg)' : 'none',
      borderRadius: 8,
      height: '100%',
      width: '100%',
      touchAction: 'none', // Prevent default touch actions
    }}
    onTouchEnd={handleTouchEnd}
    
    >
      {one.image && (
        <img
          src={one?.image}
          alt={`item-${index}`}
          style={{
            // width: document.getElementById('drop')?.offsetWidth-20,
            // height: document.getElementById('drop')?.offsetHeight-20,
            objectFit: 'contain',
          }}
        />
      )}
    </div>
  );
};

export default DroppableArea;
