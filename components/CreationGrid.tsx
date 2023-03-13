import React, { useState, useReducer } from 'react';
import useSWR, { SWRConfig } from 'swr';
import axios from 'axios';
import styles from '../styles/Creations.module.css';

import Masonry from 'react-masonry-css';
import breakpointColumnsObj from '../constants/breakpointColumns';

const PAGE_LENGTH = 10;
const fetcher = (...args) => axios.post(...args).then((res) => res.data);

const CreationsGrid = () => {
  const [creations, setCreations] = useState<object[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [paginate, setPaginate] = useState(true);
  const [cutoffTime, setCutoffTime] = useState<number | null>(null);

  // const [state, dispatch] = useReducer(reducer, {
  //   loading: false,
  //   more: true,
  //   data: [],
  //   after: 0,
  // });
  // const { loading, data, after, more } = state;

  // const load = () => {
  //   const newData = allData.slice(after, after, +perPage);
  //   dispatch({ type: types.loaded, newData }, 300);
  // };

  const filter = {
    latestTime: cutoffTime,
    limit: PAGE_LENGTH,
  };

  const url = '/api/creations';
  const { data, error } = useSWR(url, (url) => fetcher(url, filter));

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

function DisplayCreations({ creations, generators }) {
  const [filterGenerator, setFilterGenerator] = useState(null);

  const filteredCreations = filterGenerator
    ? creations.filter(
        (creation) => creation.task.generator.generatorName === filterGenerator
      )
    : creations;

  const numCreations = filterGenerator
    ? filteredCreations.length
    : creations.length;

  return (
    <>
      <section className={styles.filterWrapper}>
      <div class="slidecontainer">
  <input type="range" min="1" max="100" value="50" class="slider" id="myRange">
</div>
        
        {generators.map((generator) => (
          <span className={styles.filterGeneratorButtonWrapper} key={generator}>
            <button
              className={
                generator === filterGenerator
                  ? styles.generatorButtonSelected
                  : ''
              }
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
        className={'cr-grid-masonry'}
        columnClassName='cr-grid-masonry_column'
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
            return <CreationCard key={creation.key} creation={creation} />;
          }
        })}
      </Masonry>

      <pre>{JSON.stringify(creations, null, 2)}</pre>
    </>
  );
}

export default CreationsGrid;
