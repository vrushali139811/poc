import React, { useState } from 'react';
import style from './Home.module.scss';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';


const images = [
  { id: 1, image: 'https://media.istockphoto.com/id/2153544401/photo/group-of-kazakh-eagle-hunters-riding-horses-in-bayan-olgii-west-mongolia.jpg?s=1024x1024&w=is&k=20&c=Ix4AFt4OCqohgvUITKPazJpqI9NKTy9ES108NsOXBvk=' },
  { id: 2, image: 'https://w7.pngwing.com/pngs/114/579/png-transparent-pink-cross-stroke-ink-brush-pen-red-ink-brush-ink-leave-the-material-text.png' },
  { id: 3, image: 'https://media.istockphoto.com/id/2153544403/photo/group-of-kazakh-eagle-hunters-riding-horses-along-river-bayan-olgii-west-mongolia.jpg?s=1024x1024&w=is&k=20&c=OBXLVMG8vXTvMIWHQg7a7LSnWAYSqeVT3e0bThrpcPc=' }
];

const data = [
  {},
  {},
  {},
  {},
  {},
  {}
];







const DraggableItem = ({ image, id, list, index }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'item',
    item: { id, image },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div style={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: 'center',



    }}>
      <div
        ref={drag}
        className={style.imageRotation}
        style={{
          opacity: isDragging ? 0.9 : 1,
          cursor: 'move',
          border: '2px dotted white',
          padding: 5,
          display: "flex",
          justifyContent: "center",
          alignItems: 'center',
          borderRadius: '100px',
          transition: 'opacity 0.3s ease',
          // width:'100%'
        }}
      >
        <img src={image} alt='' style={{ height: '80px', width: '80px', borderRadius: '80px', objectFit: "cover" }} />

      </div>
      {index !== list.length - 1 && <div style={{ width: '60px', border: '1px dotted white' }}></div>}
    </div>
  );
};


export default DraggableItem