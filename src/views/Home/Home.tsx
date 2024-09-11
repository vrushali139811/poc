// import { useEffect, useState } from 'react';
// import style from './Home.module.scss';
// import { DndProvider, } from 'react-dnd';


import imageOne from 'assets/images/img1.png'
import imageTwo from 'assets/images/img2.png'
import imageThree from 'assets/images/img3.png'
import imageFour from 'assets/images/img4.png'
import imageFive from 'assets/images/img5.png'
import imageSix from 'assets/images/img6.png'
import imageSeven from 'assets/images/img7.png'



// const images = [
//   { id: 1, image: imageOne, name: "Kalachakra" },
//   { id: 2, image: imageTwo },
//   { id: 3, image: imageThree },
//   { id: 4, image: imageFour },
//   { id: 5, image: imageFive },
//   { id: 6, image: imageSix },
//   { id: 7, image: imageSeven },
//   { id: 8, image: 'http://192.168.105.118:8081/uploads/medium_2_2_Rishabhadev_result_846f18d6aa.jpg' },
//   { id: 9, image: imageFive },
//   { id: 10, image: imageSix },
//   { id: 11, image: imageSeven },
//   { id: 12, image: imageOne },
//   { id: 13, image: imageTwo },
//   { id: 14, image: imageThree },
//   { id: 15, image: imageFour },
//   { id: 16, image: imageFive },
//   { id: 17, image: imageSix },
//   { id: 18, image: imageSeven },
//   { id: 19, image: 'http://192.168.105.118:8081/uploads/medium_2_2_Rishabhadev_result_846f18d6aa.jpg' },
//   { id: 20, image: imageFive },
//   { id: 21, image: imageSix },
//   { id: 22, image: imageSeven },

// ];

// const data = [
//   {},
//   {},
//   {},
//   {},
//   {},
//   {}
// ];

// const Home = () => {

//   const [list, setList] = useState(data)

//   const handleDrop = (item: any, index: any) => {
//     setList((prev) => {
//       const deepList = JSON.parse(JSON.stringify(prev))
//       deepList[index] = item
//       return deepList
//     })
//   };

//   useEffect(()=>{
//     interact('.draggable-item')
//     .draggable({
//       enabled: true,

//       onmove: (event) => {

//         const { target, dx, dy } = event;
//         target.style.transform = `translate(${dx}px, ${dy}px)`;
//       },
//       modifiers: [
//         interact.modifiers.restrictRect({
//           restriction: 'parent',
//           endOnly: true
//         })
//       ],
//       inertia: true
//     });


//     interact('.drop-container')
//     .dropzone({
//       accept: '.draggable-item',
//       listeners: {
//         drop(event) {
//           const draggedElement = event.relatedTarget;
//           const dropContainer = event.target;
//           dropContainer.innerHTML = ''; // Clear existing content

//           // Create a new image element
//           const img = document.createElement('img');
//           img.src = draggedElement.querySelector('img').src;
//           img.alt = 'Dropped Image';
//           img.className = 'content';

//           // Append the image to the drop container
//           dropContainer.appendChild(img);

//           // Optional: Update state if needed
//           const itemId = draggedElement.getAttribute('data-id');
//           setList(prev => {
//             const updatedList = [...prev];
//             // Assuming that the drop container index corresponds to the item index
//             const dropIndex = Number(dropContainer.getAttribute('data-index'));
//             updatedList[dropIndex] = { id: itemId, image: img.src };
//             return updatedList;
//           });
//         }
//       }
//     });
//   },[])

//   return (
//     <DndProvider backend={TouchBackend}>
//       <div className={style.HomeContainer}>
//         <div className={style.container}>
//           <div className={style.flexColumnContainer}>
//             <div className={style.flexContainer}>
//               {list.map((one, index) => index < 3 && (
//                 <DroppableArea key={index} one={one} index={index} onDrop={handleDrop} />
//               ))}
//             </div>
//             <div className={style.relativePosition}>
//               <div className={style.scrollContainer} style={{overflow:'scroll'}}>
//                 <div className={style.pot} >
//                   {images.map((image, index) => (
//                     <div className={style.potItem}>
//                       <p className={[style.textStyle, style.rotatedText].join(" ")}>Sumathinath</p>
//                       <DraggableItem key={image.id} id={image.id} image={image} index={index} list={images} />
//                       <p className={style.textStyle}>Sumathinath</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//               <div className={style.divider}></div>
//             </div>
//             <div className={style.flexSpaceBetween}>
//               {list.map((one, index) => index > 2 && (
//                 <DroppableArea key={index} one={one} index={index} onDrop={handleDrop} />
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </DndProvider>
//   );
// };

// export default Home;




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
  // { id: 10, image: imageSix },
  // { id: 11, image: imageSeven },
  // { id: 12, image: imageOne },
  // { id: 13, image: imageTwo },
  // { id: 14, image: imageThree },
  // { id: 15, image: imageFour },
  // { id: 16, image: imageFive },
  // { id: 17, image: imageSix },
  // { id: 18, image: imageSeven },
  { id: 19, image: 'http://192.168.105.118:8081/uploads/medium_2_2_Rishabhadev_result_846f18d6aa.jpg' },
  { id: 20, image: imageFive },
  { id: 21, image: imageSix },
  { id: 22, image: imageSeven },

];





import { useState, useEffect, useRef } from 'react';
import interact from 'interactjs';
import style from './Home.module.scss'

import CurvedText from './CurvedText';



const data = [
  {},
  {},
  {},
  {},
  {},
  {}
];


const Home = () => {
  const [circles, setCircles] = useState([]);
  const [dropZones, setDropZones] = useState(data);

  const drop = useRef(null)


  const getDimensions = (index:number) => {
    const element = document.getElementById(`drop_container_${index}`);
    
    if (!element) {
      console.error(`Element with ID drop_container_${index} not found.`);
      return { width: 0, height: 0 }; // Default values or handle as needed
    }
  
    const width = (element.offsetWidth - 20) || 0;
    const height = (element.offsetHeight - 20) || 0;
  
    return { width, height };
  };


  useEffect(() => {


    const generatedCircles: any = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      text: `Text ${i + 1}`,
      imgSrc: images[Math.floor(Math.random() * images.length)]
    }));
    setCircles(generatedCircles);

    // Auto-scroll functionality


  }, []);

  useEffect(() => {
    interact('.box').draggable({
     
      enabled: true,



      // autoScroll: true,
      onmove: (event) => {
       
   

        const { target, dx, dy } = event;
        const x = (parseFloat(target.getAttribute('data-x')) || 0) + dx;
        const y = (parseFloat(target.getAttribute('data-y')) || 0) + dy;

        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);

      },

      modifiers: [
        interact.modifiers.restrictRect({

          endOnly: true
        })
      ],
      inertia: true
    });

    



    interact('.drop_container').dropzone({
      accept: '.box',

      ondrop: (event) => {
        const draggedElement = event.relatedTarget;
        const item = draggedElement.getAttribute('data-circle')
        const dropContainer = event.target;
        const id = dropContainer.getAttribute('data-id')

        setDropZones((prev) => {
          const deepList = JSON.parse(JSON.stringify(prev))

          deepList[id] = JSON.parse(item)

          return deepList
        })
       
        // Ensure the image copy exists before trying to remove it
        const imageCopy = document.querySelector('.image-copy');
        if (imageCopy) {
          imageCopy.remove();
        }




      },
      ondragenter: (event) => {
        const dropContainer = event.target;
        dropContainer.classList.add('highlight');
      },

      ondragleave: (event) => {
        const dropContainer = event.target;

        dropContainer.classList.remove('highlight');
      }
    });
    return () => {
      interact('.box').unset();
      interact('.drop_container').unset();
    };
  }, []);



  return (

    <div className={style.HomeContainer}>
      <div className={style.container}>
        <div className={style.flexColumnContainer}>
          <div className={["drop_zones", style.flexContainer].join(' ')} >
            {dropZones.map((zoneId: any, index) => {
              const dimensions = getDimensions(index);
               return index < 3 && (


              <div key={index} id={`drop_container_${index}`} ref={drop} data-id={index} style={{
                border: `2px solid #F1CDAB`,
                padding: 5,
                display: "flex",
                justifyContent: "center",
                alignItems: 'center',
                transform: index < 3 ? 'rotate(180deg)' : 'none',
                borderRadius: 8,
                height: '100%',
                width: '100%',
                backgroundColor: "#01003E"

              }} className="drop_container">
                {zoneId.imgSrc ? <img src={zoneId?.imgSrc?.image} key={index} style={{
                  width:dimensions.width,
                  height:dimensions.height,
                  objectFit: 'contain',
                }} /> : <p style={{ color: "white", fontSize: 10, opacity: '0.5' }}>Drag and drop the topics from above timeline for more details</p>}
              </div>
            )})}
          </div>
          <div className={[style.relativePosition].join(' ')} >
            <div className={style.scrollContainer} style={{ overflow: "auto" }}>
              <div id="circle-container" className={["circle-container", style.pot].join(' ')} >
                {circles.map((circle: any, index) => (
                  <div className={style.potItem} key={index}>
                    <p className={[style.textStyle, style.rotatedText].join(" ")}>Sumathinath</p>
                    <div key={index} className="box"
                      data-circle={JSON.stringify(circle)} 
                      data-x="0"
                      data-y="0"
                      >
                      <div

                        style={{


                          padding: 5,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: 'center',
                          borderRadius: '100px',
                          transition: 'opacity 0.3s ease',
                          marginLeft: 20,
                          marginRight: 20,
                          paddingTop: 20, paddingBottom: 20,
                          cursor: 'move',
                         
                          touchAction: "none"
                        }}
                        className={'draggable-item'}
                      >
                        <div style={{ position: "relative" }} className="circle">
                          <img src={circle.imgSrc?.image} className={style.imageRotation} alt='' style={{ height: '50px', width: '50px', borderRadius: '80px', objectFit: "cover", border: '2px solid #F1CDAB', position: 'relative', zIndex: 10 }} />
                          <div style={{ position: "absolute", left: "-40%", bottom: "-40%" }}>
                            <CurvedText label='Remains from gupta period' />
                          </div>

                          {/* <img src={circle.imgSrc?.image} style={{ height: 50, width: 50, }} alt="Rotating Image" className="content" /> */}
                        </div>
                      </div>

                    </div>
                    <p className={style.textStyle}>Sumathinath</p>
                  </div>
                ))}
              </div>
            </div>
            <div className={style.divider}></div>
          </div>
          <div className={["drop_zones", style.flexSpaceBetween].join(' ')} >
            {dropZones.map((zoneId: any, index) => {
              const dimensions = getDimensions(index);
               return index > 2 && (
              <div key={index} id={`drop_container_${index}`} data-id={index}
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
                  backgroundColor: "#01003E"

                }} className="drop_container">
                {zoneId.imgSrc ? <img src={zoneId?.imgSrc?.image} key={zoneId.id} style={{
                  width:dimensions.width,
                  height: dimensions.height,
                  objectFit: 'contain',
                }} /> : <p style={{ color: "white", fontSize: 10, opacity: '0.5' }}>Drag and drop the topics from above timeline for more details</p>}
              </div>
            )})}
          </div>
        </div>
      </div>
    </div>

  );
};

export default Home;







