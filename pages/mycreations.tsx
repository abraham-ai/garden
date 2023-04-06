import { useContext } from 'react'

import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Inter } from 'next/font/google'

import AppContext from '../context/AppContext'

import Header from '../app/components/NavBar/Header'
import CreationsGridSimple from '../app/components/Creations/CreationsGridSimple'
import CreatorHeader from '../app/components/Creator/CreatorHeader'

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

      <CreatorHeader userId={userId} />

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