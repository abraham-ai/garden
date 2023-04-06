import React, { useEffect, useState } from 'react'
import type { FC, ReactElement } from 'react'

import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'

import useSWR from 'swr'

import type CreationResponse from '../../interfaces/CreationResponse'

import styles from '../../styles/Collection.module.css'

import Blockies from 'react-blockies'
import Header from '../../app/components/NavBar/Header'
import CreationsGridSimple from '../../app/components/Creations/CreationsGridSimple'
import CreatorHeader from '../../app/components/Creator/CreatorHeader'

import abbreviateAddress from '../../util/abbreviateAddress'
import timeAgo from '../../util/timeAgo'

import useGetCollection from '../../hooks/useGetCollection'

import { Typography, Row, Col, Button } from 'antd'
const { Text } = Typography

import { FiMoreHorizontal } from 'react-icons/fi'
import { FaStar, FaRetweet, FaRegStar } from 'react-icons/fa'
import { IoIosShareAlt } from 'react-icons/io'
import { AiFillEye, AiFillFire } from 'react-icons/ai'
import { BiUserPlus } from 'react-icons/bi'
import { HiOutlineArrowNarrowUp, HiOutlineFingerPrint } from 'react-icons/hi' // HiCommandLine
import { MdOutlineDateRange } from 'react-icons/md'
import { BsFillBookmarkFill, BsAspectRatio } from 'react-icons/bs'
import { SlSizeFullscreen } from 'react-icons/sl'

interface CollectionPageTypes {
  params: { id: string }
  creation: CreationResponse
  size?: string
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const Collection: FC<CollectionPageTypes> = () => {
  const router = useRouter()
  const { collectionId } = router.query
  // console.log(collectionId)

  const collectionData = useGetCollection(collectionId)
	console.log('[collectionId] ROUTE')
  console.log({ collectionData })
	console.log(collectionData)

  if (typeof collectionData !== 'undefined' && collectionData !== null) {
    console.log({ collectionData })
    // console.log(collectionData.creation.task.config.text_input)
    // timeAgoCreatedAt = timeAgo(parseInt(collectionData.creation.createdAt))
    // console.log(timeAgoCreatedAt)
  }

  return (
    <>
      <Header />

      <section className={styles.collectionWrapper}>
        {typeof collectionData !== 'undefined' && typeof collectionData.data !== 'undefined'
					?
						(
							<>
								{ typeof collectionData.data?.collection.user !== 'undefined'
									?
										(
											<>
												<CreatorHeader userId={collectionData.data.profile.user.userId} />
												<Col style={{ display: 'flex', justifyContent: 'center', background: 'white', fontWeight: 'bold' }}>
													<Text style={{ fontSize: '1.4rem', margin: '20px 0' }}>{collectionData.data.collection.name}</Text>
													{/* <pre>{JSON.stringify(collectionData, null, 2)}</pre> */}
												</Col>
											</>
										)
									: null
								}
									{ collectionData.data?.creations.length > 0
										?
											(
												<CreationsGridSimple creations={collectionData.data?.creations} />
											):
											(
												<Text style={{ fontSize: '1.4rem', margin: '20px 0' }}>{'Loading...'}</Text>
											)
									}
							</>
						) :
						(
							<Row style={{ background: 'white' }}>
								<Text>{'Loading...'}</Text>
							</Row>
						)}
      </section>
    </>
  )
}

export default Collection
