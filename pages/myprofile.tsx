import React, { useContext } from 'react'
import type { FC } from 'react'

import AppContext from '../context/AppContext'

import useGetProfile from '../hooks/useGetProfile'

import Header from '../app/components/NavBar/Header'
import CreationsGridSimple from '../app/components/Creations/CreationsGridSimple'
import CreatorHeader from '../app/components/Creator/CreatorHeader'
// import EditCollectionModal from '../app/components/Collection/EditCollectionModal'

import useGetMyProfile from '../hooks/useGetMyProfile'
import useWindowDimensions from '../hooks/useWindowDimensions'

import { Row, Spin } from 'antd'

import { LoadingOutlined } from '@ant-design/icons'

import stylesHeader from '../styles/Header.module.css'
// import stylesCreationsGrid from '../styles/CreationsGrid.module.css'

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

const MyCreations: FC = () => {
	const context = useContext(AppContext)
	const userId = context?.userId ?? ''
	// const userAddress = context?.userAddress ?? ''

	const myProfileData = useGetMyProfile(userId)

	const creator = useGetProfile(userId)

	const { width: appWidth } = useWindowDimensions()

	const isMyProfileData =
		myProfileData !== null && typeof myProfileData !== 'undefined'

	return (
		<>
			<main className={stylesHeader.headerWrapper}>
				<Header />
			</main>

			{/* <EditCollectionModal /> */}

			<CreatorHeader creator={creator} creatorRoute='creations' />
			{isMyProfileData ? (
				<CreationsGridSimple
					creations={myProfileData.creations}
					creator={myProfileData.creator}
					appWidth={appWidth}
				/>
			) : (
				<Row style={{ display: 'flex', justifyContent: 'center' }}>
					<Spin indicator={antIcon} />
				</Row>
			)}
		</>
	)
}

export default MyCreations
