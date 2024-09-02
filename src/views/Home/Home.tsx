import  { useState } from 'react';
import style from './Home.module.scss';
import { DndProvider,  } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
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
  { id: 1, image:imageOne  },
  { id: 2, image:imageTwo },
  { id: 3, image: imageThree },
  {id:4,image:imageFour},
  {id:5,image:imageFive},
  {id:6,image:imageSix},
  {id:7,image:imageSeven},
  {id:4,image:imageFour},
  {id:5,image:imageFive},
  {id:6,image:imageSix},
  {id:7,image:imageSeven},

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
  const [items, setItems] = useState(images);
  const [list,setList]=useState(data)

  const handleDrop = (item:any, index:any) => {
  
   setList((prev)=>{
    const deepList=JSON.parse(JSON.stringify(prev))
    console.log(list , '#list')
    console.log(deepList,index,"#deeplist")
    deepList[index]=item
    return deepList
   })
    // Handle drop logic here
  };
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  return (
    <DndProvider backend={ HTML5Backend}>
      <div className={style.HomeContainer}>
        <div className={style.container}>
       
        <div style={{display:"flex",flexDirection:"column",justifyContent:"space-between",width:'100%',overflow:"hidden",whiteSpace:"nowrap"}}>
          <div style={{ display: 'flex', justifyContent: 'space-between',width:'100%',gap:'8rem',height:'100%' }}>
            {list.map((one, index) => index < 3 && (
              <DroppableArea key={index} one={one} index={index} onDrop={handleDrop} />
            ))}
          </div>
          <div className={style.scrollContainer}    style={{height:300,overflow:"scroll" }}>
            <div className={style.pot} style={{display: 'flex',padding:10}}>
            {items.map((image,index) => (
              <DraggableItem key={image.id} id={image.id} image={image.image} index={index} list={items} />
            ))}
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between',width:'100%',gap:'8rem',height:'100%' }}>
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
