import React, { useState, useEffect, useContext } from 'react';

import AppContext from '../../context/AppContext';

import { useAccount } from 'wagmi';

import axios from 'axios';
const serverUrl = process.env.EDEN_API_URL;

import { Modal, Button, Input, notification, Select } from 'antd';
import type { NotificationPlacement } from 'antd/es/notification/interface';

import { FaRetweet } from 'react-icons/fa';

import CreationSocialType from '../../interfaces/CreationSocial';
import CreationSaveModal from './CreationSaveModal';

import SaveButton from './CreationActions/SaveButton';
import BurnButton from './CreationActions/BurnButton';
import PraiseButton from './CreationActions/PraiseButton';
import ShareButton from './CreationActions/ShareButton';
import RemixButton from './CreationActions/RemixButton';

const styles = {
  socialTopWrapper: {
    width: '100%',
    justifyContent: 'space-between',
    position: 'absolute',
    top: 0,
    padding: '10px',
  },
  socialBottomWrapper: {
    alignItems: 'flex-end',
    width: '100%',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    padding: '10px',
  }
}

const CreationSocial = ({
  layout = 'minimal',
  creationBurns,
  creationPraises,
  creationId,
  praisedByMe,
  burnedByMe,
}: CreationSocialType) => {
  const [burns, setBurns] = useState(creationBurns);
  const [isBurned, setIsBurned] = useState(burnedByMe);

  const [praises, setPraises] = useState(creationPraises);
  const [isPraised, setIsPraised] = useState(praisedByMe);

  const [isBookmarked, setIsBookmarked] = useState(false);

  const [remixes, setRemixes] = useState(0);
  const [isRemixed, setIsRemixed] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalView, setModalView] = useState(1);

  const { address } = useAccount();

  const context = useContext(AppContext);
  const isSignedIn = context?.isSignedIn || false;
  const currentCreationIndex = context?.currentCreationIndex || 0;

  useEffect(() => {
    setIsPraised(praisedByMe);
    setIsBurned(burnedByMe);
    setBurns(creationBurns);
    setPraises(creationPraises);
  }, [praisedByMe, burnedByMe, creationBurns, creationPraises]);

  const [api, contextHolder] = notification.useNotification();

  const isTooltipVisible = isSignedIn ? null : false;

  // console.log({ creationPraises, praisedByMe, creationBurns, burnedByMe });
  // console.log({ praises, isPraised, burns, isBurned });

  return (
    <>
      <div
        style={styles.socialTopWrapper}
      >
        <SaveButton
          isBookmarked={isBookmarked}
          setIsBookmarked={setIsBookmarked}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
        />
        <BurnButton
          creationId={creationId}
          burnsData={burns}
          isBurnedData={isBurned}
          setIsBurned={setIsBurned}
        />
        <PraiseButton
          creationId={creationId}
          praisesData={praises}
          isPraisedData={isPraised}
          setIsPraised={setIsPraised}
        />
        {/* <RemixButton
          creationId={creationId}
          remixes={remixes}
          isRemixed={isRemixed}
          setIsRemixed={setIsRemixed}
        /> */}
        <ShareButton creationId={creationId} />
      </div>

      {/* <div
        style={styles.socialBottomWrapper}
      >
      </div> */}

      <CreationSaveModal modalOpen={modalOpen} setModalOpen={setModalOpen} creationId={creationId} />

      {contextHolder}
    </>
  );
};

export default CreationSocial;
