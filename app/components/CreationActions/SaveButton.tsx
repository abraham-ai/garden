import React, { useContext, useState } from 'react'

import AppContext from '../../../context/AppContext'

import { Button, Popover, notification, Select } from 'antd'
import type { NotificationPlacement } from 'antd/es/notification/interface'

import axios from 'axios'

import { RiBookmarkFill, RiBookmarkLine } from 'react-icons/ri'

import styles from '../../../styles/CreationSocial.module.css'

const SaveButton = ({
  isBookmarked,
  setIsBookmarked,
  modalOpen,
  setModalOpen
}) => {
  const [isSaveHovering, setIsSaveHovering] = useState(false)

  const context = useContext(AppContext)
  const isSignedIn = context?.isSignedIn || false
  const selectedCollection = context?.selectedCollection || 'Favorites'
  const setCollectionModalView = context?.setCollectionModalView || (() => 1)
  const collections = context?.collections || []
  const setCollections = context?.setCollections || (() => [])
  const setSelectedCollection = context?.setSelectedCollection || (() => {})

  const [api, contextHolder] = notification.useNotification()

  const showSaveNotification = () => {
    api.info({
      message: isBookmarked
        ? `Removed from collection ${selectedCollection}`
        : `Saved to your collection ${selectedCollection}`!,
      description: <Button onClick={showModal}>{'Manage Collections'}</Button>,
      placement: 'bottom'
    })
  }

  const handleSave = () => {
    // console.log('handle SAVE 🔖!')
    setIsBookmarked(!isBookmarked)
    // showSaveNotification()
    setModalOpen(true)
    setCollectionModalView(0)
  }

  const showModal = () => {
    setModalOpen(true)
  }

  const handleCollectionSelect = (value: string) => {
    // console.log(`selected ${value}`)
    if (value === 'new') {
      setModalOpen(true)
      setCollectionModalView(1)
      // setInputCollectionName('')
    }
  }

  const handleCreateCollection = async (inputCollectionName) => {
    // console.log('handleCreateCollection')
    const { data } = await axios.post('/api/collection/create', {
      name: inputCollectionName,
    })

    // console.log(`Created: ${data.result}`)
    setSelectedCollection(data.result)
    setCollections(prevState => [...prevState, data.result])
    handleModalCleanUp()
  }

  const handleModalCleanUp = () => {
    setModalOpen(false)
    setCollectionModalView(0)
    // setInputCollectionName('')
    openNotification('bottom')
  }

  const handleMouseOver = () => {
    console.log('handleMouseOver')
    setIsSaveHovering(true)
  }

  const handleMouseOut = () => {
    console.log('handleMouseOut')
    setIsSaveHovering(false)
  }

  const openNotification = (placement: NotificationPlacement) => {
    api.info({
      message: `Collection ${selectedCollection} created!`,
      description:
        'View your collection in the Collections tab or on your profile page.',
      placement: 'bottom'
    })
  }

  const bgHoverStyles = isSaveHovering === true ? 'rgb(26, 115, 232, 0.4)' : 'rgba(0, 0, 0, 0.5)'

  return (
    <>
      <span
        className='crSocial bookmark'
        style={{
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between',
          marginBottom: 5
        }}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        {/* <Select
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
        /> */}
        <Button className='btn' shape={'circle'} type='link' onClick={() => { handleSave() }} style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: bgHoverStyles,
          width: 50,
          height: 50,
          border: 'none',
          transition: '300ms'
        }}>
          {isBookmarked === true || isSaveHovering === true ? (
            <RiBookmarkFill className={styles.crSocialIcon} style={{ fontSize: '1rem', minWidth: 25, minHeight: 25, color: '#1a73e8' }} />
          ) : (
            <RiBookmarkLine className={styles.crSocialIcon} style={{ fontSize: '1rem', minWidth: 25, minHeight: 25 }} />
            // <BsFillBookmarkFill className={styles.crSocialIcon} style={{ fontSize: '1rem' }} />
          )}
          {/* <span className='text'>{'Save'}</span> */}
        </Button>
      </span>
      {contextHolder}
    </>
  )
}

export default SaveButton
