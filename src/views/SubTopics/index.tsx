import Header from "views/Header"
import styles from './subTopics.module.scss'








interface TimelineDetail {
    title: string;  // Assuming title is a string, adjust as necessary
}

interface DataProps {
    title: string;  // Main title
    central_timeline_details_lists?: TimelineDetail[]; // Array of timeline details
}

interface SubTopicProps {
    data: DataProps; // Define data as the above structure
}

const SubTopic: React.FC<SubTopicProps> = ({ data }) => {
    return (
        <div>
            <Header title={data?.title} />
            <div className={styles.gridContainer}>
                {data?.central_timeline_details_lists?.map((one, index) => (
                    <div key={index} className={styles.topic}>
                        <p className={styles.topicName}>{one?.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SubTopic