import React, { useContext } from 'react';
import Image from 'next/image';

import AppContext from '../../context/AppContext';

import { Modal, Button } from 'antd';

const CreationModal = ({
  modalOpen,
  setModalOpen,
  creation,
  creationIndex,
}) => {
  const context = useContext(AppContext);
  const currentCreationIndex = context?.currentCreationIndex || 0;
  const setCurrentCreationIndex =
    context?.setCurrentCreationIndex || (() => {});
  const creations = context?.creations || [];

  const handleModalTransition = (direction: string) => {
    console.log(`click ${direction}`);
    console.log(currentCreationIndex);

    if (direction === 'next') {
      setCurrentCreationIndex(currentCreationIndex + 1);
    } else if (direction === 'prev') {
      setCurrentCreationIndex(currentCreationIndex - 1);
    }
  };

  // console.log(currentCreationIndex);
  // console.log(creation);

  return (
    <Modal
      title='Creation Modal'
      open={modalOpen}
      width={'90vw'}
      footer={<></>}
      onCancel={() => setModalOpen(false)}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Button
          shape='circle'
          style={{ marginRight: 15 }}
          onClick={() => handleModalTransition('prev')}
        >
          {'<'}
        </Button>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Image
            src={creation.thumbnail}
            width={creation.task.config.width}
            height={creation.task.config.height}
            alt={creation.task.config.text_input}
          />
          <p>{creation._id}</p>
          <p>{creation.task.config.text_input}</p>
          <p>
            {currentCreationIndex === 0 ? creationIndex : currentCreationIndex}
          </p>
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
  );
};

export default CreationModal;
