import React, { useContext, useState } from 'react'

import AppContext from '../../../context/AppContext'

import { Button, notification } from 'antd'
import type { NotificationPlacement } from 'antd/es/notification/interface'

import axios from 'axios'

import { RiBookmarkFill, RiBookmarkLine } from 'react-icons/ri'

import styles from '../../../styles/CreationSocial.module.css'

interface SaveButtonTypes {
  isBookmarked: boolean
  setIsBookmarked: (value: boolean) => void
}

const SaveButton: FC<SaveButtonTypes> = ({
  isBookmarked,
  setIsBookmarked,
  creation
}) => {
  const [isSaveHovering, setIsSaveHovering] = useState(false)

  const context = useContext(AppContext)

  const isSignedIn = context?.isSignedIn || false
  const isWalletConnected = context?.isWalletConnected || false

  const selectedCollection = context?.selectedCollection || 'Favorites'
  const setCollectionModalView = context?.setCollectionModalView || (() => 1)
  const collections = context?.collections || []
  const setCollections = context?.setCollections || (() => [])
  const setSelectedCollection = context?.setSelectedCollection || (() => {})

  const setIsSaveCreationModalOpen = context?.setIsSaveCreationModalOpen || (() => {})
  const setCurrentCreationModalCreation = context?.setCurrentCreationModalCreation || (() => {})

  const [api, contextHolder] = notification.useNotification()
  
  // console.log({ isSignedIn })

  const showSaveNotification = (): void => {
    api.info({
      message: isBookmarked === true
        ? `Removed from collection ${String(selectedCollection)}`
        : `Saved to your collection ${String(selectedCollection)}!`,
      description: <Button onClick={showModal}>{'Manage Collections'}</Button>,
      placement: 'bottom'
    })
  }

  const handleSave = (): void => {
    // console.log({ isSignedIn })
    if (isSignedIn === false) {
      return
    } else if (isSignedIn === true && isWalletConnected === false) {
      return
    } else {
      console.log('handle SAVE 🔖!')
      setIsBookmarked(isBookmarked === true ? false : true)
      // showSaveNotification()
      setIsSaveCreationModalOpen(true)
      setCurrentCreationModalCreation(creation)
      setCollectionModalView(0)
    }
  }

  const showModal = (): void => {
    setIsSaveCreationModalOpen(true)
  }

  const handleMouseOver = (): void => {
    // console.log('handleMouseOver')
    setIsSaveHovering(true)
  }

  const handleMouseOut = (): void => {
    // console.log('handleMouseOut')
    setIsSaveHovering(false)
  }

  const openNotification = (placement: NotificationPlacement) => {
    api.info({
      message: `Collection ${String(selectedCollection)} created!`,
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
        <Button className='btn' shape={'circle'} type='link'
          onClick={() => { handleSave() }} style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: bgHoverStyles,
          width: 50,
          height: 50,
          border: 'none',
          transition: '300ms'
        }}>
          {isBookmarked === true || isSaveHovering === true 
            ? 
              (
                <RiBookmarkFill className={styles.crSocialIcon} style={{ fontSize: '1rem', minWidth: 25, minHeight: 25, color: '#1a73e8' }} />
              )
            : (
                <RiBookmarkLine className={styles.crSocialIcon} style={{ fontSize: '1rem', minWidth: 25, minHeight: 25 }} />
                // <BsFillBookmarkFill className={styles.crSocialIcon} style={{ fontSize: '1rem' }} />
              )
            }
            {/* <span className='text'>{'Save'}</span> */}
        </Button>
      </span>
      {contextHolder}
    </>
  )
}

export default SaveButton
