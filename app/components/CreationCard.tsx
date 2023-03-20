import React, { useState, useEffect, useCallback } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import axios from 'axios';
import timeAgo from '../../util/timeAgo';
import abbreviateText from '../../util/abbreviateText';
import abbreviateAddress from '../../util/abbreviateAddress';

import Blockies from 'react-blockies';

import Creation from '../../interfaces/Creation';
import Creations from '../../interfaces/Creations';
import styles from '../../styles/CreationCard.module.css';
import CreationShare from './CreationShare';
import CreationSocial from './CreationSocial';
import { useReactions } from '../../hooks/useReactions';

import { Modal, Button, Skeleton } from 'antd';

import { FaRetweet } from 'react-icons/fa';
import { BsFillBookmarkFill } from 'react-icons/bs';

export default function CreationCard({
  creation,
  index,
  creations,
}: {
  creation: Creation;
  index: number;
  creations: Creations;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCreation, setCurrentCreation] = useState<Creation>(creation);
  const [currentCreations, setCurrentCreations] =
    useState<Creations>(creations);

  const [_id, setId] = useState<string>('');
  const [user, setUser] = useState<string>('');
  const [textInput, setTextInput] = useState<string>('');
  const [thumbnail, setThumbnail] = useState<string>('');
  const [uri, setUri] = useState<string>('');
  const [createdAt, setCreatedAt] = useState<string>(0);
  const [generatorName, setGeneratorName] = useState<string>('');
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [currentIndex, setCurrentIndex] = useState<number>(index);

  const [isSaveModalActive, setIsSaveModalActive] = useState(false);

  const timeAgoCreatedAt = timeAgo(createdAt);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleCreationUpdate = useCallback(
    (currentCreation, currentIndex) => {
      console.log(currentIndex, currentCreation.task.config.text_input);
      if (currentCreation !== undefined && currentIndex !== 0) {
        setUri(currentCreation.uri);
        setCreatedAt(currentCreation.createdAt);
        setGeneratorName(currentCreation.task.generator.generatorName);
        setWidth(currentCreation.task.config.width);
        setHeight(currentCreation.task.config.height);
        setTextInput(currentCreation.task.config.text_input);
        setUser(currentCreation.user);
        setThumbnail(currentCreation.thumbnail);
        setId(currentCreation._id);
      }
    }
  );

  const handleModalTransition = (direction: string) => {
    console.log(`click ${direction}`);
    console.log(currentIndex);
    console.log(creations);
    console.log(currentCreation.task.config.text_input);
    console.log(currentCreations);

    if (direction === 'next') {
      console.log(currentIndex, currentCreations[currentIndex].createdAt);
      console.log(currentCreations[currentIndex].task.config.text_input);
      console.log(currentIndex, currentCreations[currentIndex + 1].createdAt);
      console.log(currentCreations[currentIndex + 1].task.config.text_input);
      setCurrentIndex(currentIndex + 1);
      // handleCreationUpdate(creations[currentIndex + 1]);
    } else if (direction === 'prev') {
      console.log(currentIndex, currentCreations[currentIndex].createdAt);
      console.log(currentCreations[currentIndex].task.config.text_input);
      console.log(currentIndex, currentCreations[currentIndex - 1].createdAt);
      console.log(currentCreations[currentIndex - 1].task.config.text_input);
      setCurrentIndex(currentIndex - 1);
      // handleCreationUpdate(creations[currentIndex - 1]);
    }
  };

  useEffect(() => {
    setCurrentCreation(creation);
    setCurrentCreations(creations);
    handleCreationUpdate(currentCreation);
  }, [
    creation,
    creations,
    handleCreationUpdate,
    currentCreation,
    currentIndex,
  ]);

  const handlePraise = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    console.log('handle PRAISE 👏 !');
    await axios.post('/api/react', {
      creationId: creation._id,
      reaction: '🙌',
    });
  };

  const handleBurn = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    console.log('handle BURN 🔥 !');
    await axios.post('/api/react', {
      creationId: creation._id,
      reaction: '🔥',
    });
  };

  const handleRecreation = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    console.log('handle RECREATION 🔀 !');
  };

  const handleSave = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    console.log('handle SAVE 🔖!');
    setIsSaveModalActive(true);
  };

  let displayAddress = '';
  if (typeof user === 'string') {
    displayAddress = abbreviateAddress(user);
  }

  const prompt = abbreviateText(textInput, 100);

  return (
    <>
      <section className={styles.creationCardWrapper}>
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
        <article id={`creation-card`} className={styles.creationCard}>
          <div className={styles.crImageWrapper}>
            {thumbnail === '' ? (
              <Skeleton />
            ) : (
              <Image
                src={thumbnail}
                height={height}
                width={width}
                alt={textInput}
              />
            )}
          </div>
          <div className={styles.creationContent}>
            <div
              className='cr-metadata'
              style={{
                display: 'flex',
                flex: 1,
                justifyContent: 'space-around',
              }}
            >
              <span>{_id}</span>
              <span>{status === 'completed' ? '✓' : status}</span>
            </div>
            <div className='cr-content-main-wrapper'>
              <div className='cr-content-main'>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
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
                      <Blockies seed={user} />
                    </div>
                    <span>{displayAddress}</span>
                  </div>
                  <span className='cr-date'>{timeAgoCreatedAt}</span>
                </div>
                <b className='cr-prompt-command'>{`/${generatorName} `}</b>
                <span className='cr-prompt'>{prompt}</span>

                
              </div>
            </div>
          </div>
        </article>
      </Link>
      <div className='cr-social-wrapper'>
        <div style={{ display: 'flex' }}>
          <CreationSocial
            layout={'expanded'}
            creationBurns={1}
            creationPraises={1}
            creationSha={_id}
            praisedByMe={false}
            burnedByMe={false}
          />
          <CreationShare
            layout={'expanded'}
            creationBurns={1}
            creationPraises={1}
            creationSha={_id}
            praisedByMe={false}
            burnedByMe={false}
          />
        </div>
      </div>
      </section>
      <Modal
        title='Basic Modal'
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Button
            shape='circle'
            style={{ marginRight: 15 }}
            onClick={() => handleModalTransition('prev')}
          >
            {'<'}
          </Button>

          <div>
            <p>{_id}</p>
            <p>{textInput}</p>
            <p>{currentIndex}</p>
          </div>

          <Button
            shape='circle'
            style={{ marginLeft: 5 }}
            onClick={() => handleModalTransition('next')}
          >
            {'>'}
          </Button>
        </div>
      </Modal>
    </>
  );
}
