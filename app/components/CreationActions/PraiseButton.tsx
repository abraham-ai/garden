import React, { useState, useEffect, useContext, MouseEvent } from 'react';

import AppContext from '../../../context/AppContext';

import axios from 'axios';

import { Button } from 'antd';

import { HiSparkles, HiOutlineSparkles } from 'react-icons/hi';

interface PraiseButtonTypes {
  creationId: string;
  praisesData: number;
  isPraisedData: boolean;
  setIsPraised: (value: boolean) => void;
}

const PraiseButton = ({ creationId, praisesData, isPraisedData }: PraiseButtonTypes) => {
  const context = useContext(AppContext);
  const isSignedIn = context?.isSignedIn || false;

  const [praises, setPraises] = useState(praisesData);
  const [isPraised, setIsPraised] = useState(isPraisedData);

  // console.log({ praises, isPraised });
  // console.log({ praisesData, isPraisedData });

  useEffect(() => {
    if (
      typeof praisesData !== 'undefined' &&
      typeof isPraisedData !== 'undefined'
    ) {
      setPraises(praisesData);
      setIsPraised(isPraisedData);
    }
  }, [praisesData, isPraisedData]);

  const handlePraise = async () => {
    // console.log('handle PRAISE 👏 !');
    const { data } = await axios.post('/api/react', {
      creationId: creationId,
      reaction: '🙌',
    });
    // console.log({ data });

    let praiseOpperation = '';

    if (isPraised === true && praises > 0) {
      setPraises(praises - 1);
      praiseOpperation = 'decrease';
      setIsPraised(false);
    } else if (isPraised === false) {
      setPraises(praises + 1);
      praiseOpperation = 'increase';
      setIsPraised(true);
    }

    setIsPraised(!isPraised);
  };

  let praiseCount;
  if (isSignedIn && isPraised) {
    praiseCount =
      praises > 1 ? <span className='social-icon-count'>{praises}</span> : null;
  } else {
    praiseCount =
      praises > 0 ? <span className='social-icon-count'>{praises}</span> : null;
  }

  let praiseClasses;
  if (isSignedIn) {
    praiseClasses = isPraised ? 'cr-praise is-active' : 'cr-praise';
  } else {
    praiseClasses = 'cr-praise disabled';
  }

  return (
    <div className='single-button-wrapper'>
      <Button
        className={praiseClasses}
        shape='round'
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onClick={() => handlePraise()}
      >
        <span
          className='social-icon'
          style={{ display: 'flex', alignItems: 'center' }}
        >
          {isPraised ? <HiSparkles /> : <HiOutlineSparkles />}
        </span>
        <span>{praises}</span>
      </Button>
    </div>
  );
};

export default PraiseButton;
