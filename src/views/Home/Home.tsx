
import centralTimeLineList from './mock.json'
import { useState, useEffect, useRef } from 'react';
import interact from 'interactjs';
import style from './Home.module.scss'
import imageFour from 'assets/images/img4.png'

import CurvedText from './CurvedText';
import axios from 'axios'
import Sections from 'views/Sections'

const list = centralTimeLineList?.data



const data = [
  {},
  {},
  {},
  {},
  {},
  {}
];


const Home = () => {
  const [timeLineData,setTimeLineData] = useState(list);
  const [dropZones, setDropZones] = useState(data);
  const [apiInProgress,setApiInProgress]=useState(false)

  const drop = useRef(null)


  const  getCentralTimeLineData=async()=>{
   try {
    setApiInProgress(true)
     const {data}=await axios.get('http://192.168.105.118:8081/api/central-timeline/details')
     setTimeLineData(data?.data)
     setApiInProgress(false)
   } catch (error) {
    console.log(error)
    setApiInProgress(false)
   }
  }


  useEffect(()=>{
     getCentralTimeLineData()
  },[])


  const getDimensions = (index: number) => {
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
        const draggedItem = JSON.parse(draggedElement.getAttribute('data-circle'))
       
        const item=timeLineData?.en?.[draggedItem?.parentId]?.
        central_timeline_elements
        ?.[draggedItem?.id]
        console.log(item)
        const dropContainer = event.target;
        const dropContainerId = dropContainer.getAttribute('data-id')

        setDropZones((prev) => {
          const deepList = JSON.parse(JSON.stringify(prev))

          deepList[dropContainerId] = item
          
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
  }, [timeLineData]);

 if (apiInProgress)  return  <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:'100%'}}><div className={style.loader}></div></div>

  return (

    <div className={style.HomeContainer}>
      <div className={style.container}>
        <div className={style.flexColumnContainer}>
          <div className={["drop_zones", style.flexContainer].join(' ')} >
            {dropZones.map((zone: any, index) => {
              const dimensions = getDimensions(index);
              return index < 3 && (


                <div key={index} id={`drop_container_${index}`} ref={drop} data-id={index} 
                style={{
                 
                  transform: index < 3 ? 'rotate(180deg)' : 'none'}}
              
                 className={["drop_container",style.dropContainer].join(' ')}>
                {Object.keys(zone)?.length ? <Sections data={zone} dimensions={dimensions}/> : <div style={{ color: "white",  opacity: '0.5',display:"flex",justifyContent:"center",alignItems:"center",height:'100%'}} className={style.text}>Drag and drop the topics from above timeline for more details</div>}
             
                </div>
              )
            })}
          </div>
          <div className={[style.relativePosition].join(' ')} >
            <div className={style.scrollContainer} style={{ overflow: "auto",height:'100%' }}>
              <div id="circle-container" className={["circle-container", style.pot].join(' ')} >
                {timeLineData?.en?.map((one: any, index) => (
                  <div className={style.potItem}  key={index}>
                    <p className={[style.textStyle, style.rotatedText].join(" ")}>{one.tabTitle}</p>
                    <div style={{display:"flex",alignItems:"center"}}>
                    {one?.central_timeline_elements?.map((timeline:any,timeLineIndex:number)=>{

                      return(<div key={timeLineIndex} className="box"
                      data-circle={JSON.stringify({id:timeLineIndex,parentId:index})}
                      data-x="0"
                      data-y="0"
                    >
                      <div
                        style={{
                          padding: 5,
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: 'center',
                          borderRadius: '100px',
                          transition: 'opacity 0.3s ease',
                          marginLeft: 20,
                          marginRight: 20, 
                          cursor: 'move',

                          touchAction: "none"
                        }}
                        className={'draggable-item'}
                      >
                        <div style={{ position: "relative" }} className="circle">
                          <img src={timeline?.icon?.url?`http://192.168.105.118:8081${timeline?.icon?.url}`:imageFour} className={style.imageRotation} alt='' style={{ height: '90px', width: '90px', borderRadius: '90px', objectFit: "cover", border: '2px solid #F1CDAB', position: 'relative', zIndex: 10, transform:"rotate(-45deg)" }} />
                          <div style={{ position: "absolute", left: "-28%", bottom: "-26%" }}>
                            <CurvedText label={timeline.iconTitle} />
                          </div>

                          {/* <img src={circle.imgSrc?.image} style={{ height: 50, width: 50, }} alt="Rotating Image" className="content" /> */}
                        </div>
                      </div>

                    </div>)})}
                    </div>
                    <p className={style.textStyle}>{one.tabTitle}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className={style.divider}></div>
          </div>
          <div className={["drop_zones", style.flexSpaceBetween].join(' ')} >
            {dropZones.map((zone: any, index) => {
           
              const dimensions = getDimensions(index);
              return index > 2 && (
                <div key={index} id={`drop_container_${index}`} data-id={index}
                  style={{
                 
                    transform: index < 3 ? 'rotate(180deg)' : 'none',
                   
                  }}
                
                   className={["drop_container",style.dropContainer].join(' ')}>
                {Object.keys(zone)?.length ? <Sections data={zone} dimensions={dimensions}/> : <div style={{ color: "white",  opacity: '0.5',display:"flex",justifyContent:"center",alignItems:"center",height:'100%'}} className={style.text}>Drag and drop the topics from above timeline for more details</div>}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>

  );
};

export default Home;







