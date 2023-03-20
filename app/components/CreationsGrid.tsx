'use client';

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from 'react';
import useSWRInfinite from 'swr/infinite';

// Import xstate
import { createMachine, interpret, assign } from 'xstate';

import axios from 'axios';

import deepEqual from '../../util/deepEqual';

import FilterType from '../../interfaces/Filter';

import CreationCard from './CreationCard';
import Creation from '../../interfaces/Creation';

import Masonry from 'react-masonry-css';
import styles from '../../styles/CreationsGrid.module.css';
import breakpointColumnsObj from '../../constants/breakpointColumns';

const CreationsGrid = () => {
  const [creations, setCreations] = useState<Creation[]>([]);
  const [username, setUsername] = useState<string | string>('');
  const [generators, setGenerators] = useState<string | string>('');
  const [earliestTime, setEarliestTime] = useState<number | string>('');
  const [latestTime, setLatestTime] = useState<number | string>('');
  const [limit, setLimit] = useState<number>(10);
  const [lastCreationEarliestTime, setLastCreationEarliestTime] = useState<
    number | string
  >('');
  const loadBelowRef = useRef<HTMLDivElement | null>(null);

  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const getKey = (index, previousPageData) => {
    return `api/creations?limit=${limit}&page=${
      index + 1
    }&username=${username}&generators=${generators}&earliestTime=${earliestTime}&latestTime=${lastCreationEarliestTime}`;
  };

  const { data, mutate, size, setSize, isValidating, isLoading, error } =
    useSWRInfinite(getKey, fetcher);

  // Define the state machine
  // Set predictableActionArguments to true when using createMachine
  const infiniteScrollMachine = createMachine(
    {
      id: 'infiniteScroll',
      initial: 'idle',
      context: {
        lastCreationEarliestTime: '',
      },
      states: {
        idle: {
          on: {
            LOAD_MORE: 'loading',
          },
        },
        loading: {
          invoke: {
            src: 'handleLoadMore',
            onDone: {
              target: 'idle',
              actions: assign({
                lastCreationEarliestTime: (_, event) => event.data,
              }),
            },
            onError: 'error',
          },
        },
        error: {
          on: {
            RETRY: 'loading',
          },
        },
      },
    },
    { predictableActionArguments: true }
  );

  // Create a service to interpret the state machine
  const infiniteScrollService = interpret(infiniteScrollMachine)
    .onTransition((state) => {
      console.log('Transitioned to state:', state.value);
    })
    .start();

  const addSecondsToDate = (date, seconds) => {
    let newDateTime = new Date(date).getTime() - seconds;
    let newDate = new Date(newDateTime).toISOString();
    return newDate;
  };

  const handleLoadMore = useCallback(async (context) => {
    // setSize(size + 1);
  }, []);

  // Update the useEffect to listen for state changes in the state machine
  useEffect(() => {
    const subscription = infiniteScrollService.subscribe((state) => {
      if (state.changed) {
        console.log(state.context.lastCreationEarliestTime);

        if (typeof data !== 'undefined') {
          const lastDataCreation = data[0][data[0].length - 1];
          const lastCreation =
            creations.length === 0 ? {} : creations[creations.length - 1];

          const newDate = addSecondsToDate(lastDataCreation.createdAt, 1000);

          console.log('lastDataCreation.createdAt', lastDataCreation.createdAt);
          console.log('newDate', newDate);
          console.log(size * 10);
          console.log(creations.length);
          console.log(deepEqual(lastDataCreation, lastCreation));

          setCreations((prevCreations) => [...prevCreations, ...data[0]]);
          setLastCreationEarliestTime(newDate);
          setSize(size + 1);

          // Send LOAD_MORE event to the state machine
          infiniteScrollService.send({
            type: 'LOAD_MORE',
            data: newDate,
          });
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [infiniteScrollService, creations, data, size, setSize]);

  // Create the intersection observer callback
  const loadMoreObserver = useCallback(
    (entries) => {
      const firstEntry = entries[0];
      if (firstEntry.isIntersecting) {
        if (typeof data !== 'undefined') {
          setSize(size + 1);

          infiniteScrollService.send({
            type: 'LOAD_MORE',
            // data: newDate,
          });
        }
      }
    },
    [data, infiniteScrollService, setSize, size]
  );

  // Set up the intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(loadMoreObserver, {
      rootMargin: '0px',
      threshold: 1.0,
    });

    const currentRef = loadBelowRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [loadMoreObserver]);

  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === 'undefined');
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < limit);
  const isRefreshing = isValidating && data && data.length === size;

  return (
    <>
      <section className={styles.creationAnalytics} style={{ color: 'black' }}>
        <span>{`Page ${size}`}</span>
        <span style={{ display: 'flex' }}>
          <b>{'Last Creation Earliest Time'}</b>
          <p>{lastCreationEarliestTime}</p>
        </span>
        <div>
          <span className={styles.loadingState}>
            {`showing ${size} page(s) of 
          ${isLoadingMore ? '...' : creations.length}
          creation(s) `}
          </span>
          <button
            disabled={isLoadingMore || isReachingEnd}
            onClick={() => {
              handleLoadMore();
            }}
          >
            {isLoadingMore
              ? 'loading...'
              : isReachingEnd
              ? 'no more creations'
              : 'load more'}
          </button>
          <button disabled={isRefreshing} onClick={() => mutate()}>
            {isRefreshing ? 'refreshing...' : 'refresh'}
          </button>
          <button disabled={!size} onClick={() => setSize(0)}>
            clear
          </button>
        </div>
        {isEmpty ? <p>No creations found.</p> : null}
      </section>

      <Masonry
        breakpointCols={breakpointColumnsObj}
        className={styles.crGridMasonry}
        columnClassName={styles.crGridMasonryColumn}
      >
        {creations.map((creation: Creation, i: number) => {
          const generatorName = creation.task.generator.generatorName;

          if (
            generatorName === 'tts' ||
            generatorName === 'complete' ||
            generatorName === 'interrogate' ||
            generatorName === 'wav2lip' ||
            generatorName === 'interpolate' ||
            generatorName === 'real2real' ||
            generatorName === 'remix'
          ) {
            return null;
          } else {
            return (
              <CreationCard
                creation={creation}
                key={creation._id}
                index={i}
                creations={creations}
              />
            );
          }
        })}
      </Masonry>
      <div ref={loadBelowRef} className={styles.loadMore}>
        {'LOAD MORE'}
      </div>
    </>
  );
};

export default CreationsGrid;
