import React, { useState, useEffect, useContext, useMemo, useRef, FC } from 'react';

import AppContext from '../../context/AppContext';

import axios from 'axios';

import useGetCollections from '../../hooks/useGetCollections';

import Collection from '../../interfaces/Collection'

import { Modal, Button, Input, notification, Typography, Row, Col } from 'antd';
const { Text } = Typography;

import type { InputRef } from 'antd'
import type { NotificationPlacement } from 'antd/es/notification/interface';

import { MdModeEdit } from 'react-icons/md';
import { TiDelete } from 'react-icons/ti';
import { BiLeftArrowAlt } from 'react-icons/bi';

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
    display: 'flex',
  },
}

const CreationSaveModal: FC<CreationSaveModalProps> = ({
  modalOpen,
  setModalOpen,
  creationId
}) => {
  const [inputCollectionName, setInputCollectionName] = useState('');

  const [isRenameCollection, setIsRenameCollection] = useState(false);
  const [currentRenameCollection, setCurrentRenameCollection] = useState('');

  const [api, contextHolder] = notification.useNotification();

  const context = useContext(AppContext);
  const collections = context?.collections || [];
  const selectedCollection = context?.selectedCollection || '';
  const setSelectedCollection = context?.setSelectedCollection || (() => {});
  const setCollections = useMemo(() => context?.setCollections || (() => []), [context]);
  
  const collectionModalView = context?.collectionModalView;
  const setCollectionModalView = (value: number) => {
    context?.setCollectionModalView(value);
  };

  // const inputCollectionRef = useRef<InputRef>(null);

  const { collectionsData } = useGetCollections();

  console.log(collections)
  console.log(collectionsData)
  console.log(collectionModalView)


  const openNotification = (placement: NotificationPlacement) => {
    api.info({
      message: `Collection ${inputCollectionName} created!`,
      description:
        'View your collection in the Collections tab or on your profile page.',
      placement,
    });
  };


  useEffect(() => {
    console.log('USE-EFFECT')
    console.log({collectionsData})
    if (typeof collectionsData !== 'undefined' ) {
      console.log('SET COLLECTIONS!')
      setCollections(collectionsData);
    }
  }, [collectionsData, setCollections]);

  const handleModalCleanUp = () => {
    setModalOpen(false);
    setCollectionModalView(0);
    setInputCollectionName('');
    openNotification('center');
  };

  const handleFirstModal = () => {
    console.log('handleFirstModal');
    setCollectionModalView(1)
  }

  const handleCreateCollection = async (inputCollectionName: string) => {
    const { data } = await axios.post('/api/collection/create', {
      name: inputCollectionName,
      creationId: creationId,
    });
  
    setCollections(prevCollections => [...prevCollections, data]);
    setSelectedCollection(data.name);
    handleModalCleanUp();
  };

  const handleSaveToCollection = async (collectionId, creationId) => {
    const { data } = await axios.post('/api/collection/save', {
      collectionId: collectionId,
      creationId: creationId,
    });
  }

  const handleRenameCollectionName = async (inputCollectionName: string, collectionId: string) => {
    const { data } = await axios.post('/api/collection/rename', {
      inputCollectionName: inputCollectionName,
      collectionId: collectionId,
    });
  }

  const handleDeleteCollectionName = async (inputCollectionName: string) => {
    const { data } = await axios.post('/api/collection/delete', {
      name: inputCollectionName,
    });
  }

  const openRenameCollectionView = (collectionName, collectionId) => {
    setCollectionModalView(1)
    setIsRenameCollection(true)
    setCurrentRenameCollection(collectionName)

    if (inputCollectionRef.current) {
      inputCollectionRef.current!.focus({
        cursor: 'start',
      });
    }
  }

  console.log({collections})
  console.log({ collectionsData })


  return (
    <Modal open={modalOpen} footer={<></>} onCancel={() => setModalOpen(false)}>
      <span style={{ display: 'flex', justifyContent: 'flex-start', color: 'silver' }}>
        {`Modal View: ${collectionModalView}`}
      </span>

      { collectionModalView === 0 ? 
        <article style={styles.modalView1}>
          { collections.length > 0 ? 
             <>
              {/* <h2>{'Save'}</h2>
              <span>{'Quick save and organize later'}</span>
              
              <Row>
                <Button onClick={() => null} style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>{selectedCollection}</Button>
                <Button onClick={() => null} style={{ display: 'flex', alignItems: 'center' }}><MdModeEdit size={'1rem'}/></Button>
              </Row> */}

              <Text style={{ fontWeight: 'bold', fontSize: '1rem', marginBottom: 10 }}>{'Your Collections.'}</Text>
              <Col>
                {collections.map((collection: Collection, i: number) => {
                  console.log(collection.name)
                  return (
                    <Row key={i} style={{ marginBottom: 5 }}>
                      <Button shape='round' onClick={() => handleSaveToCollection(collection._id, creationId)} style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>{collection.name}</Button>
                      <Button shape='circle' onClick={() => openRenameCollectionView(collection.name, collection._id)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: 5 }}><MdModeEdit size={'1rem'}/></Button>
                      <Button shape='circle' onClick={() => handleDeleteCollectionName(collection._id)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: 5 }}><TiDelete size={'1.2rem'} style={{color: 'red'}} /></Button>
                    </Row>
                  );
                })}
              </Col>
            </>
          :
            <Text style={styles.textNotification}>{'You don’t have any collections yet.'}</Text>
          }
          <Button shape='round' type='primary' onClick={() => handleFirstModal()} style={{ marginTop: 10 }}>
            {'Create a collection'}
          </Button>
        </article>
      :
        null }

      { collectionModalView === 1 ? 
        <article style={styles.modalView2}>
          {isRenameCollection ? 
            <>
              <Row style={{ display: 'flex', alignItems: 'center', marginBottom: 10}}>
                <Button type='link' style={{ marginLeft: 0, paddingLeft: 0, alignItems: 'center' }} onClick={() => setCollectionModalView(0)}><BiLeftArrowAlt size={'1.2rem'} /></Button>
                <Text style={{ fontWeight: 'bold', fontSize: '1rem', marginRight: 5, alignItems: 'center', display: 'flex' }}>{`Rename Collection:`}</Text>
              </Row>

              <Input
                placeholder={currentRenameCollection}
                onChange={(e) => {
                  setInputCollectionName(e.target.value);
                }}
                // ref={inputCollectionRef}
              />
              <Button
                type={'primary'}
                shape='round'
                style={{ marginTop: 10 }}
                disabled={inputCollectionName === '' ? true : false}
                onClick={() => handleRenameCollectionName(currentRenameCollection, creationId)}
                >
                {'Rename'}
              </Button>
            </>
          :
            <>
              <Row>
                <Button type='link' style={{ marginLeft: 0, paddingLeft: 0}} onClick={() => setCollectionModalView(0)}><BiLeftArrowAlt size={'1rem'} /></Button>
                <Text style={{ fontWeight: 'bold', fontSize: '1rem', marginRight: 5 }}>{'Create Collection'}</Text>
              </Row>
              
              <Input
                placeholder=''
                onChange={(e) => {
                  setInputCollectionName(e.target.value);
                }}
                />
              <Button
                type={'primary'}
                shape='round'
                style={{ marginTop: 10 }}
                disabled={inputCollectionName === '' ? true : false}
                onClick={() => handleCreateCollection(inputCollectionName, creationId)}
                >
                {'Create'}
            </Button>
            </>
          }
        </article>
      : null }

    </Modal>
  );
};

export default CreationSaveModal;
