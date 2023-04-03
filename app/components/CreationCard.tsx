import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
  useMemo
} from 'react'

import AppContext from '../../context/AppContext'

import Image from 'next/image'
import Link from 'next/link'

import axios from 'axios'
import timeAgo from '../../util/timeAgo'
import abbreviateText from '../../util/abbreviateText'
import abbreviateAddress from '../../util/abbreviateAddress'

import useGetReactionCount from '../../hooks/useGetReactionCount'

import type Creation from '../../interfaces/Creation'

import CreationModal from './CreationModal'
import styles from '../../styles/CreationCard.module.css'
import CreationSocial from './CreationSocial'

import { Button, Skeleton, Typography } from 'antd'
const { Text } = Typography

import Blockies from 'react-blockies'

export default function CreationCard({
  creation,
  index,
}: {
  creation: Creation
  index: number
}) {
  // console.log(creation)

  const context = useContext(AppContext)
  const currentCreationIndex = context?.currentCreationIndex || 0
  const creationsData = useMemo(
    () => context?.creationsData || [],
    [context?.creationsData]
  )

  const [modalOpen, setModalOpen] = useState(false)
  const [currentCreation, setCurrentCreation] = useState<Creation>(
    creationsData[currentCreationIndex] as Creation
  )

  const [_id, setId] = useState<string>('')
  const [user, setUser] = useState<string>('')
  const [textInput, setTextInput] = useState<string>('')
  const [thumbnail, setThumbnail] = useState<string>('')
  const [uri, setUri] = useState<string>('')
  const [createdAt, setCreatedAt] = useState<string>('')
  const [generatorName, setGeneratorName] = useState<string>('')
  const [width, setWidth] = useState<number>(0)
  const [height, setHeight] = useState<number>(0)

  const [isCreationHovering, setIsCreationHovering] = useState<boolean>(false)
  const [isSaveModalActive, setIsSaveModalActive] = useState(false)

  const [praises, setPraises] = useState<number>(0)
  const [praised, setPraised] = useState<boolean>(false)
  const [burns, setBurns] = useState<number>(0)
  const [burned, setBurned] = useState<boolean>(false)

  const [status, setStatus] = useState<string>('')

  const reactionCountList = useGetReactionCount(creation._id)
  // console.log(reactionCountList)

  const timeAgoCreatedAt = timeAgo(Date.parse(creation.createdAt))

  const showModal = () => {
    setModalOpen(true)
  }

  useEffect(() => {
    // console.log('USE-EFFECT REACTION COUNT LIST')
    if (typeof reactionCountList !== 'undefined') {
      const {
        praises: praisesData,
        praised: praisedData,
        burns: burnsData,
        burned: burnedData,
      } = reactionCountList

      // console.log({ praisesData, praisedData, burnsData, burnedData })

      setPraises(praisesData)
      setPraised(praisedData)
      setBurns(burnsData)
      setBurned(burnedData)
    }
  }, [reactionCountList])

  const handleCreationUpdate = useCallback(
    (currentCreation, currentCreationIndex) => {
      if (
        typeof currentCreation !== 'undefined' &&
        currentCreationIndex !== 0
      ) {
        // console.log(
        //   currentCreationIndex,
        //   currentCreation.task.config.text_input
        // )
        setUri(currentCreation.uri)
        setCreatedAt(currentCreation.createdAt)
        setGeneratorName(currentCreation.task.generator.generatorName)
        setWidth(currentCreation.task.config.width)
        setHeight(currentCreation.task.config.height)
        setTextInput(currentCreation.task.config.text_input)
        setUser(currentCreation.user)
        setThumbnail(currentCreation.thumbnail)
        setId(currentCreation._id)
        setStatus(currentCreation.task.status)
      }
    },
    []
  )

  useEffect(() => {
    setCurrentCreation(creation)
    handleCreationUpdate(creationsData[currentCreationIndex], currentCreationIndex)
  }, [
    creation,
    creationsData,
    handleCreationUpdate,
    currentCreation,
    currentCreationIndex,
  ])

  const handleMouseOver = () => {
    console.log('handleMouseOver')
    setIsCreationHovering(true)
  }

  const handleMouseOut = () => {
    console.log('handleMouseOut')
    setIsCreationHovering(false)
  }

  let displayAddress = ''
  if (typeof user === 'string') {
    displayAddress = abbreviateAddress(creation.user)
  }

  let prompt = ''
  // console.log({ textInput })
  // console.log({ creation })

  const creationTextInput = creation.task.config.text_input
  if (creationTextInput !== '' && typeof creationTextInput !== 'undefined') {
    if (creation.task.config.height > 550) {
      prompt = abbreviateText(creationTextInput, 80) // 100
    } else if (creation.task.config.height > 450) {
      prompt = abbreviateText(creationTextInput, 30) // 100
    } else {
      prompt = abbreviateText(creationTextInput, 25) // 100
    }
  }

  // console.log({ praises, praised, burns, burned })

  console.log({ isCreationHovering })

  const hoverStyles = isCreationHovering === true ? styles.crCardHoverWrapper : styles.crCardWrapper

  return (
    <>
      <section className={hoverStyles}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        <article id={'creationCard'} className={styles.crCard}>
          <div className={styles.crTopWrapper}>
            <div className={styles.crImageWrapper}>
              {typeof creation === 'undefined'
                ?
                  (
                    <Skeleton />
                  )
                :
                  (
                    <section>

                      { isCreationHovering === true ? (
                        <>
                        <CreationSocial
                          layout={'expanded'}
                          creationBurns={burns}
                          creationPraises={praises}
                          creationId={creation._id}
                          praisedByMe={praised}
                          burnedByMe={burned}
                          />

                        <div className={styles.crContentMain}>
                          <div className={styles.crPromptMainWrapper}>
                            <article className={styles.promptWrapper}>
                              <Text className={styles.crPromptCommand}>{`/${creation.task.generator.generatorName} `}</Text>
                              <Text className={styles.crPrompt}>{prompt}</Text>
                            </article>

                            <article style={{ display: 'flex', alignItems: 'center' }}>
                              <Link
                                href={{
                                  pathname: `/creator/${creation.user}`,
                                  query: { user }
                                }}
                                style={{ display: 'flex', alignItems: 'center', marginRight: 10 }}>
                                <span
                                  style={{
                                    borderRadius: '50%',
                                    overflow: 'hidden',
                                    width: '32px',
                                    height: '32px',
                                    marginRight: 10,
                                    background: 'orange'
                                  }}
                                  >
                                  <Blockies seed={creation.user} />
                                </span>
                                <Text className={styles.displayAddress}>{displayAddress}</Text>
                              </Link>
                              <Text className={styles.crDate}>{timeAgoCreatedAt}</Text>
                            </article>
                          </div>
                        </div>

                        <div className={styles.crContentHoverBgWrapper} />
                        </>

                      ) : null }

                      <Link
                        className={styles.crLink}
                        // href={{
                        //   pathname: `/creation/${creation._id}`,
                        //   query: {
                        //     uri: uri,
                        //     createdAt: createdAt,
                        //     generatorName: generatorName,
                        //     width: width,
                        //     height: height,
                        //     text_input: text_input,
                        //     user: user,
                        //     thumbnail: thumbnail,
                        //     _id: _id,
                        //     status: status,
                        //   },
                        // }}
                        href={`/?creationId=${creation._id}`}
                        as={`/creation/${creation._id}`}
                        scroll={false}
                        style={{
                          color: 'black',
                          flexDirection: 'column',
                          background: 'black',
                          border: 20
                        }}
                        onClick={() => showModal()}
                      >
                        <div className={styles.crImageHoverMask} style={{ display: isCreationHovering === true ? null : 'none' }} />
                        <Image
                          className={styles.crImageBlurMask}
                          src={creation.thumbnail}
                          height={creation.task.config.height}
                          width={creation.task.config.width}
                          alt={creation.task.config.text_input}
                          style={{ backdropFilter: isCreationHovering === true ? null : 'unset' }}
                        />
                        <Image
                          className={styles.crImageMain}
                          src={creation.thumbnail}
                          height={creation.task.config.height}
                          width={creation.task.config.width}
                          alt={creation.task.config.text_input}
                        />
                      </Link>
                    </section>
                  )
              }
            </div>
          </div>
        </article>
        <Link
          className={styles.crLink}
          // href={{
          //   pathname: `/creation/${creation._id}`,
          //   query: {
          //     uri: uri,
          //     createdAt: createdAt,
          //     generatorName: generatorName,
          //     width: width,
          //     height: height,
          //     text_input: text_input,
          //     user: user,
          //     thumbnail: thumbnail,
          //     _id: _id,
          //     status: status,
          //   },
          // }}
          href={`?creationId=${creation._id}`}
          as={`/creation/${creation._id}`}
          scroll={false}
          style={{ display: 'flex', color: 'black', flexDirection: 'column' }}
          onClick={() => showModal()}
        >
          {/* <div className={styles.creationContent}>
            <div
              className='crMetadata'
              style={{
                display: 'flex',
                flex: 1,
                justifyContent: 'flex-start',
              }}
            >
              <span style={{ fontFamily: 'courier' }}>{creation._id}</span>
              <span style={{ fontFamily: 'courier' }}>
                {creation.task.status === 'completed'
                  ? '✓'
                  : creation.task.status}
              </span>
            </div>
          </div> */}
        </Link>
      </section>
      <CreationModal
        creation={
          typeof creationsData[currentCreationIndex] === 'undefined' || typeof (creationsData[currentCreationIndex] as Creation)._id === 'undefined'
            ? creation
            : creationsData[currentCreationIndex]
        }
        setModalOpen={setModalOpen}
        modalOpen={modalOpen}
        creationIndex={index}
      />
    </>
  )
}
