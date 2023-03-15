import React, { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import axios from 'axios';
import timeAgo from '../../util/timeAgo';

import Blockies from 'react-blockies';

import Creation from '../../interfaces/Creation';
import styles from '../../styles/CreationCard.module.css';

import { FaRetweet } from 'react-icons/fa';
import { BsFillBookmarkFill } from 'react-icons/bs';

export default function CreationCard({ creation }: { creation: Creation }) {
  const { uri, timestamp, task, user, thumbnail, _id } = creation;
  const { config, status } = task;
  const { width, height, text_input } = config;

  // console.log({ creation });
  // console.log(generator);

  const [isSaveModalActive, setIsSaveModalActive] = useState(false);
  const timeAgoTimestamp = timeAgo(timestamp);

  const handlePraise = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    console.log('handle PRAISE 👏 !');
  };

  const handleBurn = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    console.log('handle BURN 🔥 !');
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

  if (typeof user === 'string') {
    let displayAddress = user?.substring(0, 6);
    displayAddress += '...' + user.slice(-4);
  }

  return (
    <article id={`creation-card`} className={styles.creationCard}>
      <Link
        className={styles.crLink}
        href={`/garden?creationId=${creation._id}`}
        as={`/creation/${creation._id}`}
        scroll={false}
        style={{ display: 'flex' }}
      >
        <span>{_id}</span>
        <div className={styles.crImageWrapper} style={{ maxWidth: 20 }}>
          <Image src={thumbnail} height={20} width={20} alt={text_input} />
        </div>
      </Link>
    </article>
  );
}
