import React, { useState, useEffect, useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import imageOne from 'assets/images/img1.png';
import imageTwo from 'assets/images/img2.png';
import imageThree from 'assets/images/img3.png';
import imageFour from 'assets/images/img4.png';
import imageFive from 'assets/images/img5.png';
import imageSix from 'assets/images/img6.png';
import imageSeven from 'assets/images/img7.png';
import DroppableArea from './DroppableArea';
import DraggableItem from './DraggableItem';
import style from './Home.module.scss'

const images = [
  { id: 1, image: imageOne },
  { id: 2, image: imageTwo },
  { id: 3, image: imageThree },
  { id: 4, image: imageFour },
  { id: 5, image: imageFive },
  { id: 6, image: imageSix },
  { id: 7, image: imageSeven },
  { id: 8, image: 'http://192.168.105.118:8081/uploads/medium_2_2_Rishabhadev_result_846f18d6aa.jpg' },
  { id: 9, image: imageFive },
  { id: 10, image: imageSix },
  { id: 11, image: imageSeven },
  { id: 12, image: imageOne },
  { id: 13, image: imageTwo },
  { id: 14, image: imageThree },
  { id: 15, image: imageFour },
  { id: 16, image: imageFive },
  { id: 17, image: imageSix },
  { id: 18, image: imageSeven },
  { id: 19, image: 'http://192.168.105.118:8081/uploads/medium_2_2_Rishabhadev_result_846f18d6aa.jpg' },
  { id: 20, image: imageFive },
  { id: 21, image: imageSix },
  { id: 22, image: imageSeven },
];

const data = [
  {}, {}, {}, {}, {}, {},
];

const AboutUs = () => {
  const [list, setList] = useState(data);
  const [draggingItem, setDraggingItem] = useState(null);

  const handleDrop = (item, index) => {
    setList(prev => {
      const updatedList = [...prev];
      if (updatedList[index] !== undefined) {
        updatedList[index] = item;
      }
      return updatedList;
    });
  };

  const handleTouchStart = (e, item) => {
    e.preventDefault();
    setDraggingItem(item);
  };

  const handleTouchEnd = (e) => {
    e.preventDefault();
    const touchEnd = e.changedTouches[0];
    const touchX = touchEnd.clientX;
    const touchY = touchEnd.clientY;

    const dropZone = document.querySelector('[data-droppable]');
    if (!dropZone) return;

    const rect = dropZone.getBoundingClientRect();
    if (touchX >= rect.left && touchX <= rect.right && touchY >= rect.top && touchY <= rect.bottom) {
      const index = parseInt(dropZone.getAttribute('data-index') || '0', 10);
      handleDrop(draggingItem, index);
    }
    setDraggingItem(null); // Clear dragging item after drop
  };

  useEffect(() => {
    const handleTouchMove = (e) => {
      e.preventDefault();
    };

    document.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  useEffect(() => {
    const handleTouchEndForNonPassive = (e) => {
      e.preventDefault();
      handleTouchEnd(e);
    };

    document.addEventListener('touchend', handleTouchEndForNonPassive, { passive: false });

    return () => {
      document.removeEventListener('touchend', handleTouchEndForNonPassive);
    };
  }, [draggingItem]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={style.HomeContainer}>
     
      </div>
    </DndProvider>
  );
};

export default AboutUs;
