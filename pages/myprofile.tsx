import type { FC } from 'react'

import React, { useContext } from 'react'
import AppContext from '../context/AppContext'

import useWindowDimensions from '../hooks/useWindowDimensions'
import useGetProfile from '../hooks/useGetProfile'
import useGetMyProfile from '../hooks/useGetMyProfile'

import Header from '../app/components/NavBar/Header'
import CreationsGrid from '../app/components/Creations/CreationsGrid'
import CreatorHeader from '../app/components/Creator/CreatorHeader'

import { Row, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import stylesHeader from '../styles/Header.module.css'

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

const MyProfile: FC = () => {
	const context = useContext(AppContext)
	const userId = context?.userId ?? ''
	const latestCreationTime = context?.latestCreationTime ?? ''
	// const userAddress = context?.userAddress ?? ''

	const myProfileData = useGetMyProfile(userId)
	console.log({ myProfileData })

	const creatorProfile = useGetProfile(userId)

	const { width: appWidth } = useWindowDimensions()

	const isMyProfileData =
		myProfileData !== null && typeof myProfileData !== 'undefined'

	console.log({ creatorProfile })
	return (
		<>
			<main className={stylesHeader.headerWrapper}>
				<Header />
			</main>

			<CreatorHeader creatorProfile={creatorProfile} creatorRoute='creations' />

			{isMyProfileData ? (
				<CreationsGrid creatorProfile={creatorProfile} appWidth={appWidth} />
			) : (
				<Row style={{ display: 'flex', justifyContent: 'center' }}>
					<Spin indicator={antIcon} />
				</Row>
			)}
		</>
	)
}

export default MyProfile
