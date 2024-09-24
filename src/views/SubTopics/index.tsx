import Header from 'views/Header';
import styles from './subTopics.module.scss';
import { memo, useLayoutEffect, useRef, useState } from 'react';
import axios from 'axios';

interface TimelineDetail {
  title: string;
}

interface DataProps {
  title: string;
  central_timeline_details_lists?: TimelineDetail[];
}

interface dimensionProps {
  width: number;
  height: number;
}

interface SubTopicProps {
  data: DataProps;
  dimensions?: dimensionProps;
  onClick?: (data: any, index: number) => void;
  index: number;
  step: number;
  onBackHandler?: () => void;
}

const SubTopic: React.FC<SubTopicProps> = ({ data, onClick, index, step, onBackHandler }) => {
  console.log('subtopic');
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const divRef = useRef(null);

  const onClickHandler = async (one: number) => {
    try {
      const { data } = await axios.get(`http://192.168.105.118:8081/api/central-timeline/${one}`);

      onClick?.(data, index);
    } catch (e) {
      console.log(e);
    }
  };

  useLayoutEffect(() => {
    const updateDimensions = () => {
      if (divRef.current) {
        const { clientWidth, clientHeight } = divRef.current;
        setDimensions({ width: clientWidth, height: clientHeight });
      }
    };

    window.addEventListener('resize', updateDimensions);
    updateDimensions();

    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, [data]);

  return (
    <div style={{ height: '100%', width: '100%' }} ref={divRef}>
      <Header title={data?.title} step={step} onBackHandler={onBackHandler} />
      <div
        style={{ overflowY: 'scroll', paddingBottom: 20, maxHeight: dimensions.height * 0.7, width: dimensions.width }}
        className={styles.scrollContainer}
      >
        <div className={styles.gridContainer}>
          {data?.central_timeline_details_lists?.map((one: any, index) => (
            <div
              key={index}
              className={styles.topic}
              onClick={() => {
                onClickHandler(one.id);
              }}
            >
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

export default memo(SubTopic);
