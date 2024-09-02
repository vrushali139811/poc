
import {  useDrop } from 'react-dnd';





interface DropProps {
  index: number;
  onDrop: (item: any,index:any) => void;  // Define the type for `item` based on your needs
  one: any;  // Adjust the type according to what `one` is supposed to be
}




const DroppableArea: React.FC<DropProps> = ({ index, onDrop, one }) => {
  
    const [, drop] = useDrop(() => ({
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
       width: '100%',
       height:'100%',
       objectFit: 'cover',
        }} />}
        
      </div>
    );
  };

  export default DroppableArea