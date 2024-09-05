import { useState } from 'react';
import style from './Home.module.scss';
import { DndProvider, } from 'react-dnd';
import DroppableArea from './DroppableArea';
import DraggableItem from './DraggableItem';
import { TouchBackend } from 'react-dnd-touch-backend';
import imageOne from 'assets/images/img1.png'
import imageTwo from 'assets/images/img2.png'
import imageThree from 'assets/images/img3.png'
import imageFour from 'assets/images/img4.png'
import imageFive from 'assets/images/img5.png'
import imageSix from 'assets/images/img6.png'
import imageSeven from 'assets/images/img7.png'

const images = [
  { id: 1, image: imageOne, name: "Kalachakra" },
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
  {},
  {},
  {},
  {},
  {},
  {}
];

const Home = () => {

  const [list, setList] = useState(data)

  const handleDrop = (item: any, index: any) => {
    setList((prev) => {
      const deepList = JSON.parse(JSON.stringify(prev))
      deepList[index] = item
      return deepList
    })
  };

  return (
    <DndProvider backend={TouchBackend}>
      <div className={style.HomeContainer}>
        <div className={style.container}>
          <div className={style.flexColumnContainer}>
            <div className={style.flexContainer}>
              {list.map((one, index) => index < 3 && (
                <DroppableArea key={index} one={one} index={index} onDrop={handleDrop} />
              ))}
            </div>
            <div className={style.relativePosition}>
              <div className={style.scrollContainer}>
                <div className={style.pot} >
                  {images.map((image, index) => (
                    <div className={style.potItem}>
                      <p className={[style.textStyle, style.rotatedText].join(" ")}>Karvan</p>
                      <DraggableItem key={image.id} id={image.id} image={image} index={index} list={images} />
                      <p className={style.textStyle}>Karvan</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className={style.divider}></div>
            </div>
            <div className={style.flexSpaceBetween}>
              {list.map((one, index) => index > 2 && (
                <DroppableArea key={index} one={one} index={index} onDrop={handleDrop} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default Home;
