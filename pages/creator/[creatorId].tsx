import useSWR from 'swr'
import React, { useEffect, useState } from 'react'
import type { FC, ReactElement } from 'react'

import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'

import styles from '../../styles/CreationId.module.css'

import abbreviateAddress from '../../util/abbreviateAddress'
import timeAgo from '../../util/timeAgo'

import useGetCreator from '../../hooks/useGetCreator'

import Blockies from 'react-blockies'
import Header from '../../app/components/NavBar/Header'
import CreationsGridSimple from '../../app/components/CreationsGridSimple'
import CreatorDashboard from '../../app/components/Creator/CreatorDashboard'

import {
  Button,
  Col,
  Row,
  Divider,
  Typography,
  Avatar,
  Popover,
  Tag,
  Spin
} from 'antd'
const { Title, Text, Paragraph } = Typography

import { LoadingOutlined } from '@ant-design/icons'

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

import CreatorResponse from '../../interfaces/CreatorResponse'

interface CreatorPageProps {
  params: { id: string }
  creation: CreationResponse
  size?: string
}

const Creator: FC<CreatorPageProps> = () => {
  const router = useRouter()

  const [isFollowing, setIsFollowing] = useState(false)

  // const queryCreatorId = router.query.creatorId

  // console.log(creatorId)
  console.log(router.query)

  const {
    creatorId: queryCreatorId = ''
  } = router.query

  if (typeof queryCreatorId === 'undefined') {
    return <div>Loading...</div>
  }
  const creatorData = useGetCreator(queryCreatorId)

  console.log(queryCreatorId)
  console.log(creatorData)
  // console.log(router.query.creatorId)j

  let displayAddress = ''
  if (typeof user === 'string') {
    displayAddress = abbreviateAddress(queryCreatorId)
  }


  if (typeof creatorData !== 'undefined' && creatorData !== null) {
    console.log(creatorData)
  }

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <>
      <Header />

      <section className={styles.creationWrapper} style={{ marginTop: 90 }}>
        {typeof creatorData !== 'undefined' && creatorData !== null ? (
          <>
            <article
              style={{
                marginTop: '-90px',
                zIndex: 150,
                position: 'relative',
                paddingLeft: 20,
              }}
            >
              <span
                className="profile-avatar-wrapper"
                style={{ display: 'flex', flex: 1 }}
              >
                <Blockies scale={13} seed={displayAddress} />
              </span>
            </article>

            <article
              className="creator-header"
              style={{ display: 'flex', flex: 1, justifyContent: 'space-between' }}
            >
              <span
                className="creator-profile"
                style={{
                  width: '100%',
                  background: 'white',
                  display: 'flex',
                  flex: 2,
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  paddingLeft: 20,
                }}
              >
                <Title level={1} className="profile-name">
                  {queryCreatorId}
                </Title>

                <div
                  className="creator-profile-info"
                  style={{
                    display: 'flex',
                    flex: 1,
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                  }}
                >
                  <div className="profile-actions">
                    {queryCreatorId === displayAddress ? null : (
                      <Button
                        className={
                          'followButton' + `${isFollowing}`
                            ? `following`
                            : `notFollowing`
                        }
                        onClick={() => handleFollow()}
                      >
                        {isFollowing ? 'Following' : 'Follow'}
                      </Button>
                    )}

                    {queryCreatorId === displayAddress ? (
                      <Link href="/profile">
                        <Button shape='round' style={{ marginLeft: 20 }}>{'Edit Profile'}</Button>
                      </Link>
                    ) : null}
                  </div>
                </div>
              </span>
            </article>

            <article className="creatorBody">
              <article className="creatorGridWrapper">
                <div className="creatorDashboardWrapper">
                  <CreatorDashboard profileAddress={displayAddress} />
                </div>
                { typeof creatorData !== 'undefined' && creatorData.length > 0 ? (

                <div className="creatorGrid">
                  <CreationsGridSimple creations={creatorData} />
                </div>
                ) 
                : 
                (
                  <div className="noCreations">
                    <Row className={styles.loadMore} style={{ display: 'flex', justifyContent: 'center' }}>
                      <Spin indicator={antIcon} />
                    </Row>
                  </div>
                )}
              </article>
            </article>
          </>
        ) : (
          <Row style={{ display: 'flex', justifyContent: 'center' }}>
            <Spin indicator={antIcon} />
          </Row>
        )}
      </section>
    </>
  )
}

export default Creator
