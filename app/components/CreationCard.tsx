import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
  useMemo,
} from 'react';

import AppContext from '../../context/AppContext';

import Image from 'next/image';
import Link from 'next/link';

import axios from 'axios';
import timeAgo from '../../util/timeAgo';
import abbreviateText from '../../util/abbreviateText';
import abbreviateAddress from '../../util/abbreviateAddress';

import Creation from '../../interfaces/Creation';
import Creations from '../../interfaces/Creations';
import CreationModal from './CreationModal';
import styles from '../../styles/CreationCard.module.css';
import CreationSocial from './CreationSocial';

import { Button, Skeleton } from 'antd';
import Blockies from 'react-blockies';

export default function CreationCard({
  creation,
  index,
}: {
  creation: Creation;
  index: number;
}) {
  // console.log(creation);

  const { context } = useContext(AppContext);
  const currentCreationIndex = context?.currentCreationIndex || 0;
  const creationsData = useMemo(
    () => context?.creationsData || [],
    [context?.creationsData]
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [currentCreation, setCurrentCreation] = useState<Creation>(
    creationsData[currentCreationIndex]
  );

  const [_id, setId] = useState<string>('');
  const [user, setUser] = useState<string>('');
  const [textInput, setTextInput] = useState<string>('');
  const [thumbnail, setThumbnail] = useState<string>('');
  const [uri, setUri] = useState<string>('');
  const [createdAt, setCreatedAt] = useState<string>(0);
  const [generatorName, setGeneratorName] = useState<string>('');
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);

  const [isSaveModalActive, setIsSaveModalActive] = useState(false);

  let praises = 0;
  let burns = 0;
  let praised = false;
  let burned = false;

  const timeAgoCreatedAt = timeAgo(creation.createdAt);

  const showModal = () => {
    setModalOpen(true);
  };

  const handleCreationUpdate = useCallback(
    (currentCreation, currentCreationIndex) => {
      if (
        typeof currentCreation !== 'undefined' &&
        currentCreationIndex !== 0
      ) {
        console.log(
          currentCreationIndex,
          currentCreation.task.config.text_input
        );
        setUri(currentCreation.uri);
        setCreatedAt(currentCreation.createdAt);
        setGeneratorName(currentCreation.task.generator.generatorName);
        setWidth(currentCreation.task.config.width);
        setHeight(currentCreation.task.config.height);
        setTextInput(currentCreation.task.config.text_input);
        setUser(currentCreation.user);
        setThumbnail(currentCreation.thumbnail);
        setId(currentCreation._id);
        setStatus(currentCreation.task.status);
      }
    },
    []
  );

  useEffect(() => {
    setCurrentCreation(creation);
    handleCreationUpdate(creationsData[currentCreationIndex]);
  }, [
    creation,
    creationsData,
    handleCreationUpdate,
    currentCreation,
    currentCreationIndex,
  ]);

  let displayAddress = '';
  if (typeof user === 'string') {
    displayAddress = abbreviateAddress(creation.user);
  }

  let prompt = '';
  // console.log({ textInput });
  const creationTextInput = creation.task.config.text_input;
  if (creationTextInput !== '' && typeof creationTextInput !== 'undefined') {
    prompt = abbreviateText(creationTextInput, 50); // 100
  }

  return (
    <>
      <section className={styles.creationCardWrapper}>
        <article id={`creation-card`} className={styles.creationCard}>
          <div className={styles.crTopWrapper} style={{ display: 'flex' }}>
            <div className={styles.crImageWrapper}>
              {creation.thumbnail === '' ? (
                <Skeleton />
              ) : (
                <>
                  <CreationSocial
                    layout={'expanded'}
                    creationBurns={burns}
                    creationPraises={praises}
                    creationId={creation._id}
                    praisedByMe={praised}
                    burnedByMe={burned}
                  />

                  <Link
                    className={styles.crLink}
                    // href={{
                    //   pathname: `/creation/${creation._id}`,
                    //   query: {
                    //     uri: uri,
                    //     createdAt: createdAt,
                    //     generatorName: generatorName,
                    //     width: width,
                    //     height: height,
                    //     text_input: text_input,
                    //     user: user,
                    //     thumbnail: thumbnail,
                    //     _id: _id,
                    //     status: status,
                    //   },
                    // }}
                    href={`/garden?creationId=${creation._id}`}
                    as={`/creation/${creation._id}`}
                    scroll={false}
                    style={{
                      display: 'flex',
                      color: 'black',
                      flexDirection: 'column',
                    }}
                    onClick={() => showModal()}
                  >
                    <Image
                      src={creation.thumbnail}
                      height={creation.task.config.height}
                      width={creation.task.config.width}
                      alt={creation.task.config.text_input}
                    />
                  </Link>
                </>
              )}
            </div>
          </div>
        </article>
        <Link
          className={styles.crLink}
          // href={{
          //   pathname: `/creation/${creation._id}`,
          //   query: {
          //     uri: uri,
          //     createdAt: createdAt,
          //     generatorName: generatorName,
          //     width: width,
          //     height: height,
          //     text_input: text_input,
          //     user: user,
          //     thumbnail: thumbnail,
          //     _id: _id,
          //     status: status,
          //   },
          // }}
          href={`/garden?creationId=${creation._id}`}
          as={`/creation/${creation._id}`}
          scroll={false}
          style={{ display: 'flex', color: 'black', flexDirection: 'column' }}
          onClick={() => showModal()}
        >
          <div className={styles.creationContent}>
            {/* <div
                className='cr-metadata'
                style={{
                  display: 'flex',
                  flex: 1,
                  justifyContent: 'space-around',
                }}
              >
                <span>{creation._id}</span>
                <span>
                  {creation.task.status === 'completed'
                    ? '✓'
                    : creation.task.status}
                </span>
              </div> */}

            <div className='cr-content-main-wrapper'>
              <div className='cr-content-main'>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <b className='cr-prompt-command'>{`/${creation.task.generator.generatorName} `}</b>
                    <span className='cr-prompt'>{prompt}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div
                        style={{
                          borderRadius: '50%',
                          overflow: 'hidden',
                          width: '32px',
                          height: '32px',
                          marginRight: 10,
                          background: 'orange',
                        }}
                      >
                        <Blockies seed={creation.user} />
                      </div>
                      <span>{displayAddress}</span>
                    </div>
                    <span className='cr-date'>{timeAgoCreatedAt}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </section>
      <CreationModal
        creation={
          typeof creationsData[currentCreationIndex]?._id === 'undefined'
            ? creation
            : creationsData[currentCreationIndex]
        }
        setModalOpen={setModalOpen}
        modalOpen={modalOpen}
        creationIndex={index}
      />
    </>
  );
}
