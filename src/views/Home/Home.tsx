import centralTimeLineList from './mock.json';
import { useState, useEffect, useRef, useCallback } from 'react';
import interact from 'interactjs';
import style from './Home.module.scss';
import imageFour from 'assets/images/img4.png';
import BackgroundVideo from 'assets/video/background.mp4';
import CurvedText from './CurvedText';
import axios from 'axios';
import Sections from 'views/Sections';
import { cloneDeep, debounce } from 'lodash';

const list = centralTimeLineList?.data;

const data = [{}, {}, {}, {}, {}, {}];

const Home = () => {
  const [timeLineData, setTimeLineData] = useState(list);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollContainerRef = useRef(null);
  const [dropZones, setDropZones] = useState(data);
  const [apiInProgress, setApiInProgress] = useState(false);

  const drop = useRef(null);
  const [animationDirection, setAnimationDirection] = useState('forward');

  const handleScrollStop = useCallback(
    debounce(() => {
      const scrollable: any = scrollContainerRef.current;

      if (scrollable.scrollLeft === 0) {
        setAnimationDirection('forward');
      }
      if (scrollable.scrollLeft + scrollable.clientWidth >= scrollable.scrollWidth - 1000) {
        setAnimationDirection('reverse');
      }
      setIsScrolling(false);
    }, 2000),
    [],
  );

  const handleScroll = () => {
    setIsScrolling(true); // Animation moves forward on scroll
    handleScrollStop();
  };

  const getCentralTimeLineData = async () => {
    try {
      setApiInProgress(true);
      const { data } = await axios.get('http://192.168.105.118:8081/api/central-timeline/details');
      setTimeLineData(data?.data);
      setApiInProgress(false);
    } catch (error) {
      setApiInProgress(false);
    }
  };

  useEffect(() => {
    getCentralTimeLineData();
  }, []);

  const getDimensions = (index: number) => {
    const element = document.getElementById(`drop_container_${index}`);

    if (!element) {
      console.error(`Element with ID drop_container_${index} not found.`);
      return { width: 0, height: 0 }; // Default values or handle as needed
    }

    const width = element.offsetWidth - 20 || 0;
    const height = element.offsetHeight - 20 || 0;

    return { width, height };
  };

  const onSubTopicClickHandler = (data: any, index: number) => {
    const dropList = cloneDeep(dropZones);
    const item: any = dropList[index];
    dropList[index] = {
      screenType: data.data.en.screenType,
      data: data.data.en,
      prevData: item.data,
      step: item.step + 1,
    };
    console.log(dropList);
    setDropZones(dropList);
  };

  const onBackHandler = (index: number) => {
    const dropList = cloneDeep(dropZones);
    const item: any | {} = dropList[index];

    dropList[index] = {
      screenType: item.prevData.screenType,
      data: item.prevData,
      prevData: null,
      step: item.step - 1,
    };

    setDropZones(dropList);
  };

  useEffect(() => {
    interact('.box').draggable({
      enabled: true,

      // autoScroll: true,
      onmove: (event) => {
        const { target, dx, dy } = event;
        const x = (parseFloat(target.getAttribute('data-x')) || 0) + dx;
        const y = (parseFloat(target.getAttribute('data-y')) || 0) + dy;

        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
      },

      modifiers: [
        interact.modifiers.restrictRect({
          endOnly: true,
        }),
      ],
      inertia: true,
    });

    interact('.drop_container').dropzone({
      accept: '.box',

      ondrop: (event) => {
        const draggedElement = event.relatedTarget;
        const draggedItem = JSON.parse(draggedElement.getAttribute('data-circle'));

        const item = timeLineData?.en?.[draggedItem?.parentId]?.central_timeline_elements?.[draggedItem?.id];

        const dropContainer = event.target;
        const dropContainerId = dropContainer.getAttribute('data-id');

        setDropZones((prev) => {
          const deepList = JSON.parse(JSON.stringify(prev));

          deepList[dropContainerId] = { screenType: item.screenType, step: 1, data: item };

          return deepList;
        });

        // Ensure the image copy exists before trying to remove it
        const imageCopy = document.querySelector('.image-copy');
        if (imageCopy) {
          imageCopy.remove();
        }
      },
      ondragenter: (event) => {
        const dropContainer = event.target;
        dropContainer.classList.add('highlight');
      },

      ondragleave: (event) => {
        const dropContainer = event.target;

        dropContainer.classList.remove('highlight');
      },
    });
    return () => {
      interact('.box').unset();
      interact('.drop_container').unset();
    };
  }, [timeLineData]);

  if (apiInProgress)
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        <div className={style.loader}></div>
      </div>
    );

  return (
    <div className={style.main}>
      <video autoPlay loop muted className={style.video}>
        <source src={BackgroundVideo} type="video/mp4" />
      </video>
      <div className={style.HomeContainer}>
        <div className={style.container}>
          <div className={style.flexColumnContainer}>
            <div className={['drop_zones', style.flexContainer].join(' ')}>
              {dropZones.map((zone: any, index) => {
                const dimensions = getDimensions(index);
                return (
                  index < 3 && (
                    <div
                      key={index}
                      id={`drop_container_${index}`}
                      ref={drop}
                      data-id={index}
                      style={{
                        transform: index < 3 ? 'rotate(180deg)' : 'none',
                      }}
                      className={['drop_container', style.dropContainer].join(' ')}
                    >
                      {Object.keys(zone)?.length ? (
                        <Sections
                          data={zone}
                          index={index}
                          dimensions={dimensions}
                          onBackHandler={onBackHandler}
                          onSubTopicClickHandler={onSubTopicClickHandler}
                        />
                      ) : (
                        <div
                          style={{
                            color: 'white',
                            opacity: '0.5',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%',
                          }}
                          className={style.text}
                        >
                          Drag and drop the topics from above timeline for more details
                        </div>
                      )}
                    </div>
                  )
                );
              })}
            </div>
            <div className={[style.relativePosition].join(' ')}>
              <div
                ref={scrollContainerRef}
                className={style.scrollContainer}
                style={{ overflow: 'scroll', height: '100%' }}
              >
                <div id="circle-container" className={['circle-container', style.potWithoutScroll].join(' ')}>
                  {timeLineData?.en?.map((one: any, index) => (
                    <div className={style.potItem} key={index}>
                      <p className={[style.textStyle, style.rotatedText].join(' ')}>{one.tabTitle}</p>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {one?.central_timeline_elements?.map((timeline: any, timeLineIndex: number) => {
                          return (
                            <div
                              key={timeLineIndex}
                              className="box"
                              data-circle={JSON.stringify({ id: timeLineIndex, parentId: index })}
                              data-x="0"
                              data-y="0"
                            >
                              <div
                                style={{
                                  padding: 5,
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  borderRadius: '100px',
                                  transition: 'opacity 0.3s ease',
                                  marginLeft: 20,
                                  marginRight: 20,
                                  cursor: 'move',

                                  touchAction: 'none',
                                }}
                                className={'draggable-item'}
                              >
                                <div style={{ position: 'relative' }} className="circle">
                                  <img
                                    src={
                                      timeline?.icon?.url
                                        ? `http://192.168.105.118:8081${timeline?.icon?.url}`
                                        : imageFour
                                    }
                                    className={style.imageRotation}
                                    alt=""
                                    style={{
                                      height: '70px',
                                      width: '70px',
                                      borderRadius: '90px',
                                      objectFit: 'cover',
                                      border: '2px solid #F1CDAB',
                                      position: 'relative',
                                      zIndex: 10,
                                      transform: 'rotate(-45deg)',
                                      backgroundColor: '#01003E',
                                    }}
                                  />
                                  <div style={{ position: 'absolute', left: '-15%', bottom: '-15%' }}>
                                    <CurvedText label={timeline.iconTitle} />
                                  </div>

                                  {/* <img src={circle.imgSrc?.image} style={{ height: 50, width: 50, }} alt="Rotating Image" className="content" /> */}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <p className={style.textStyle}>{one.tabTitle}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className={style.divider}></div>
            </div>
            <div className={['drop_zones', style.flexSpaceBetween].join(' ')}>
              {dropZones.map((zone: any, index) => {
                const dimensions = getDimensions(index);
                return (
                  index > 2 && (
                    <div
                      key={index}
                      id={`drop_container_${index}`}
                      data-id={index}
                      style={{
                        transform: index < 3 ? 'rotate(180deg)' : 'none',
                      }}
                      className={['drop_container', style.dropContainer].join(' ')}
                    >
                      {Object.keys(zone)?.length ? (
                        <Sections
                          data={zone}
                          index={index}
                          onBackHandler={onBackHandler}
                          onSubTopicClickHandler={onSubTopicClickHandler}
                          dimensions={dimensions}
                        />
                      ) : (
                        <div
                          style={{
                            color: 'white',
                            opacity: '0.5',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%',
                          }}
                          className={style.text}
                        >
                          Drag and drop the topics from above timeline for more details
                        </div>
                      )}
                    </div>
                  )
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
