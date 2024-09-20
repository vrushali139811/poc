import SubTopic from "views/SubTopics"
import Details from "views/Details";
import { useEffect, useState } from "react";

interface DataProps {
    screenType: 'details' | 'nestedSubTopics' | 'subTopics' | 'familyOfRishabhDevaTable';
    title: string
    // Add any other properties you need for your data
}

interface MyComponentProps {
    data: DataProps;
    dimensions: { width: number; height: number };
}

const Sections: React.FC<MyComponentProps> = ({ data, dimensions }) => {
    const [screenType, setScreenType] = useState(data.screenType)
    const [currentData, setCurrentData] = useState(data)


    const onSubTopicClickHandler = (data: any) => {
        setCurrentData(data.data.en)
        setScreenType(data.data.en.screenType)
    }

    useEffect(() => {
        setScreenType(data.screenType)
        setCurrentData(data)
    }, [data])

    const renderComponent: { [key in DataProps['screenType']]: JSX.Element | undefined } = {
        details: <Details data={currentData} dimensions={dimensions} />,
        nestedSubTopics: <div style={{ color: "white" }}>Hello, I am the nested sub-topic screen</div>,
        subTopics: <SubTopic data={currentData} dimensions={dimensions} onClick={onSubTopicClickHandler} />,
        familyOfRishabhDevaTable: <div style={{ color: "white" }}> rishabh deva screen</div>,
    };

    const ComponentToRender = renderComponent[screenType] || <div style={{ color: "red" }}>Invalid screen type</div>;



    return (
        <div style={{ padding: '3%', height: '100%' }} >
            {ComponentToRender}
        </div>
    );
};

export default Sections;