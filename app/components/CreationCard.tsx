import React, { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import axios from 'axios';
import timeAgo from '../../util/timeAgo';
import abbreviateText from '../../util/abbreviateText';
import abbreviateAddress from '../../util/abbreviateAddress';

import Blockies from 'react-blockies';

import Creation from '../../interfaces/Creation';
import styles from '../../styles/CreationCard.module.css';
import CreationShare from './CreationShare';
import CreationSocial from './CreationSocial';
import { useReactions } from '../../hooks/useReactions';

import { FaRetweet } from 'react-icons/fa';
import { BsFillBookmarkFill } from 'react-icons/bs';

export default function CreationCard({ creation }: { creation: Creation }) {
  console.log(creation);

  const { uri, createdAt, task, user, thumbnail, _id } = creation;
  const { config, status, generator } = task;
  const { generatorName } = generator;
  const { width, height, text_input } = config;

  // social reactions
  const { praises, burns } = useReactions(creation._id);

  // console.log({ creation });
  // console.log(generator);

  const [isSaveModalActive, setIsSaveModalActive] = useState(false);
  const timeAgoCreatedAt = timeAgo(createdAt);

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

  // Function to abbreviate the text_input to 144 characters)
  // Abbreviate the text_input
  const prompt = abbreviateText(text_input, 100);

  return (
    <Link
      className={styles.crLink}
      href={{
        pathname: `/creation/${creation._id}`,
        query: {
          uri: uri,
          createdAt: createdAt,
          generatorName: generatorName,
          width: width,
          height: height,
          text_input: text_input,
          user: user,
          thumbnail: thumbnail,
          _id: _id,
          status: status,
        },
      }}
      // href={`/garden?creationId=${creation._id}`}
      // as={`/creation/${creation._id}`}
      scroll={false}
      style={{ display: 'flex', color: 'black', flexDirection: 'column' }}
    >
      <article id={`creation-card`} className={styles.creationCard}>
        <div className={styles.crImageWrapper} style={{ maxWidth: 20 }}>
          <Image src={thumbnail} height={20} width={20} alt={text_input} />
        </div>
        <div
          className='cr-metadata'
          style={{ display: 'flex', flex: 1, justifyContent: 'space-around' }}
        >
          <span>{_id}</span>
          <span>{status}</span>
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

            <div className='cr-social-wrapper'>
              {/* <CreationSocials /> */}
              <div style={{ display: 'flex' }}>
                <CreationSocial
                  layout={'expanded'}
                  creationBurns={1}
                  creationPraises={1}
                  creationSha={_id}
                  praisedByMe={true}
                  burnedByMe={false}
                />
                <CreationShare
                  layout={'expanded'}
                  creationBurns={1}
                  creationPraises={1}
                  creationSha={_id}
                  praisedByMe={true}
                  burnedByMe={false}
                />
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
