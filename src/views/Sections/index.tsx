import SubTopic from "views/SubTopics"
import styles from './section.module.scss'


const Sections=({data,dimensions})=>{
    const renderComponent={
        'details':<div style={{color:"white"}}>Hello I am detail screen</div>,
        'nestedSubTopics':<div style={{color:"white"}}>Hello I am detail screen</div>,
        'subTopics':<SubTopic data={data}/>,
    
    }
    return(
        <div style={{padding:'3%',overflow:"scroll",maxHeight:dimensions?.height-20}} className={styles.scrollContainer}>
            {renderComponent[data?.screenType]}
        </div>
    )
}


export default Sections