import React, { useState } from 'react';
import useSWRInfinite from 'swr/infinite';
import axios from 'axios';

import FilterType from '../../interfaces/Filter';

import CreationCard from './CreationCard';
import Creation from '../../interfaces/Creation';

import Masonry from 'react-masonry-css';
import styles from '../../styles/CreationsGrid.module.css';
import breakpointColumnsObj from '../../constants/breakpointColumns';

const CreationsGrid = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [generators, setGenerators] = useState<string | null>(null);
  const [earliestTime, setEarliestTime] = useState<number | null>(null);
  const [latestTime, setLatestTime] = useState<number | null>(null);
  const [limit, setLimit] = useState<number>(10);

  const url = `/api/creations?page=${1}&limit=${limit}&username=${username}&generators=${generators}&earliestTime=${earliestTime}&latestTime=${latestTime}`;

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
        }&username=${username}&generators=${generators}&earliestTime=${earliestTime}&latestTime=${latestTime}`,
      fetcher
    );

  let creations = data ? [].concat(...data) : [];

  if (creations.length > 0) {
    // creations = creations[0].creations;
    // console.log({ 'CREATIONS LENGTH: ': creations.length });
    console.log(creations);
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
      <button onClick={() => setSize(size + 1)}>Load More</button>
      <p>
        showing {size} page(s) of {isLoadingMore ? '...' : creations.length}{' '}
        creation(s){' '}
        <button
          disabled={isLoadingMore || isReachingEnd}
          onClick={() => setSize(size + 1)}
        >
          {isLoadingMore
            ? 'loading...'
            : isReachingEnd
            ? 'no more issues'
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
