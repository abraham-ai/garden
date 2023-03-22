import React, { useContext } from 'react';

import AppContext from '../../../context/AppContext';

import { Button, Popover, notification, Select } from 'antd';

import { BsFillBookmarkFill, BsBookmark } from 'react-icons/bs';

const SaveButton = ({
  isBookmarked,
  setIsBookmarked,
  modalOpen,
  setModalOpen,
}) => {
  const context = useContext(AppContext);
  const isSignedIn = context?.isSignedIn || false;
  const selectedCollection = context?.selectedCollection || 'Favorites';
  const setCollectionModalView = context?.setCollectionModalView || (() => 1);

  const [api, contextHolder] = notification.useNotification();

  const showSaveNotification = () => {
    api.info({
      message: isBookmarked
        ? `Removed from collection ${selectedCollection}`
        : `Saved to your collection ${selectedCollection}`!,
      description: <Button onClick={showModal}>{'Manage Collections'}</Button>,
      placement: 'bottom',
    });
  };

  const handleSave = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    console.log('handle SAVE 🔖!');
    setIsBookmarked(!isBookmarked);
    showSaveNotification();
  };

  const showModal = () => {
    setModalOpen(true);
  };

  const handleCollectionSelect = (value: string) => {
    console.log(`selected ${value}`);
    if (value === 'new') {
      setModalOpen(true);
      setCollectionModalView(1);
      setInputCollectionName('');
    }
  };

  const handleCreateCollection = async (inputCollectionName) => {
    console.log('handleCreateCollection');
    const { data } = await axios.post('/api/collection', {
      name: inputCollectionName,
    });

    console.log(`Created: ${data.result}`);
    setSelectedCollection(data.result);
    setCollections([...collections, data.result]);
    handleModalCleanUp();
  };

  const handleModalCleanUp = () => {
    setModalOpen(false);
    setCollectionModalView(1);
    setInputCollectionName('');
    openNotification('bottom');
  };

  const openNotification = (placement: NotificationPlacement) => {
    api.info({
      message: `Collection ${selectedCollection} created!`,
      description:
        'View your collection in the Collections tab or on your profile page.',
      placement,
    });
  };

  return (
    <>
      <span
        className='cr-social bookmark'
        style={{
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <Select
          defaultValue={selectedCollection}
          style={{ width: 120 }}
          onChange={handleCollectionSelect}
          value={selectedCollection}
          options={[
            {
              label: 'Select Collection',
              options: [
                { label: selectedCollection, value: selectedCollection },
              ],
            },
            {
              label: 'Create',
              options: [{ label: 'New', value: 'new' }],
            },
          ]}
        />
        <Button className='btn' shape={'round'} onClick={() => handleSave()}>
          {isBookmarked ? (
            <BsFillBookmarkFill className='icon' />
          ) : (
            <BsBookmark className='icon' />
          )}
          <span className='text'>{'Save'}</span>
        </Button>
      </span>
      {contextHolder}
    </>
  );
};

export default SaveButton;