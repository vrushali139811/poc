import Header from "views/Header"
import styles from './subTopics.module.scss'








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
    dimensions:dimensionProps
}

const SubTopic: React.FC<SubTopicProps> = ({ data,dimensions }) => {
    return (
        <div>
            <Header title={data?.title} />
            <div style={{overflow:"scroll",paddingBottom:20,}}>
            <div className={[styles.gridContainer,styles.scrollContainer].join(' ')} >
                {data?.central_timeline_details_lists?.map((one, index) => (
                    <div key={index} className={styles.topic}>
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