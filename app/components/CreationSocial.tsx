import React, { useState, useEffect, useContext } from 'react';

import AppContext from '../../context/AppContext';

import { useAccount } from 'wagmi';

import axios from 'axios';
const serverUrl = process.env.EDEN_API_URL;

import { AiFillFire, AiOutlineFire } from 'react-icons/ai';
import { HiSparkles, HiOutlineSparkles } from 'react-icons/hi';
import { FaRetweet } from 'react-icons/fa';
import { BsFillBookmarkFill, BsBookmark } from 'react-icons/bs';
import { IoIosShareAlt } from 'react-icons/io';


import CreationSocialType from '../../interfaces/CreationSocial';


export default function CreationSocial({
  layout = 'minimal',
  creationBurns,
  creationPraises,
  creationSha,
  praisedByMe,
  burnedByMe,
}: CreationSocialType) {

  const [burns, setBurns] = useState(creationBurns);
  const [praises, setPraises] = useState(creationPraises);
  const [isPraised, setIsPraised] = useState(praisedByMe);
  const [isBurned, setIsBurned] = useState(burnedByMe);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const { address } = useAccount();

  const context = useContext(AppContext);
  const isSignedIn = context?.isSignedIn || false;

  useEffect(() => {
    setIsBurned(burnedByMe);
    setIsPraised(praisedByMe);
    setBurns(creationBurns);
    setPraises(creationPraises);
  }, [praisedByMe, burnedByMe, creationBurns, creationPraises]);

  async function praiseHandler() {
    if (!address) {
      return;
    }
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

    const results = await axios.post(serverUrl + '/update_stats', {
      creation: creationSha,
      stat: 'praise',
      opperation: praiseOpperation,
      address: address,
    });

    setPraises(results.data.praise);
  }

  async function burnHandler() {
    if (!address) {
      return;
    }

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

    const results = await axios.post(serverUrl + '/update_stats', {
      creation: creationSha,
      stat: 'burn',
      opperation: burnOpperation,
      address: address,
    });

    setBurns(results.data.burn);
  }

  let praiseClasses, burnClasses;
  if (isSignedIn) {
    praiseClasses = isPraised ? 'cr-praise is-active' : 'cr-praise';
    burnClasses = isBurned ? 'cr-burn is-active' : 'cr-burn';
  } else {
    praiseClasses = 'cr-praise disabled';
    burnClasses = 'cr-burn disabled';
  }

  const isTooltipVisible = isSignedIn ? null : false;

  let burnCount, praiseCount;
  if ((isSignedIn && isPraised) || isBurned) {
    // console.log('show social based on address count');
    burnCount =
      burns > 1 ? <span className='social-icon-count'>{burns}</span> : null;
    praiseCount =
      praises > 1 ? <span className='social-icon-count'>{praises}</span> : null;
  } else {
    // console.log('show social based on public count');
    burnCount =
      burns > 0 ? <span className='social-icon-count'>{burns}</span> : null;
    praiseCount =
      praises > 0 ? <span className='social-icon-count'>{praises}</span> : null;
  }

  return (
    // <CreationSocialStyles id='social-buttons'>
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        flex: 1,
      }}
    >
      {layout === 'minimal' ? (
        <>
          <div className='single-button-wrapper'>
            <button className={praiseClasses} onClick={() => praiseHandler()}>
              <span className='social-icon'>
                {isPraised ? (
                  <HiSparkles size='36px' />
                ) : (
                  <HiOutlineSparkles size='36px' />
                )}
              </span>
            </button>
            {praiseCount}
          </div>

          <div className='single-button-wrapper'>
            <button className={burnClasses} onClick={() => burnHandler()}>
              <span className='social-icon'>
                {isBurned ? <AiFillFire /> : <AiOutlineFire />}
              </span>
            </button>
            {burnCount}
          </div>
        </>
      ) : (
        <>
          <button className={praiseClasses} onClick={() => praiseHandler()}>
            <span className='social-icon'>
              {isPraised ? <HiSparkles /> : <HiOutlineSparkles />}
            </span>
          </button>

          <button className={burnClasses} onClick={() => burnHandler()}>
            <span className='social-icon'>
              {isBurned ? <AiFillFire /> : <AiOutlineFire />}
            </span>
          </button>

          <span className='cr-social bookmark'>
            <button className='btn'>
                {isBookmarked ? <BsFillBookmarkFill  className='icon' /> : <BsBookmark  className='icon' />}
              <span className='text'>Save</span>
            </button>
          </span>

          <span className='cr-social share'>
            <button className='btn'>
              <IoIosShareAlt className='icon' />
              <span className='text'>Share</span>
            </button>
          </span>
        </>
      )}
    </div>
  );
}
