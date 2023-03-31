import React, { useState, useEffect, useContext, MouseEvent, FC } from 'react';

import AppContext from '../../../context/AppContext';

import axios from 'axios';

import { Button } from 'antd';

import { AiFillFire, AiOutlineFire } from 'react-icons/ai';

interface BurnButtonTypes {
  creationId: string;
  burnsData: number;
  isBurnedData: boolean;
  setIsBurned: (value: boolean) => void;
}

const BurnButton: FC<BurnButtonTypes> = ({
  creationId,
  burnsData,
  isBurnedData,
}: BurnButtonTypes) => {
  const context = useContext(AppContext);
  const isSignedIn = context?.isSignedIn || false;

  const [burns, setBurns] = useState(burnsData);
  const [isBurned, setIsBurned] = useState(isBurnedData);

  // console.log({ burns, isBurned });
  // console.log({ burnsData, isBurnedData });

  useEffect(() => {
    if (
      typeof burnsData !== 'undefined' &&
      typeof isBurnedData !== 'undefined'
    ) {
      setBurns(burnsData);
      setIsBurned(isBurnedData);
    }
  }, [burnsData, isBurnedData]);

  const handleBurn = async () => {
    // console.log('handle BURN 🔥 !');
    const { data } = await axios.post('/api/react', {
      creationId: creationId,
      reaction: '🔥',
    });
    // console.log({ data });

    let burnOpperation = '';

    if (isBurned === true && burns > 0) {
      setBurns(burns - 1);
      burnOpperation = 'decrease';
      setIsBurned(false);
    } else if (isBurned === false) {
      setBurns(burns + 1);
      burnOpperation = 'increase';
      setIsBurned(true);
    }

    // const results = await axios.post(serverUrl + '/update_stats', {
    //   creation: creationSha,
    //   stat: 'burn',
    //   opperation: burnOpperation,
    //   address: address,
    // });

    // setBurns(results.data.burn);
    setIsBurned(!isBurned);
  };

  let burnCount;

  if (isSignedIn && isBurned) {
    burnCount =
      burns > 1 ? <span className='social-icon-count'>{burns}</span> : null;
  } else {
    burnCount =
      burns > 0 ? <span className='social-icon-count'>{burns}</span> : null;
  }

  let burnClasses;
  if (isSignedIn) {
    burnClasses = isBurned ? 'cr-burn is-active' : 'cr-burn';
  } else {
    burnClasses = 'cr-burn disabled';
  }

  const burnGray = (
    <span style={{ filter: 'grayscale(1)' }}>{'🔥'}</span>
  )

  const burnFilled = (
    <span>{'🔥'}</span>
  )

  return (
    <div className='single-button-wrapper'>
      <Button
        className={burnClasses}
        shape='round'
        type='link'
        onClick={() => handleBurn()}
        style={{
          display: 'flex',
          alignItems: 'center',
          height: 'auto'
        }}
      >
        <span
          className='social-icon'
          style={{ display: 'flex', alignItems: 'center' }}
        >
          {isBurned ? burnFilled : burnGray}
        </span>
        <span>{burns}</span>
      </Button>
    </div>
  );
};

export default BurnButton;
