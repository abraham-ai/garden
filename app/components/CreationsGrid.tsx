'use client'

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  useContext
} from 'react'
import useSWRInfinite from 'swr/infinite'

import AppContext from '../../context/AppContext'

import { createMachine, interpret, assign } from 'xstate'

import deepEqual from '../../util/deepEqual'

import FilterType from '../../interfaces/Filter'

import CreationCard from './CreationCard'
import type Creation from '../../interfaces/Creation'

import { Button, Spin, Row } from 'antd'

import Masonry from 'react-masonry-css'
import styles from '../../styles/CreationsGrid.module.css'
import breakpointColumnsObj from '../../constants/breakpointColumns'

import { LoadingOutlined } from '@ant-design/icons'

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

const CreationsGrid = () => {
  const [isScrollAnalytics, setIsScrollAnalytics] = useState<boolean>(false)

  const [username, setUsername] = useState<string | string>('')
  const [generators, setGenerators] = useState<string | string>('')
  const [earliestTime, setEarliestTime] = useState<number | string>('')
  const [latestTime, setLatestTime] = useState<number | string>('')
  const [limit, setLimit] = useState<number>(10)
  const [lastCreationEarliestTime, setLastCreationEarliestTime] = useState<
    number | string
  >('')
  const loadBelowRef = useRef<HTMLDivElement | null>(null)

  const context = useContext(AppContext)
  const creationsData = useMemo(
    () => context?.creationsData || [],
    [context?.creationsData]
  );
  const setCreationsData = useMemo(
    () => context?.setCreationsData,
    [context?.setCreationsData]
  );

  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const getKey = (index, previousPageData) => {
    return `/api/creations?limit=${limit}&page=${
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
  );

  // Create a service to interpret the state machine
  const infiniteScrollService = interpret(infiniteScrollMachine)
    .onTransition((state) => {
      // console.log('Transitioned to state:', state.value);
    })
    .start();

  const addSecondsToDate = (date, seconds) => {
    let newDateTime = new Date(date).getTime() - seconds;
    let newDate = new Date(newDateTime).toISOString();
    return newDate;
  };

  const handleLoadMore = useCallback(async () => {
    // setSize(size + 1);
  }, []);

  // Update the useEffect to listen for state changes in the state machine
  useEffect(() => {
    const subscription = infiniteScrollService.subscribe((state) => {
      if (state.changed) {
        // console.log(state.context.lastCreationEarliestTime);

        if (typeof data !== 'undefined') {
          const lastDataCreation = data[0][data[0].length - 1];
          const lastCreation =
            creationsData.length === 0
              ? {}
              : creationsData[creationsData.length - 1];

          // console.log(creationsData.length);
          // console.log(lastDataCreation);
          // console.log(lastDataCreation.createdAt);
          // console.log(lastCreation.createdAt);

          const newDate = addSecondsToDate(lastDataCreation.createdAt, 1000);

          // console.log('lastDataCreation.createdAt', lastDataCreation.createdAt);
          // console.log('newDate', newDate);
          // console.log(size * 10);
          // console.log(creationsData.length);
          // console.log(deepEqual(lastDataCreation, lastCreation));

          // console.log({ data });
          // console.log({ creationsData });

          setCreationsData((prevCreations: Creation[]) => [
            ...prevCreations,
            ...(data?.[0] || []) as Creation[],
          ] as []);

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
    }
  }, [
    infiniteScrollService,
    creationsData,
    setCreationsData,
    data,
    size,
    setSize
  ])

  // Create the intersection observer callback
  const loadMoreObserver = useCallback(
    (entries) => {
      const firstEntry = entries[0]
      if (firstEntry.isIntersecting) {
        if (typeof data !== 'undefined') {
          setSize(size + 1)

          infiniteScrollService.send({
            type: 'LOAD_MORE',
            // data: newDate,
          })
        }
      }
    },
    [data, infiniteScrollService, setSize, size]
  )

  // Set up the intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(loadMoreObserver, {
      rootMargin: '0px',
      threshold: 1.0,
    })

    const currentRef = loadBelowRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [loadMoreObserver])

  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === 'undefined')
  const isEmpty = data?.[0]?.length === 0
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < limit)
  const isRefreshing = isValidating && data && data.length === size

  return (
    <>
      { isScrollAnalytics ? 
        <section className={styles.creationAnalytics} style={{ color: 'black' }}>
          <span>{`Page ${size}`}</span>
          <span style={{ display: 'flex' }}>
            <b>{'Last Creation Earliest Time'}</b>
            <p>{lastCreationEarliestTime}</p>
          </span>
          <div>
            <span className={styles.loadingState}>
              {`showing ${size} page(s) of 
            ${isLoadingMore ? '...' : creationsData.length}
            creation(s) `}
            </span>
            <Button
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
            </Button>
            <Button disabled={isRefreshing} onClick={() => mutate()}>
              {isRefreshing ? 'refreshing...' : 'refresh'}
            </Button>
            <Button disabled={!size} onClick={() => setSize(0)}>
              clear
            </Button>
          </div>
          {isEmpty ? <p>No creations found.</p> : null}
        </section>
      : null }

      <Masonry
        breakpointCols={breakpointColumnsObj}
        className={styles.crGridMasonry}
        columnClassName={styles.crGridMasonryColumn}
      >
        {creationsData.map((creation: Creation, i: number) => {
          const generatorName = creation.task.generator.generatorName;
          // console.log({ creation });
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
              <CreationCard creation={creation} key={creation._id} index={i} />
            );
          }
        })}
      </Masonry>

      <Row ref={loadBelowRef} className={styles.loadMore} style={{ display: 'flex', justifyContent: 'center' }}>
        <Spin indicator={antIcon} />
      </Row>
    </>
  );
};

export default CreationsGrid;
