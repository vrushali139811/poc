import React from "react";
import style from "./Home.module.css";
function CurvedText({ text }) {
  return (
    <svg id="rotatingText" width="90" height="90" viewBox="0 0 90 90">
      <defs>
        <path
          id="circle"
        
          d="M 45,80
                         a 35,35 0 1,0 0,-70
                         a 35,35 0 1,0 0,70"
        ></path>
      </defs>
      <text fill="black" font-size="10">
        <textPath xlinkHref="#circle">Sumathinath</textPath>
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 45 45"
          to="360 45 45"
          dur="10s"
          repeatCount="indefinite"
        />
      </text>
    </svg>
  );
}

export default CurvedText;


import "./styles.css";
import CurvedText from "./CurvedText";
import style from "./Home.module.css";

export default function App() {
  return (
    <div className="App">
      <img
        src={
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeV9UYsQ7oaGI2enl5tnXiPxUJXTqzSAn_xA&s"
        }
        className={style.imageRotation}
        alt=""
        style={{
          height: "50px",
          width: "50px",
          borderRadius: "80px",
          objectFit: "cover",
          border: "2px solid #F1CDAB",
          position: "relative",
        }}
      />
      <span style={{ position: "absolute", left: "2%", bottom: "70%" }}>
        <CurvedText />
      </span>
    </div>
  );
}





import React from 'react';
import { DndProvider } from 'react-dnd';
import TouchBackend from 'react-dnd-touch-backend';
import styles from './styles.module.css'; // Import the CSS module

const YourComponent = ({ list, images, handleDrop }) => (
  <DndProvider backend={TouchBackend}>
    <div className={styles.HomeContainer}>
      <div className={styles.container}>
        <div className={`${styles.row} ${styles.flexColumn}`}>
          <div className={`${styles.flexRow} ${styles.fullWidth}`}>
            {list.map((one, index) => index < 3 && (
              <DroppableArea key={index} one={one} index={index} onDrop={handleDrop} />
            ))}
          </div>

          <div className={styles.relativeWrapper}>
            <div className={styles.scrollContainer}>
              <div className={styles.pot}>
                {images.map((image, index) => (
                  <div key={image.id} className={styles.potItem}>
                    <p>Karvan</p>

                    <DraggableItem key={image.id} id={image.id} image={image} index={index} list={images} />

                    <p>Karvan</p>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.divider}></div>
          </div>

          <div className={`${styles.flexRow} ${styles.fullWidth}`}>
            {list.map((one, index) => index > 2 && (
              <DroppableArea key={index} one={one} index={index} onDrop={handleDrop} />
            ))}
          </div>
        </div>
      </div>
    </div>
  </DndProvider>
);

export default YourComponent;


