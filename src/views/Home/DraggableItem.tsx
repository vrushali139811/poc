
import style from './Home.module.scss';
import {  useDrag,  } from 'react-dnd';




interface MyComponentProps {
  image: string;         // Assuming image is a URL or path to an image
  id: number;            // Assuming id is a unique identifier, probably a string
  list: Array<any>;   // Assuming list is an array of strings; adjust if needed
  index: number;         // Assuming index is a numeric index
}






const DraggableItem: React.FC<MyComponentProps> = ({ image, id, list, index }) => {
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