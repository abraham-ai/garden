import React, { useContext, MouseEvent } from 'react';

import AppContext from '../../../context/AppContext';

import axios from 'axios';

import { Button } from 'antd';

import { FaRetweet } from 'react-icons/fa';

const RemixButton = ({ creationId, isRemixed, remixes }) => {
  const context = useContext(AppContext);
  const isSignedIn = context?.isSignedIn || false;

  const remixHandler = (event: MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log('handle Remix 🔀 !');
  };

  let remixClass;
  if (isSignedIn) {
    remixClass = isRemixed ? 'cr-remix is-active' : 'cr-remix';
  } else {
    remixClass = 'cr-remix disabled';
  }

  return (
    <div
      className='single-button-wrapper'
      style={{ display: 'flex', alignItems: 'center' }}
    >
      <Button
        shape='round'
        className={remixClass}
        onClick={() => remixHandler()}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          className='social-icon'
          style={{ display: 'flex', alignItems: 'center' }}
        >
          {isRemixed ? <FaRetweet size='18px' /> : <FaRetweet size='18px' />}
        </span>
        <span>{remixes}</span>
      </Button>
    </div>
  );
};

export default RemixButton;
