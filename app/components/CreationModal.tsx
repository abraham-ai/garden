import styles from '../../styles/CreationModal.module.css'
import React, { useContext } from 'react'
import Image from 'next/image'

import AppContext from '../../context/AppContext'

import Blockies from 'react-blockies'

import timeAgo from '../../util/timeAgo'
import abbreviateText from '../../util/abbreviateText'
import abbreviateAddress from '../../util/abbreviateAddress'

import { Button, Modal, Typography } from 'antd'
const { Text } = Typography

const CreationModal = ({
  modalOpen,
  setModalOpen,
  creation,
  creationIndex,
}: { modalOpen: boolean, setModalOpen: () => void, creation: Creation, creationIdex: nummber }) => {
  const context = useContext(AppContext)
  const currentCreationIndex = context?.currentCreationIndex || 0
  const setCurrentCreationIndex =
    context?.setCurrentCreationIndex || (() => {})
  const creations = context?.creations || []

  const handleModalTransition = (direction: string) => {
    // console.log(`click ${direction}`)
    // console.log(currentCreationIndex)

    if (direction === 'next') {
      setCurrentCreationIndex(currentCreationIndex + 1)
    } else if (direction === 'prev') {
      setCurrentCreationIndex(currentCreationIndex - 1)
    }
  }

  const timeAgoCreatedAt = timeAgo(Date.parse(creation.createdAt))

  // console.log(currentCreationIndex)
  // console.log(creation)

  let displayAddress = ''
  if (typeof creation.user === 'string') {
    displayAddress = abbreviateAddress(creation.user)
  }

  let prompt = ''
  // console.log({ textInput })
  const creationTextInput = creation.task.config.text_input
  if (creationTextInput !== '' && typeof creationTextInput !== 'undefined') {
    prompt = abbreviateText(creationTextInput, 200) // 100
  }

  // console.log({ praises, praised, burns, burned })

  return (
    <Modal
      title=''
      open={modalOpen}
      width={'90vw'}
      footer={<></>}
      onCancel={() => { setModalOpen(false) }}
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
        <Button
          shape='circle'
          style={{ position: 'absolute', transform: 'translateX(-45px)' }}
          onClick={() => { handleModalTransition('prev') }}
        >
          {'<'}
        </Button>
      <div style={{ display: 'flex', alignItems: 'center', borderRadius: 10, overflow: 'hidden' }}>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex' }}>

            <div
              style={{
                flex: '1 0 600px',
                justifyContent: 'center',
                maxWidth: '100%',
                background: 'rgb(0, 0, 0)',
                position: 'relative',
                overflow: 'hidden',
                maxHeight: 800,
                alignItems: 'center',
                display: 'flex'
                // padding: '0px 80px'
              }}
            >
              <Image
                src={creation.thumbnail}
                width={creation.task.config.width}
                height={creation.task.config.height}
                alt={creation.task.config.text_input}
                style={{
                  width: '100%',
                  height: 'auto',
                  zIndex: 50
                }}
              />
              <Image
                src={creation.thumbnail}
                width={creation.task.config.width}
                height={creation.task.config.height}
                alt={creation.task.config.text_input}
                style={{
                  position: 'absolute',
                  width: 'auto',
                  height: '100%',
                  zIndex: 0,
                  filter: 'blur(16px)',
                  background: 'black'
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', padding: 40, justifyContent: 'center' }}>
              <article style={{ display: 'flex', alignItems: 'center', marginBottom: 50 }}>
                <div style={{ display: 'flex', alignItems: 'center', marginRight: 10 }}>
                  <span
                    style={{
                      borderRadius: '50%',
                      overflow: 'hidden',
                      width: '32px',
                      height: '32px',
                      marginRight: 10
                    }}
                  >
                    <Blockies seed={creation.user} />
                  </span>
                  <Text className={styles.displayAddress} style={{ color: 'black' }}>{displayAddress}</Text>
                </div>
                <Text className={styles.crDate}>{timeAgoCreatedAt}</Text>
              </article>

              <article className={styles.promptWrapper}>
                <Text className={styles.crPromptCommand}>{`/${creation.task.generator.generatorName} `}</Text>
                <Text className={styles.crPrompt}>{prompt}</Text>
              </article>

                <span style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', marginTop: 10, flex: 0, justifyContent: 'flex-end' }}>
                  <Text style={{ fontFamily: 'courier' }}>{creation._id}</Text>
                  <Text style={{ fontFamily: 'courier' }}>
                    {currentCreationIndex === 0 ? creationIndex : currentCreationIndex}
                  </Text>
                </span>
            </div>
          </div>
        </div>

      </div>
        <Button
          shape='circle'
          style={{ position: 'absolute', transform: 'translateX(45px)', right: 0 }}
          onClick={() => handleModalTransition('next')}
        >
          {'>'}
        </Button>
    </Modal>
  )
}

export default CreationModal
