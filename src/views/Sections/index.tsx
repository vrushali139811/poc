import SubTopic from "views/SubTopics"
import styles from './section.module.scss'

interface DataProps {
    screenType: 'details' | 'nestedSubTopics' | 'subTopics';
    title:string
    // Add any other properties you need for your data
}

interface MyComponentProps {
    data: DataProps;
    dimensions: { width: number; height: number };
}

const Sections: React.FC<MyComponentProps> = ({ data, dimensions }) => {
    const renderComponent: { [key in DataProps['screenType']]: JSX.Element | undefined } = {
        details: <div style={{ color: "white" }}>Hello, I am the detail screen</div>,
        nestedSubTopics: <div style={{ color: "white" }}>Hello, I am the nested sub-topic screen</div>,
        subTopics: <SubTopic data={data} />,
    };

    const ComponentToRender = renderComponent[data.screenType] || <div style={{ color: "red" }}>Invalid screen type</div>;

    return (
        <div style={{ padding: '3%', overflow: "scroll", maxHeight: dimensions.height - 20 }} className={styles.scrollContainer}>
            {ComponentToRender}
        </div>
    );
};

export default Sections;