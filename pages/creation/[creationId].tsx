import type { FC } from 'react'

import React, { useState } from 'react'
import useSWR from 'swr'

import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'

import type CreationResponse from '../../interfaces/CreationResponse'

import styles from '../../styles/CreationId.module.css'

import Blockies from 'react-blockies'
import Header from '../../app/components/NavBar/Header'
import BurnButton from '../../app/components/CreationActions/BurnButton'
import PraiseButton from '../../app/components/CreationActions/PraiseButton'
import SaveButton from '../../app/components/CreationActions/SaveButton'
import ShareButton from '../../app/components/CreationActions/ShareButton'

import abbreviateAddress from '../../util/abbreviateAddress'
import timeAgo from '../../util/timeAgo'

import useGetCreation from '../../hooks/useGetCreation'

import {
  Button,
  Col,
  Row,
  Divider,
  Typography,
  Avatar,
  Popover,
  Tag,
} from 'antd'

const { Title, Text } = Typography

import { FiMoreHorizontal } from 'react-icons/fi'
import { FaStar, FaRetweet, FaRegStar } from 'react-icons/fa'
import { IoIosShareAlt } from 'react-icons/io'
import { AiFillEye, AiFillFire } from 'react-icons/ai'
import { BiUserPlus } from 'react-icons/bi'
import { HiOutlineArrowNarrowUp, HiOutlineFingerPrint } from 'react-icons/hi' // HiCommandLine
import { MdOutlineDateRange } from 'react-icons/md'
import { BsFillBookmarkFill, BsAspectRatio } from 'react-icons/bs'
import { SlSizeFullscreen } from 'react-icons/sl'

interface CreationPageProps {
  params: { id: string }
  creation: CreationResponse
  size?: string
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const Creation: FC<CreationPageProps> = ({
  params,
  creation,
  size = 'regular',
}: CreationPageProps) => {
  const router = useRouter()

  const [isHovering, setIsHovering] = useState(true)

  const handleMouseOver = () => {
    setIsHovering(true)
  }

  const handleMouseOut = () => {
    setIsHovering(false)
  }

  const creationId = router.query.creationId

  // console.log(creationId)
  // console.log(router.query)

  const {
    uri: queryUri = '',
    createdAt: queryCreatedAt = '',
    generatorName: queryGeneratorName = '',
    height: queryHeight = 0,
    status: queryStatus = 0,
    text_input: queryTextInput = '',
    thumbnail: queryThumbnail = '',
    user: queryUser = '',
    width: queryWidth = 0,
    _id: queryId = '',
  } = router.query

  const url = `/api/creation?${creationId}`

  const [_id, setId] = useState<string>('')
  const [user, setUser] = useState<string>('')
  const [textInput, setTextInput] = useState<string>('')
  const [thumbnail, setThumbnail] = useState<string>('')
  const [uri, setUri] = useState<string>('')
  const [createdAt, setCreatedAt] = useState<string>('')
  const [generatorName, setGeneratorName] = useState<string>('')
  const [width, setWidth] = useState<number>(0)
  const [height, setHeight] = useState<number>(0)

  const creationData = useGetCreation(creationId)
  // console.log(creationData)

  const isParent = true

  // console.log(router.query.creationId)

  // useEffect(() => {
  //   if (typeof creationData !== 'undefined' && creationData !== null) {
      // console.log(creationData)
      // setUri(creationData.uri)
      // setCreatedAt(creationData.creation.createdAt)
      // setGeneratorName(creationData.task.generator.generatorName)
      // setWidth(creationData.task.config.width)
      // setHeight(creationData.task.config.height)
      // setTextInput(creationData.task.config.text_input)
      // setUser(creationData.user)
      // setThumbnail(creationData.thumbnail)
      // setId(creationData._id)
      // setStatus(creationData.task.status)
  //   }
  // }, [creationData])

  let timeAgoCreatedAt = 0
  if (typeof creationData !== 'undefined' && creationData !== null) {
    console.log(creationData)
    console.log(creationData.creation.task.config.text_input)
    timeAgoCreatedAt = timeAgo(parseInt(creationData.creation.createdAt))
    console.log(timeAgoCreatedAt)
  }


  return (
    <>
      <Header />

      <section className={styles.creationWrapper}>
        {typeof creationData !== 'undefined' && creationData !== null ? (
          <>
            <Col className={styles.creation}>
              <Row className={styles.crPost}>
                <article className={`${styles.crCard} ${size}`}>
                  <div
                    className={
                      isHovering
                        ? `${styles.hover}, ${styles.crImgWrapper}`
                        : `${styles.crImgWrapper}`
                    }
                    onMouseOver={() => handleMouseOver}
                    onMouseOut={() => handleMouseOut}
                  >
                    <div className={styles.crImgWrapperMain}>
                      <Image
                        className={styles.crImg}
                        style={{ width: '100%' }}
                        width={creationData.creation.task.config.width}
                        height={creationData.creation.task.config.height}
                        alt={creationData.creation.task.config.text_input}
                        src={creationData.creation.thumbnail}
                      />
                    </div>

                    <div className={(styles.crImgWrapperBackground)}>
                      <Image
                        className={styles.crImg}
                        style={{ width: '100%' }}
                        width={creationData.creation.task.config.width}
                        height={creationData.creation.task.config.height}
                        alt={creationData.creation.task.config.text_input}
                        src={creationData.creation.thumbnail}
                      />
                    </div>
                  </div>
                </article>
              </Row>
            </Col>

            <article className={styles.creationText}>
              <div className={styles.crPostText}>
                {/* <Text>{creationId}</Text> */}
                {/* <Text>{'Server:'} {creationData.creation._id}</Text> */}

                {/* <pre>{JSON.stringify(creationData, null, 2)}</pre> */}

                <section className={styles.crMain}>
                  <article className={styles.crMainHeader}>
                    <div className={styles.crCreator}>

                    <Avatar
                      className="profileAvatarWrapper"
                      style={{ display: 'flex', flex: 1 }}
                      size={50}
                      icon={<Blockies scale={6} seed={creationData.creation.user} />}
                    />
                      <div className={styles.crCreatorNameWrapper}>
                        {/* <Text className='crCreatorName'>
                          {abbreviateAddress(creationData.creation.user)}
                        </Text> */}
                          <Title level={3} className="profileName" style={{ marginTop: 10 }}>
                            {abbreviateAddress(creationData.creation.user)}
                          </Title>
                          <Text>
                            {timeAgoCreatedAt}
                          </Text>
                      </div>
                    </div>

                    
                  </article>

                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Text style={{ color: 'purple', fontWeight: 600 }}>
                      {'/dream'}
                    </Text>
                    <Text style={{ fontSize: '1.1rem', lineHeight: 1.3 }}>{creationData.creation.task.config.text_input}</Text>
                        
                    <div className={styles.crSocials}>
                    <span className={(styles.crSocial)}>
                      <BurnButton />
                    </span>
                    <span className={(styles.crSocial)}>
                      <PraiseButton />
                    </span>
                    <span className={styles.crSocial}>
                      <SaveButton />
                    </span>
                    <span className={styles.crSocial}>
                      <ShareButton />
                    </span>
                    {/* <span className={styles.crSocial}>
                      <Button type='link' className={styles.crSocialBtn} shape='circle'>
                        <FiMoreHorizontal className={styles.crSocialIcon} />
                      </Button>
                    </span> */}
                  </div>

                  
                    <ul className={styles.crPropertiesWrapper}>
                      <li className={styles.crProperty}>
                        <span className={styles.crPropertyType}>
                          <MdOutlineDateRange className='icon' />
                          <Text>{'Date'}</Text>
                        </span>
                        <Text>{timeAgoCreatedAt}</Text>
                      </li>
                      <li className={styles.crProperty}>
                        <span className={styles.crPropertyType}>
                          <SlSizeFullscreen className='icon' />
                          <Text>{'Size'}</Text>
                        </span>
                        <Text>{'512 x 512'}</Text>
                      </li>
                      <li className={styles.crProperty}>
                        <span className={styles.crPropertyType}>
                          <BsAspectRatio className='icon' />
                          <Text>{'Command'}</Text>
                        </span>
                        <Text>{'/dream'}</Text>
                      </li>
                      <li className={styles.crProperty}>
                        <span className={styles.crPropertyType}>
                          <BsAspectRatio className={styles.icon} />
                          <Text>{'Shape'}</Text>
                        </span>
                        <Text>{'square'}</Text>
                      </li>
                    </ul>
                  </div>



                  {/* {isParent ? (
                  <button className='cr-parent'>
                  <span style={{ display: 'flex', alignItems: 'center' }}>
                  <HiOutlineFingerPrint className='icon' />
                  <span className='text'>Parent</span>
                  </span>
                  <Image src={thumbnail} alt={text_input} />
                  </button>
                ) : null} */}
                </section>
              </div>
            </article>
          </>
        ) : (
          'Loading...'
        )}
      </section>
    </>
  )
}

export default Creation
