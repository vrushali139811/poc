
import { useDrop } from 'react-dnd';





interface DropProps {
  index: number;
  onDrop: (item: any, index: any) => void;  // Define the type for `item` based on your needs
  one: any;  // Adjust the type according to what `one` is supposed to be
}




const DroppableArea: React.FC<DropProps> = ({ index, onDrop, one }) => {

  const [, drop] = useDrop(() => ({
    accept: 'item',
    drop: (item) => onDrop(item, index),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }), [onDrop]);


  return (
    <div
      ref={drop}
      id='de'
      style={{
        border: `2px solid #F1CDAB`,
        padding: 5,
        display: "flex",
        justifyContent: "center",
        alignItems: 'center',
        transform: index < 3 ? 'rotate(180deg)' : 'none',
        borderRadius: 8,
        height: '100%',
        width: '100%',
        backgroundColor:"#01003E"

      }}>
      {one.image ? <img src={one?.image?.image} key={one.id} style={{
        width: document.getElementById('de')?.offsetWidth - 20,
        height: document.getElementById('de')?.offsetHeight - 20,
        objectFit: 'contain',
      }} />:<p style={{color:"white",fontSize:10,opacity:'0.5'}}>Drag and drop the topics from above timeline for more details</p>}

    </div>
  );
};

export default DroppableArea