import React, { useState, useEffect, useContext, FC } from 'react';

import AppContext from '../../context/AppContext';

import axios from 'axios';

import useCollections from '../../hooks/useCollections';

import { Modal, Button, Input, notification } from 'antd';
import type { NotificationPlacement } from 'antd/es/notification/interface';

interface CreationSaveModalProps {
  modalOpen: boolean;
  setModalOpen: (value: boolean) => void;
}

const CreationSaveModal: FC<CreationSaveModalProps> = ({
  modalOpen,
  setModalOpen,
}) => {
  const [inputCollectionName, setInputCollectionName] = useState('');

  const [api, contextHolder] = notification.useNotification();

  const context = useContext(AppContext);
  const collections = context?.collections || [];
  const selectedCollection = context?.selectedCollection || 'Favorites';
  const setSelectedCollection = context?.setSelectedCollection || (() => {});
  const setCollections = context?.setCollections || (() => []);
  const collectionModalView = context?.collectionModalView || 1;
  const setCollectionModalView = context?.setCollectionModalView || (() => 1);

  // console.log(collections);

  const { collectionsData } = useCollections();

  // console.log(collectionsData);

  const openNotification = (placement: NotificationPlacement) => {
    api.info({
      message: `Collection ${inputCollectionName} created!`,
      description:
        'View your collection in the Collections tab or on your profile page.',
      placement,
    });
  };

  const handleModalCleanUp = () => {
    setModalOpen(false);
    setCollectionModalView(1);
    setInputCollectionName('');
    openNotification('bottom');
  };

  const handleCreateCollection = async (inputCollectionName: string) => {
    console.log('handleCreateCollection');
    const { data } = await axios.post('/api/collection', {
      name: inputCollectionName,
    });

    // console.log(`Created: ${data.collectionName}`);
    setCollections([...collections, data.collectionName]);
    setSelectedCollection(data.collectionName);
    handleModalCleanUp();
  };

  return (
    <Modal open={modalOpen} footer={<></>} onCancel={() => setModalOpen(false)}>
      <div
        className='modalView1'
        style={{
          display: collectionModalView === 1 ? 'flex' : 'none',
          flexDirection: 'column',
        }}
      >
        <h2>{'Save'}</h2>
        <span>{'Quick save and organize later'}</span>
        <Button onClick={() => null}>{'Favorites'}</Button>
        <span>{'Suggestions'}</span>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            display: 'flex',
          }}
        >
          {collections.map((collection, i) => {
            return <Button key={i}>{collection.name}</Button>;
          })}
        </div>

        <Button type='primary' onClick={() => setCollectionModalView(2)}>
          {'Create a collection'}
        </Button>
      </div>

      <div
        className='modalView2'
        style={{
          display: 'flex',
          flexDirection: 'column',
          display: collectionModalView === 2 ? 'flex' : 'none',
        }}
      >
        <h2>{'Create Collection'}</h2>
        <span>{'Name'}</span>
        <Input
          placeholder=''
          onChange={(e) => {
            // console.log(e);
            setInputCollectionName(e.target.value);
          }}
        />
        <Button
          type={'primary'}
          disabled={inputCollectionName === '' ? true : false}
          onClick={() => handleCreateCollection(inputCollectionName)}
        >
          {'Create'}
        </Button>
      </div>
    </Modal>
  );
};

export default CreationSaveModal;
