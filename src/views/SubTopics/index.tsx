import Header from "views/Header"
import style from './subTopics.module.scss'








const SubTopic=({data})=>{
    return(
        <div>
         <Header title={data?.title}/>
         <div className={style.gridContainer}>
         {data?.central_timeline_details_lists?.map((one:any)=>(
            <div  className={style.topic}><p className={style.topicName}>{one?.title}</p></div>
         ))}
         </div>
        </div>
    )
}

export default SubTopic