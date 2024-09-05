
import CurvedTextCanvas from './CurvedTextCanvas';
import CurvedText from './CurvedText';
import style from './Home.module.scss';
import { useDrag, } from 'react-dnd';




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


    <div
      ref={drag}

      style={{
        opacity: isDragging ? 0.9 : 1,
        cursor: 'move',
        padding: 5,
        display: "flex",
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: '100px',
        transition: 'opacity 0.3s ease',
        marginLeft: 20,
        marginRight:20,
        paddingTop:20,paddingBottom:20,

      }}
    >

      <div style={{ position: "relative" }}>


        <img src={image.image} className={style.imageRotation} alt='' style={{ height: '50px', width: '50px', borderRadius: '80px', objectFit: "cover", border: '2px solid #F1CDAB', position: 'relative',zIndex:10 }} />


        <div style={{ position: "absolute", left: "-40%", bottom: "-40%" }}>
          <CurvedText text='karvan' />
        </div>
      </div>






    </div>




  );
};


export default DraggableItem