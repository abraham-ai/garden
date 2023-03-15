'use client';

import React, {
  useState,
  useReducer,
  useContext,
  createContext,
  useRef,
  useEffect,
  RefObject,
  ReactNode,
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

const allData = new Array(25).fill(0).map((_val, i) => i + 1);
const PAGE_LENGTH = 10;
const perPage = 10;

const fetcher = (...args: unknown[]) =>
  axios.post(...args).then((res) => res.data);

const types = {
  start: 'START',
  loaded: 'LOADED',
};

interface ReducerState {
  creationsLoading: boolean;
  creationsMore: boolean;
  creationsData: object[];
  creationsAfter: number;
}

interface ReducerAction {
  type: string;
  newData?: newData?: object[] | Creations[] | Generator[];
}

const reducer = (state: ReducerState, action: ReducerAction) => {
  switch (action.type) {
    case types.start:
      return { ...state, loading: true };
    case types.loaded:
      if (Array.isArray(action.newData)) {
        // Your code that handles the array
        return {
          ...state,
          creationsLoading: false,
          creationsData: [...state.creationsData, ...action.newData],
          creationsMore: action.newData.length === perPage,
          creationsAfter: state.creationsAfter + perPage,
        };
      } else {
        console.error('Invalid newData type:', typeof action.newData);
      }
    default:
      return state;
  }
};

const CreationsContext = createContext({});

function CreationsProvider({ children }: { children: ReactNode }) {
  const [cutoffTime, setCutoffTime] = useState<number | null>(null);
  const [state, dispatch] = useReducer(reducer, {
    creationsLoading: false,
    creationsMore: true,
    creationsData: [],
    creationsAfter: 0,
  });
  const { creationsLoading, creationsData, creationsMore, creationsAfter } =
    state;

  const filter = {
    latestTime: cutoffTime,
    limit: PAGE_LENGTH,
  };
  const url = '/api/creations';
  const { data, error: creationsError } = useSWR(url, (url) =>
    fetcher(url, filter)
  );

  const creationsLoad = () => {
    dispatch({ type: types.start });

    setTimeout(() => {
      const newData = data.slice(creationsAfter, creationsAfter + perPage);
      dispatch({ type: types.loaded, newData });
    }, 300);
  };

  return (
    <CreationsContext.Provider
      value={{
        creationsLoading,
        creationsData,
        creationsMore,
        creationsLoad,
        creationsError,
      }}
    >
      {children}
    </CreationsContext.Provider>
  );
}

const CreationsGrid = () => {
  const [creations, setCreations] = useState<object[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [paginate, setPaginate] = useState(true);

  const [element, setElement] = useState<HTMLLIElement | null>(null);
  const {
    creationsData,
    creationsLoading,
    creationsMore,
    creationsLoad,
    creationsError,
  } = useContext(CreationsContext);
  const loader = useRef(creationsLoad);
  const observer = useRef<IntersectionObserver>();

  useEffect(() => {
    loader.current = creationsLoad;
  }, [creationsLoad]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      console.log('window is not undefined');
      observer.current = new IntersectionObserver(
        (entries) => {
          console.log('Entries');
          const first = entries[0];
          console.log(first);
          if (first.isIntersecting) {
            loader.current();
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

  if (creationsError) {
    return <div>{'Error...'}</div>;
  }
  if (!creationsData && creationsLoading) {
    return <div>{'Loading...'}</div>;
  }

  return (
    <DisplayCreations
      creations={creationsData}
      generators={[
        ...new Set(
          creationsData.creations.map(
            (creation) => creation.task.generator.generatorName
          )
        ),
      ]}
    />
  );
};

function DisplayCreations({ creations, generators }) {
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
