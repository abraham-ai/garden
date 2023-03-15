import React, { useState } from 'react';
import useSWRInfinite from 'swr/infinite';
import axios from 'axios';
import FilterType from '../../interfaces/Filter';
import CreationCard from './CreationCard';
import Creation from '../../interfaces/Creation';

const CreationsGrid = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [generators, setGenerators] = useState<string | null>(null);
  const [earliestTime, setEarliestTime] = useState<number | null>(null);
  const [latestTime, setLatestTime] = useState<number | null>(null);

  const PAGE_SIZE = 10;
  const url = `/api/creations?page=${1}&limit=${PAGE_SIZE}&username=${username}&generators=${generators}&earliestTime=${earliestTime}&latestTime=${latestTime}`;

  const filter = {
    latestTime: latestTime,
    limit: PAGE_SIZE,
  };
  const fetcher = (url: string, filter: FilterType) =>
    fetch(url).then((res) => res.json());

  const { data, mutate, size, setSize, isValidating, isLoading, error } =
    useSWRInfinite(
      (index) => `api/creations?per_page=${PAGE_SIZE}&page=${index + 1}`,
      fetcher
    );

  let creations = data ? [].concat(...data) : [];

  if (creations.length > 0 && typeof creations[0].creations !== 'undefined') {
    creations = creations[0].creations;
  }

  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === 'undefined');
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);
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
        return <CreationCard creation={creation} key={index} />;
      })}
    </>
  );
};

export default CreationsGrid;
