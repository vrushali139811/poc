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




const Details: React.FC<DetailsProps> =  ({ data,dimensions:dataDimension }) => {
    const parentRef = useRef(null);
    const divRef = useRef(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
   
    const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
    


    const getColumns=()=>{
        
    let columns= Object.keys(data?.list?.[0]?.table?.content?.[0]).filter(one=>one!=='id')?.map(one=>{
      
            return{
                 header:one.toUpperCase(),
                 accessorKey:one
            }
        })
   
        return columns
    }

    useEffect(() => {
       
        const handleResize = () => {
            if(data?.list?.[0]?.image?.url){
            if (parentRef.current) {
                const { offsetWidth, offsetHeight } = parentRef.current;

                setImageDimensions({ width: offsetWidth, height: offsetHeight });
            }
        }
            if (divRef.current) {
                const { clientWidth, clientHeight } = divRef.current;
                setDimensions({ width: clientWidth, height: clientHeight });
              }
        };
        handleResize();
      

        // Update dimensions on window resize
       
        
          window.addEventListener('resize', handleResize);
         
    }, [data]);
   
    return (
        <div ref={divRef}  style={{height:'100%'}}>
            <Header title={data?.title} />
           
            <div style={{ overflow: "scroll", paddingBottom: 20, maxHeight:dimensions.height*0.75,maxWidth:dimensions.width }} className={styles.scrollContainer}
>
            <div className={styles.container}>
                    <ul className={styles.list} style={{maxHeight: dimensions.height*0.75,overflow:'scroll'}}>
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
                            width: dimensions.width*0.3,
                            height: dimensions.height*0.75,
                            objectFit: 'cover', // Adjusts how the image fills the space
                            borderRadius:15
                           
                        }} />
                    </div>}
                    </div>
                    <div style={{width:dimensions.width,overflowX:"hidden",padding:'2%'}}>
                    {data?.list?.[0]?.table&& <DataTable data={data?.list?.[0]?.table.content} columns={getColumns()}/>}
                    </div>

                        
                
                </div>
              
          

        </div>
    )
}

export default Details