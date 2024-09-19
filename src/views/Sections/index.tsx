import SubTopic from "views/SubTopics"
import styles from './section.module.scss'
import Details from "views/Details";

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
        details: <Details data={data} dimensions={dimensions}/>,
        nestedSubTopics: <div style={{ color: "white" }}>Hello, I am the nested sub-topic screen</div>,
        subTopics: <SubTopic data={data} dimensions={dimensions} />,
    };

    const ComponentToRender = renderComponent[data.screenType] || <div style={{ color: "red" }}>Invalid screen type</div>;

    return (
        <div style={{ padding: '3%', }} >
            {ComponentToRender}
        </div>
    );
};

export default Sections;