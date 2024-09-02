
import {  useDrop } from 'react-dnd';



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

interface DropProps {
  index: number;
  onDrop: (item: any,index:any) => void;  // Define the type for `item` based on your needs
  one: any;  // Adjust the type according to what `one` is supposed to be
}




const DroppableArea: React.FC<DropProps> = ({ index, onDrop, one }) => {
  
    const [{ isOver }, drop] = useDrop(() => ({
      accept: 'item',
      drop: (item) => onDrop(item, index),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),[onDrop]);
  
    return (
      <div
        ref={drop}
        style={{
          border: `2px dotted white`,
          padding:5,
          display:"flex",
          justifyContent:"center",
          alignItems:'center',
          transform: index<3 ? 'rotate(180deg)' : 'none',
          borderRadius:8,
           height: '100%',
          width: '100%'
         
        }}>
        {one.image&&<img src={one?.image}  key={one.id} style={{ 
         height:'120px',maxWidth:"200px",
         objectFit:"cover"}} />}
        
      </div>
    );
  };

  export default DroppableArea