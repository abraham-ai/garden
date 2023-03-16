import React, { useState, useEffect } from 'react';
import useSWRInfinite from 'swr/infinite';
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

  const url = `/api/creations?page=${1}&limit=${limit}&username=${username}&generators=${generators}&earliestTime=${earliestTime}&latestTime=${lastCreationEarliestTime}`;

  const filter = {
    latestTime: latestTime,
    limit: limit,
  };

  const fetcher = (url: string, filter: FilterType) =>
    fetch(url).then((res) => res.json());

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

  if (typeof data !== 'undefined') {
    lastDataCreation = data[0][data[0].length - 1];

    if (creations.length > 0) {
      lastCreation = creations[creations.length - 1];
    }
  }

  const handleLoadMore = () => {
    if (!data) return;
    setSize(size + 1);

    if (lastCreationEarliestTime !== lastDataCreation.createdAt) {
      setLastCreationEarliestTime(lastDataCreation.createdAt);
    }
    setCreations((prevCreations) => [...prevCreations, ...data[0]]);
  };

  console.log({ lastDataCreation, lastCreation });

  if (
    typeof data !== 'undefined' &&
    !deepEqual(lastDataCreation, lastCreation)
  ) {
    if (typeof lastCreationEarliestTime === 'number') {
      setCreations((prevCreations) => [...prevCreations, ...data[0]]);
      setLastCreationEarliestTime(lastDataCreation.createdAt);
    } else if (lastCreationEarliestTime === null) {
      setCreations((prevCreations) => [...prevCreations, ...data[0]]);
      setLastCreationEarliestTime(lastDataCreation.createdAt);
    }
  }

  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === 'undefined');
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < limit);
  const isRefreshing = isValidating && data && data.length === size;

  return (
    <>
      <span>{`Page ${size}`}</span>
      <p>
        showing {size} page(s) of {isLoadingMore ? '...' : creations.length}{' '}
        creation(s){' '}
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
      </p>
      {isEmpty ? <p>No creations found.</p> : null}
      {creations.map((creation: Creation, index: number) => {
        // <Masonry
        //   breakpointCols={breakpointColumnsObj}
        //   className={styles.crGridMasonry}
        //   columnClassName={styles.crGridMasonryColumn}
        // >
        //   {creations.map((creation: Creation) => {
        //     const { generator } = creation;

        //     if (
        //       generator === 'tts' ||
        //       generator === 'complete' ||
        //       generator === 'interrogate' ||
        //       generator === 'wav2lip' ||
        //       generator === 'interpolate' ||
        //       generator === 'real2real'
        //     ) {
        //       return null;
        //     }
        //     // else if (generator === 'interpolate') {
        //     //   return (
        //     //     <CreationCardVideo key={creation._id} creation={creation} />
        //     //   )
        //     // }
        //     else {
        //       return <CreationCard key={creation._id} creation={creation} />;
        //     }
        //   })}
        // </Masonry>;

        return <CreationCard creation={creation} key={index} />;
      })}
    </>
  );
};

export default CreationsGrid;
