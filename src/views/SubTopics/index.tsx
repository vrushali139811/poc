import Header from "views/Header"
import styles from './subTopics.module.scss'
import { useLayoutEffect, useRef, useState } from "react";
import axios from "axios";









interface TimelineDetail {
    title: string;  // Assuming title is a string, adjust as necessary
}

interface DataProps {
    title: string;  // Main title
    central_timeline_details_lists?: TimelineDetail[]; // Array of timeline details
}

interface dimensionProps {
    width:number,
    height:number
}

interface SubTopicProps {
    data: DataProps; // Define data as the above structure
    dimensions?:dimensionProps
    onClick?:(data:any)=>void

}

const SubTopic: React.FC<SubTopicProps> = ({ data,onClick }) => {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const divRef = useRef(null);


    const onClickHandler=async(one:number)=>{
       
      try {
     
        const {data}=await axios.get(`http://192.168.105.118:8081/api/central-timeline/${one}`)
        onClick?.(data) 
      } catch (e) {
        console.log(e)
      }
    }

    useLayoutEffect(() => {
        const updateDimensions = () => {
            if (divRef.current) {
              const { clientWidth, clientHeight } = divRef.current;
              setDimensions({ width: clientWidth, height: clientHeight });
            }
          };
        
          window.addEventListener('resize', updateDimensions);
          updateDimensions(); // Initial update on mount
        
          return () => {
            window.removeEventListener('resize', updateDimensions);
          };
    }, [data]);


  console.log(dimensions.width)


    return (
        <div style={{height:'100%',width:'100%'}} ref={divRef}>
            <Header title={data?.title} />
            <div  style={{overflowY:"scroll",paddingBottom:20,maxHeight:dimensions.height*0.7,width:dimensions.width}} className={styles.scrollContainer}>
            <div className={styles.gridContainer} >
                {data?.central_timeline_details_lists?.map((one:any, index) => (
                    <div key={index} className={styles.topic} onClick={()=>{onClickHandler(one.id)}}>
                        <div className={styles.content}>
                        <p className={styles.topicName}>{one?.title}</p>
                        </div>
                    </div>
                ))}
            </div>
            </div>
        </div>
    );
};

export default SubTopic