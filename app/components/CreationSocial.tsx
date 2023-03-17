import React, { useState, useEffect, useContext } from 'react';

import AppContext from '../../context/AppContext';

import { useAccount } from 'wagmi';

import axios from 'axios';
const serverUrl = process.env.EDEN_API_URL;

// ICONS
import { AiFillFire, AiOutlineFire } from 'react-icons/ai';
import { HiSparkles, HiOutlineSparkles } from 'react-icons/hi';
import { FaRetweet } from 'react-icons/fa';
import { BsFillBookmarkFill } from 'react-icons/bs';
import { IoIosShareAlt } from 'react-icons/io';

// HiShare, HiOutlineShare,
// import { ShareAltOutlined } from '@ant-design/icons'
// import { TwitterOutlined, InstagramOutlined } from '@ant-design/icons'

// TYPES
import CreationSocialType from '../../interfaces/CreationSocial';

// STYLES
// import CreationSocialStyles from './CreationSocialStyles';

export default function CreationSocial({
  layout = 'minimal',
  creationBurns,
  creationPraises,
  creationSha,
  praisedByMe,
  burnedByMe,
}: CreationSocialType) {
  //   const navMode = width < 718 ? 'inline' : 'horizontal';

  const [burns, setBurns] = useState(creationBurns);
  const [praises, setPraises] = useState(creationPraises);
  const [isPraised, setIsPraised] = useState(praisedByMe);
  const [isBurned, setIsBurned] = useState(burnedByMe);

  const { address } = useAccount();

  const context = useContext(AppContext);
  const isSignedIn = context?.isSignedIn || false;

  // DEBUG
  // console.log({ creationTextInput });
  // console.log({ creationBurns });
  // console.log({ creationPraises });
  // console.log({ burnedByMe });
  // console.log({ praisedByMe });
  // console.log({ isPraised });
  // console.log({ isBurned });

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
            {/* <Tooltip
              placement='bottom'
              title={'praise'}
              defaultVisible={isTooltipVisible}
              mouseEnterDelay={0.8}
            > */}
            <button className={praiseClasses} onClick={() => praiseHandler()}>
              <span className='social-icon'>
                {isPraised ? (
                  <HiSparkles size='36px' />
                ) : (
                  <HiOutlineSparkles size='36px' />
                )}
              </span>
            </button>
            {/* </Tooltip> */}
            {praiseCount}
          </div>

          <div className='single-button-wrapper'>
            {/* <Tooltip
              placement='bottom'
              title={'burn'}
              defaultVisible={isTooltipVisible}
              mouseEnterDelay={0.8}
            > */}
            <button className={burnClasses} onClick={() => burnHandler()}>
              <span className='social-icon'>
                {isBurned ? <AiFillFire /> : <AiOutlineFire />}
              </span>
            </button>
            {/* </Tooltip> */}
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

          {/* <span className='cr-social remix'>
            <button className='btn'>
              <FaRetweet className='icon' />
              <span className='text'>{remix_count}</span>
            </button>
          </span> */}

          {/* <span className='cr-social views'>
          <button className='btn'>
            <AiFillEye className='icon' />
            <span className='text'>310</span>
          </button>
        </span> */}

          <span className='cr-social bookmark'>
            <button className='btn'>
              <BsFillBookmarkFill className='icon' />
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

      {/* <CreationShare creationSha={creationSha} /> */}
      {/* <span className="single-button-wrapper share">
      <Button className="cr-share" onClick={() => setIsShared(!isShared)}>
      <Paragraph
      copyable={{
          text: `${window?.appConfig?.ABRAHAM_SELF}/creation/${creationSha}`,
          icon: [<HiOutlineShare key="copy-icon" size="36px" />, <HiShare key="copied-icon" />],
          placement: 'bottom',
          tooltips: ['copy link', 'link copied!'],
        }}
        />
        </Button>
    </span> */}
    </div>
    // </CreationSocialStyles>
  );
}
