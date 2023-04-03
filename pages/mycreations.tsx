import { useContext } from 'react'

import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Inter } from 'next/font/google'

import AppContext from '../context/AppContext'

import Header from '../app/components/Header'
import CreationsGridSimple from '../app/components/CreationsGridSimple'

import Blockies from 'react-blockies'

import useGetMyCreations from '../hooks/useGetMyCreations'

import abbreviateAddress from '../util/abbreviateAddress'

import { Typography, Button, Avatar, Row, Spin } from 'antd'
const { Title, Text } = Typography

import { LoadingOutlined } from '@ant-design/icons'

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

import stylesHeader from '../styles/Header.module.css'
import stylesCreationsGrid from '../styles/CreationsGrid.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function MyCreations() {

	const context = useContext(AppContext)
	const userId = context?.userId || ''

  const myCreationsData = useGetMyCreations(userId)
	console.log(myCreationsData)

  let displayAddress = ''
  if (typeof userId === 'string') {
    displayAddress = abbreviateAddress(userId)
  }

  return (
    <>
      <main className={stylesHeader.headerWrapper}>
        <Header />
      </main>

            <article
              className="creatorHeader"
              style={{ display: 'flex', flex: 1, justifyContent: 'space-between' }}
            >
              <span
                className="creatorProfile"
                style={{
                  width: '100%',
                  background: 'white',
                  display: 'flex',
                  flex: 2,
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                }}
              >
                <span
                  style={{
                    zIndex: 150,
                    position: 'relative',
                    margin: '150px 0 20px 0',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%'
                  }}
                >
                  <Avatar
                    className="profileAvatarWrapper"
                    style={{ display: 'flex', flex: 1 }}
                    size={64}
                    icon={<Blockies scale={8} seed={userId} />}
                  />
                  <Title level={3} className="profileName" style={{ marginTop: 10 }}>
                    {displayAddress}
                  </Title>
                </span>


                <div
                  className="creator-profile-info"
                  style={{
                    display: 'flex',
                    flex: 1,
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    width: '100%'
                  }}
                >
                  <div className="profile-actions" style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <Link href="/editprofile">
                      <Button shape='round' style={{ marginRight: 20, background: 'rgba(0,0,0,0.05)' }}>
                        <Text style={{ fontWeight: 'bold', color: 'gray' }}>{'Edit Profile'}</Text>
                      </Button>
                    </Link>

                    <Link href="/mycollections">
                      <Button shape='round' style={{ background: 'rgba(0,0,0,0.05)' }}>
                        <Text style={{ fontWeight: 'bold', color: 'gray' }}>{'Collections'}</Text>
                      </Button>
                    </Link>
                  </div>
                </div>
              </span>
            </article>

			{typeof myCreationsData !== 'undefined' && myCreationsData !== null ? (
				<section className={stylesCreationsGrid.creationsWrapper} style={{ marginTop: 50 }}>
					<CreationsGridSimple creations={myCreationsData} />
				</section>
			): (<Row style={{ display: 'flex', justifyContent: 'center' }}>
      <Spin indicator={antIcon} />
    </Row>)}
    </>
  )
}