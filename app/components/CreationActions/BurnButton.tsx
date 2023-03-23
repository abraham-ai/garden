import React, { useState, useEffect, useContext, MouseEvent } from 'react';

import AppContext from '../../../context/AppContext';

import axios from 'axios';

import { Button } from 'antd';

import { AiFillFire, AiOutlineFire } from 'react-icons/ai';

const BurnButton = ({ creationId, burnsData, isBurnedData }) => {
  const context = useContext(AppContext);
  const isSignedIn = context?.isSignedIn || false;

  const [burns, setBurns] = useState(burnsData);
  const [isBurned, setIsBurned] = useState(isBurnedData);

  console.log({ burns, isBurned });
  console.log({ burnsData, isBurnedData });

  useEffect(() => {
    if (
      typeof burnsData !== 'undefined' &&
      typeof isBurnedData !== 'undefined'
    ) {
      setBurns(burnsData);
      setIsBurned(isBurnedData);
    }
  }, [burnsData, isBurnedData]);

  const handleBurn = async (
    event: MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    console.log('handle BURN 🔥 !');
    const { data } = await axios.post('/api/react', {
      creationId: creationId,
      reaction: '🔥',
    });
    console.log({ data });

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

  return (
    <div className='single-button-wrapper'>
      <Button
        className={burnClasses}
        shape='round'
        onClick={() => handleBurn()}
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <span
          className='social-icon'
          style={{ display: 'flex', alignItems: 'center' }}
        >
          {isBurned ? <AiFillFire /> : <AiOutlineFire />}
        </span>
        <span>{burns}</span>
      </Button>
    </div>
  );
};

export default BurnButton;
