import React, { useState, useEffect, useContext, useMemo, FC } from 'react';

import AppContext from '../../context/AppContext';

import axios from 'axios';

import useCollections from '../../hooks/useCollections';

import Collection from '../../interfaces/Collection'

import { Modal, Button, Input, notification, Typography } from 'antd';
const { Text } = Typography;
import type { NotificationPlacement } from 'antd/es/notification/interface';

interface CreationSaveModalProps {
  modalOpen: boolean;
  setModalOpen: (value: boolean) => void;
}

const styles = {
  modalView1: {
    display: 'flex',
    flexDirection: 'column',
  },
  modalView2: {
    flexDirection: 'column',
    display: 'none',
  },
  textNotification: {
    display: 'flex',
    justifyContent: 'center',
    padding: 5,
    fontSize: '1.3em'
  }
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
  const setCollections = useMemo(() => context?.setCollections || (() => []), [context]);
  
  const collectionModalView = context?.collectionModalView || 1;
  const setCollectionModalView = context?.setCollectionModalView || (() => 1);

  const { collectionsData } = useCollections();

  console.log(collections)
  console.log(collectionsData)


  const openNotification = (placement: NotificationPlacement) => {
    api.info({
      message: `Collection ${inputCollectionName} created!`,
      description:
        'View your collection in the Collections tab or on your profile page.',
      placement,
    });
  };


  useEffect(() => {
    if (typeof collectionsData !== 'undefined' && collectionsData === null ) {
      setCollections(collectionsData);
    }
  }, [collectionsData, setCollections]);

  const handleModalCleanUp = () => {
    setModalOpen(false);
    setCollectionModalView(1);
    setInputCollectionName('');
    openNotification('center');
  };

  const handleCreateCollection = async (inputCollectionName: string) => {
    const { data } = await axios.post('/api/collection', {
      name: inputCollectionName,
    });

    // console.log(`Created: ${data.collectionName}`);
    setCollections(prevCollections => [...prevCollections, data.collectionName]);
    setSelectedCollection(data.collectionName);
    handleModalCleanUp();
  };

  return (
    <Modal open={modalOpen} footer={<></>} onCancel={() => setModalOpen(false)}>
      
      <article
        style={styles.modalView1}
      >
        { collections.length > 0 || typeof collections > 0 ? 
          <>
            <h2>{'Save'}</h2>
            <span>{'Quick save and organize later'}</span>
            <Button onClick={() => null}>{'Favorites'}</Button>
            <span>{'Suggestions'}</span>
            <div
              style={{
                flexDirection: 'column',
              }}
              >
              {collections.map((collection: Collection, i: number) => {
                return <Button key={i}>{collection.name}</Button>;
              })}
            </div>
          </>
        :
          <Text style={styles.textNotification}>{'You don’t have any collections yet.'}</Text>
        }

        <Button type='primary' shape='round' onClick={() => setCollectionModalView(2)}>
          {'Create a collection'}
        </Button>
      </article>

      <article
        style={styles.modalView2}
      >
        <h2>{'Create Collection'}</h2>
        <span>{'Name'}</span>
        <Input
          placeholder=''
          onChange={(e) => {
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
      </article>
    </Modal>
  );
};

export default CreationSaveModal;
