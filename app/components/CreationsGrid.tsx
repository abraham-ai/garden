'use client';

import React, {
  useState,
  useReducer,
  useContext,
  useRef,
  useEffect,
  RefObject,
} from 'react';
import AppContext from '../../context/AppContext';
import useSWR, { SWRConfig } from 'swr';
import axios from 'axios';

import Creations from '../../interfaces/Creations';
import Generator from '../../interfaces/Generator';

import styles from '../../styles/CreationsGrid.module.css';
import CreationCard from './CreationCard';
import Creation from '../../interfaces/Creation';
import Masonry from 'react-masonry-css';
import breakpointColumnsObj from '../../constants/breakpointColumns';

const PAGE_LENGTH = 10;
const perPage = 10;

const fetcher = (...args: unknown[]) =>
  axios.post(...args).then((res) => res.data);

const types = {
  start: 'START',
  loaded: 'LOADED',
};

const reducer = (state, action) => {
  switch (action.type) {
    case types.start:
      return { ...state, loading: true };
    case types.loaded:
      return {
        ...state,
        loading: false,
        data: [...state.data, ...action.newData],
        more: action.newData.length === perPage,
        after: state.after + perPage,
      };
    default:
      return state;
  }
};

const CreationsGrid = () => {
  const [creations, setCreations] = useState<object[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [paginate, setPaginate] = useState(true);
  const [cutoffTime, setCutoffTime] = useState<number | null>(null);

  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    more: true,
    data: [],
    after: 0,
  });
  const { creationsLoading, creationsData, creationsAfter, creationsMore } =
    state;

  const load = () => {
    dispatch({ type: types.start });

    setTimeout(() => {
      const newData = allData.slice(after, after + perPage);
      dispatch({ type: types.loaded, newData });
    }, 300);
  };

  // const { creationsData, creationsLoading, creationsMore, creationsLoad } =
  //   useContext(AppContext);

  const [element, setElement] = useState<HTMLLIElement | null>(null);
  const loader = useRef(load);
  const observer = useRef<IntersectionObserver>();

  const filter = {
    latestTime: cutoffTime,
    limit: PAGE_LENGTH,
  };

  const url = '/api/creations';
  const { data, error } = useSWR(url, (url) => fetcher(url, filter));

  useEffect(() => {}, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      console.log('window is not undefined');
      observer.current = new IntersectionObserver(
        (entries) => {
          console.log('Entries');
          const first = entries[0];
          console.log(first);
          if (first.isIntersecting) {
            load();
          }
        },
        { threshold: 1 }
      );

      console.log(observer.current);
    }
  }, [observer]);

  useEffect(() => {
    const currentElement = element;
    const currentObserver = observer.current;

    if (currentElement && currentObserver) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentElement && currentObserver) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [element, observer]);

  {
    creationsLoading && <li>{'Loading...'}</li>;
  }

  {
    !creationsLoading && creationsMore && (
      <li ref={setElement}>
        <button onClick={creationsLoad}>{'Load More'}</button>
      </li>
    );
  }

  if (error) {
    return <div>{'Error...'}</div>;
  }
  if (!data) {
    return <div>{'Loading...'}</div>;
  }

  return (
    <DisplayCreations
      creations={data.creations}
      generators={[
        ...new Set(
          data.creations.map(
            (creation) => creation.task.generator.generatorName
          )
        ),
      ]}
    />
  );
};

function DisplayCreations({
  creations,
  generators,
}: {
  Creations;
  Generators;
}) {
  const [filterGenerator, setFilterGenerator] = useState(null);

  const filteredCreations = filterGenerator
    ? creations.filter(
        (creation: Creation) =>
          creation.task.generator.generatorName === filterGenerator
      )
    : creations;

  const numCreations = filterGenerator
    ? filteredCreations.length
    : creations.length;

  return (
    <>
      <section className={styles.filterWrapper}>
        {/* <div className='masonry-slider-wrapper'>
          <input
            className='slider'
            id='myRange'
            type='range'
            min='1'
            max='100'
            value='50'
          />
        </div> */}

        {generators.map((generator: Generator, i: number) => (
          <span className={styles.filterGeneratorButtonWrapper} key={i}>
            <button
              className={
                generator === filterGenerator
                  ? styles.generatorButtonSelected
                  : ''
              }
              key={i}
              onClick={() => setFilterGenerator(generator)}
            >
              {generator}
            </button>
          </span>
        ))}

        {filterGenerator && (
          <button
            className={styles.filterGeneratorButtonWrapper}
            onClick={() => {
              setFilterGenerator(null);
            }}
          >
            Clear
          </button>
        )}

        <div>
          <span>{'Creations: '}</span>
          <span>{numCreations}</span>
        </div>
      </section>

      <Masonry
        breakpointCols={breakpointColumnsObj}
        className={styles.crGridMasonry}
        columnClassName={styles.crGridMasonryColumn}
      >
        {creations.map((creation: Creation) => {
          const { generator } = creation;

          if (
            generator === 'tts' ||
            generator === 'complete' ||
            generator === 'interrogate' ||
            generator === 'wav2lip' ||
            generator === 'interpolate' ||
            generator === 'real2real'
          ) {
            return null;
          }
          // else if (generator === 'interpolate') {
          //   return (
          //     <CreationCardVideo key={creation._id} creation={creation} />
          //   )
          // }
          else {
            return <CreationCard key={creation._id} creation={creation} />;
          }
        })}
      </Masonry>

      {/* <pre>{JSON.stringify(creations, null, 2)}</pre> */}
    </>
  );
}

export default CreationsGrid;
