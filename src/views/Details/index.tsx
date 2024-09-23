import Header from 'views/Header';
import styles from './Details.module.scss';
import { useEffect, useRef, useState } from 'react';
import DataTable from 'components/DataTable';

interface TimelineDetail {
  title: string; // Assuming title is a string, adjust as necessary
}

interface DataProps {
  title: string; // Main title
  central_timeline_details_lists?: TimelineDetail[]; // Array of timeline details
  list?: any[];
}

interface dimensionProps {
  width: number;
  height: number;
}

interface DetailsProps {
  data: DataProps; // Define data as the above structure
  dimensions: dimensionProps;
  step: number;
  index: number;
  onBackHandler?: () => void;
}

const Details: React.FC<DetailsProps> = ({ data, step, onBackHandler }) => {
  console.log('details');
  const parentRef = useRef(null);
  const divRef = useRef(null);
  const headerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const [headerDimensions, setHeaderDimension] = useState({ width: 0, height: 0 });

  const getColumns = () => {
    let columns = Object.keys(data?.list?.[0]?.table?.content?.[0])
      .filter((one) => one !== 'id')
      ?.map((one) => {
        return {
          header: one.toUpperCase(),
          accessorKey: one,
        };
      });

    return columns;
  };

  useEffect(() => {
    const handleResize = () => {
      if (divRef.current) {
        const { clientWidth, clientHeight } = divRef.current;
        setDimensions({ width: clientWidth, height: clientHeight });
      }

      if (headerRef.current) {
        const { clientWidth, clientHeight } = headerRef.current;
        setHeaderDimension({ width: clientWidth * 0.9, height: clientHeight * 0.9 });
      }
    };
    handleResize();

    window.addEventListener('resize', handleResize);
  }, [data]);

  return (
    <div ref={divRef} style={{ height: '100%' }}>
      <div ref={headerRef}>
        <Header title={data?.title} step={step} onBackHandler={onBackHandler} />
      </div>

      <div
        style={{
          overflow: 'scroll',
          paddingBottom: 20,
          maxHeight: (dimensions.height - headerDimensions.height) * 0.94,
          maxWidth: dimensions.width,
        }}
        className={styles.scrollContainer}
      >
        <div className={styles.container}>
          <ul
            className={[styles.list, styles.scrollContainer].join(' ')}
            style={{ maxHeight: dimensions.height * 0.7, overflow: 'scroll' }}
          >
            {data?.list?.[0]?.bullet_points?.map((item: any, index: number) => (
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <li key={index} className={styles.listItem}>
                  {item.description}
                </li>
              </div>
            ))}
          </ul>
          {data?.list?.[0]?.image?.url && (
            <div className={styles.image} ref={parentRef}>
              <img
                src={`http://192.168.105.118:8081${data?.list?.[0]?.image?.url}`}
                style={{
                  width: dimensions.width * 0.3,
                  height: dimensions.height * 0.7,
                  objectFit: 'cover', // Adjusts how the image fills the space
                  borderRadius: 15,
                }}
              />
            </div>
          )}
        </div>
        <div
          style={{
            width: dimensions.width,
            overflowX: 'hidden',
            paddingTop: '20px',
            paddingLeft: 20,
            paddingRight: 20,
          }}
        >
          {data?.list?.[0]?.table && <DataTable data={data?.list?.[0]?.table.content} columns={getColumns()} />}
        </div>
      </div>
    </div>
  );
};

export default Details;
