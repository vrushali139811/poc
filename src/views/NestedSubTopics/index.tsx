import Header from 'views/Header';
import styles from './nestedSubTopics.module.scss';
import { useLayoutEffect, useRef, useState } from 'react';

interface TimelineDetail {
  title: string; // Assuming title is a string, adjust as necessary
}

interface DataProps {
  title: string; // Main title
  central_timeline_details_lists?: TimelineDetail[]; // Array of timeline details
  list: any[];
}

interface dimensionProps {
  width: number;
  height: number;
}

interface SubTopicProps {
  data: DataProps; // Define data as the above structure
  dimensions?: dimensionProps;
  onClick?: (data: any) => void;
  index: number;
  step: number;

  onBackHandler: () => void;
}

interface ICurrentTopic {
  title: string;
  bullet_points: {
    id: number;
    description: string;
  }[];
}

const NestedSubTopic: React.FC<SubTopicProps> = ({ data, step, onBackHandler }) => {
  console.log('nested');
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [currentTopic, setCurrentTopic] = useState<ICurrentTopic | null>(null);
  const divRef = useRef(null);
  const headerRef = useRef(null);
  const [headerDimensions, setHeaderDimension] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    const updateDimensions = () => {
      if (divRef.current) {
        const { clientWidth, clientHeight } = divRef.current;
        setDimensions({ width: clientWidth, height: clientHeight });
      }
      if (headerRef.current) {
        const { clientWidth, clientHeight } = headerRef.current;
        setHeaderDimension({ width: clientWidth * 0.9, height: clientHeight * 0.9 });
      }
    };

    window.addEventListener('resize', updateDimensions);
    updateDimensions(); // Initial update on mount

    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, [data]);

  return (
    <div style={{ height: '100%', width: '100%' }} ref={divRef}>
      <div ref={headerRef}>
        <Header
          title={currentTopic ? currentTopic.title : data?.title}
          step={step}
          onBackHandler={() => {
            if (currentTopic) {
              setCurrentTopic(null);
            } else {
              onBackHandler();
            }
          }}
        />
      </div>
      <div
        style={{
          overflowY: 'scroll',
          paddingBottom: 20,
          maxHeight: (dimensions.height - headerDimensions.height) * 0.92,
          width: dimensions.width,
        }}
        className={styles.scrollContainer}
      >
        {!currentTopic ? (
          <div className={styles.gridContainer}>
            {data?.list?.map((one: any, index: number) => (
              <div key={index} className={styles.topic} onClick={() => setCurrentTopic(one)}>
                <div className={styles.content}>
                  <p className={styles.topicName}>{one?.title}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <ul>
            {currentTopic?.bullet_points?.map((item: any) => {
              return (
                <div>
                  <li key={item.id} className={styles.listItem}>
                    {item.description}
                  </li>
                </div>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default NestedSubTopic;
