import SubTopic from 'views/SubTopics';
import Details from 'views/Details';

import NestedSubTopic from 'views/NestedSubTopics';

interface DataProps {
  screenType: 'details' | 'nestedSubTopics' | 'subTopics' | 'familyOfRishabhDevaTable';
  title: string;
  data: any;
  step: number;
}

interface MyComponentProps {
  data: DataProps;
  dimensions: { width: number; height: number };
  index: number;
  onSubTopicClickHandler: (data: any, index: number) => void;
  onBackHandler: (index: number) => void;
}

const Sections: React.FC<MyComponentProps> = ({ data, dimensions, index, onSubTopicClickHandler, onBackHandler }) => {
  console.log('section', index);
  const renderComponent: { [key in DataProps['screenType']]: JSX.Element | undefined } = {
    details: (
      <Details
        data={data.data}
        dimensions={dimensions}
        step={data.step}
        index={index}
        onBackHandler={() => onBackHandler(index)}
      />
    ),
    subTopics: (
      <SubTopic
        data={data.data}
        index={index}
        dimensions={dimensions}
        onClick={onSubTopicClickHandler}
        onBackHandler={() => onBackHandler(index)}
        step={data.step}
      />
    ),
    familyOfRishabhDevaTable: <div></div>,
    nestedSubTopics: (
      <NestedSubTopic
        data={data.data}
        index={index}
        dimensions={dimensions}
        onBackHandler={() => onBackHandler(index)}
        step={data.step}
      />
    ),
  };

  const ComponentToRender = renderComponent[data.screenType] || <div style={{ color: 'red' }}>Invalid screen type</div>;

  return <div style={{ padding: '3%', height: '100%' }}>{ComponentToRender}</div>;
};

export default Sections;
