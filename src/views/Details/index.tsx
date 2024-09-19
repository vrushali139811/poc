import Header from "views/Header"
import styles from './Details.module.scss'
import { useEffect, useRef, useState } from "react"
import DataTable from "components/DataTable"

interface TimelineDetail {
    title: string;  // Assuming title is a string, adjust as necessary
}

interface DataProps {
    title: string;  // Main title
    central_timeline_details_lists?: TimelineDetail[]; // Array of timeline details
    list?:any[]
}

interface dimensionProps {
    width:number,
    height:number
}

interface DetailsProps {
    data: DataProps; // Define data as the above structure
    dimensions:dimensionProps
}





const Details: React.FC<DetailsProps> =  ({ data, dimensions }) => {
    const parentRef = useRef(null);
    const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
    


    const getColumns=()=>{
        
    let columns= Object.keys(data?.list?.[0]?.table?.content?.[0])?.map(one=>{
      
            return{
                 header:one.toUpperCase(),
                 accessorKey:one
            }
        })
   
        return columns
    }

    useEffect(() => {
        if(data?.list?.[0]?.image?.url){
        const handleResize = () => {
            if (parentRef.current) {
                const { offsetWidth, offsetHeight } = parentRef.current;

                setImageDimensions({ width: offsetWidth, height: offsetHeight });
            }
        };

        // Set initial dimensions
        handleResize();

        // Update dimensions on window resize
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }
    }, []);
   
    return (
        <div>
            <Header title={data?.title} />
           
            <div style={{ overflow: "scroll", paddingBottom: 20, maxHeight: dimensions.height - 100 }} className={styles.scrollContainer}
>
            <div className={styles.container}>
                    <ul className={styles.list}>
                        {data?.list?.[0]?.bullet_points?.map((item:any, index:number) => (
                            <div style={{ display: "flex", flexDirection: "row" }}>

                                <li key={index} className={styles.listItem}>

                                    {item.
                                        description
                                    }</li>
                            </div>
                        ))}
                    </ul>
                    {data?.list?.[0]?.image?.url && <div className={styles.image}  ref={parentRef}>
                        <img src={`http://192.168.105.118:8081${data?.list?.[0]?.image?.url}`} style={{
                            width: imageDimensions.width,
                            height: imageDimensions.height,
                            objectFit: 'cover', // Adjusts how the image fills the space
                            borderRadius:15
                           
                        }} />
                    </div>}
                    </div>
                    {/* {data?.list?.[0]?.table&& <DataTable data={data?.list?.[0]?.table.content} columns={getColumns()}/>} */}
                        
                
                </div>
              
          

        </div>
    )
}

export default Details