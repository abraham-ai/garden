import React, { useState, useEffect, useRef, useCallback } from 'react';
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
  const [username, setUsername] = useState<string | null>(null);
  const [generators, setGenerators] = useState<string | null>(null);
  const [earliestTime, setEarliestTime] = useState<number | null>(null);
  const [latestTime, setLatestTime] = useState<number | null>(null);
  const [limit, setLimit] = useState<number>(10);
  const [lastCreationEarliestTime, setLastCreationEarliestTime] = useState<
    number | null
  >(null);
  const loadBelowRef = useRef<HTMLDivElement | null>(null);

  const url = `/api/creations?page=${1}&limit=${limit}&username=${username}&generators=${generators}&earliestTime=${earliestTime}&latestTime=${lastCreationEarliestTime}`;

  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data, mutate, size, setSize, isValidating, isLoading, error } =
    useSWRInfinite(
      (index) =>
        `api/creations?limit=${limit}&page=${
          index + 1
        }&username=${username}&generators=${generators}&earliestTime=${earliestTime}&latestTime=${lastCreationEarliestTime}`,
      fetcher
    );

  let lastDataCreation = {};
  let lastCreation = {};

  function handleCreationData(lastDataCreation, lastCreation) {
    // Check if lastDataCreation and lastCreation have the 'createdAt' property before accessing it
    if (
      typeof !data === 'undefined' &&
      typeof lastDataCreation === 'object' &&
      typeof lastCreation === 'object'
    ) {
      setCreations((prevCreations) => [...prevCreations, ...data[0]]);
      setLastCreationEarliestTime(lastDataCreation.createdAt);
    }
  }

  if (typeof data !== 'undefined') {
    lastDataCreation = data[0][data[0].length - 1];

    if (creations.length > 0) {
      lastCreation = creations[creations.length - 1];
    }

    handleCreationData(lastDataCreation, lastCreation);
  }

  console.log({
    lastDataCreation,
    lastCreation,
    lastCreationEarliestTime,
    size,
  });
  console.log(data);

  // Define the state machine
  const infiniteScrollMachine = createMachine({
    id: 'infiniteScroll',
    initial: 'idle',
    context: {
      lastCreationEarliestTime: null,
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
  });

  // Create a service to interpret the state machine
  const infiniteScrollService = interpret(infiniteScrollMachine)
    .onTransition((state) => {
      console.log('Transitioned to state:', state.value);
    })
    .start();

  // Update the handleLoadMore function to send an event to the state machine
  const handleLoadMore = useCallback(() => {
    console.log('HANDLE LOAD MORE ----------------------------------');
    if (!data) return;
    setSize(size + 1);
    let newDate = 1;
    if (
      typeof lastDataCreation === 'object' &&
      lastDataCreation.hasOwnProperty('createdAt')
    ) {
      newDate = addSecondsToDate(
        lastDataCreation.createdAt,
        1000,
        'handle more'
      );
      setLastCreationEarliestTime(newDate);
      setCreations((prevCreations) => [...prevCreations, ...data[0]]);
    }

    // Send LOAD_MORE event to the state machine
    infiniteScrollService.send({
      type: 'LOAD_MORE',
      data: newDate,
    });
  }, [data, infiniteScrollService, lastDataCreation, setSize, size]);

  // Update the useEffect to listen for state changes in the state machine
  useEffect(() => {
    const subscription = infiniteScrollService.subscribe((state) => {
      if (state.changed) {
        setLastCreationEarliestTime(state.context.lastCreationEarliestTime);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [infiniteScrollService]);

  // Create the intersection observer callback
  const loadMoreObserver = useCallback(
    (entries) => {
      const firstEntry = entries[0];
      if (firstEntry.isIntersecting) {
        handleLoadMore();
      }
    },
    [handleLoadMore]
  );

  // Set up the intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(loadMoreObserver, {
      rootMargin: '0px',
      threshold: 1.0,
    });

    if (loadBelowRef.current) {
      observer.observe(loadBelowRef.current);
    }

    return () => {
      if (loadBelowRef.current) {
        observer.unobserve(loadBelowRef.current);
      }
    };
  }, [loadMoreObserver]);

  const addSecondsToDate = (date, seconds, context) => {
    let newDateTime = new Date(date).getTime() - seconds;
    let newDate = new Date(newDateTime).toISOString();
    return newDate;
  };

  // Update only on first render when lastCreation {} is empty and lastCreationEarliestTime is null
  if (
    typeof data !== 'undefined' &&
    lastCreationEarliestTime === null &&
    Object.keys(lastCreation).length === 0 &&
    lastDataCreation.hasOwnProperty('createdAt') &&
    size === 1
  ) {
    console.log(lastDataCreation.createdAt);
    const newDate = addSecondsToDate(
      lastDataCreation.createdAt,
      1000,
      'first render'
    );
    setLastCreationEarliestTime(newDate);
    setCreations((prevCreations) => [...prevCreations, ...data[0]]);
  }

  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === 'undefined');
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < limit);
  const isRefreshing = isValidating && data && data.length === size;

  return (
    <>
      <section style={{ color: 'black' }}>
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
        {creations.map((creation: Creation) => {
          const generatorName = creation.task.generator.generatorName;

          if (
            generatorName === 'tts' ||
            generatorName === 'complete' ||
            generatorName === 'interrogate' ||
            generatorName === 'wav2lip' ||
            generatorName === 'interpolate' ||
            generatorName === 'real2real'
          ) {
            return null;
          }
          // else if (generator === 'interpolate') {
          //   return (
          //     <CreationCardVideo key={creation._id} creation={creation} />
          //   )
          // }
          else {
            return <CreationCard creation={creation} key={creation._id} />;
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
