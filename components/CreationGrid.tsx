import React, { useState } from 'react';
import useSWR, { SWRConfig } from 'swr';
import axios from 'axios';
import styles from '../styles/Creations.module.css';

const PAGE_LENGTH = 10;
const fetcher = (...args) => axios.post(...args).then((res) => res.data);

const CreationsGrid = () => {
  const [creations, setCreations] = useState<object[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [paginate, setPaginate] = useState(true);
  const [cutoffTime, setCutoffTime] = useState<number | null>(null);

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

      <pre>{JSON.stringify(creations, null, 2)}</pre>
    </>
  );
}

export default CreationsGrid;
