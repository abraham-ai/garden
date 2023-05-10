import type { FC } from 'react'

import React, { useContext } from 'react'
import AppContext from '../context/AppContext'

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
	// const userAddress = context?.userAddress ?? ''

	const myProfileData = useGetMyProfile(userId)

	const creator = useGetProfile(userId)

	const isMyProfileData =
		myProfileData !== null && typeof myProfileData !== 'undefined'

	const createProfileCreationsUrl = (
		limit,
		pageIndex,
		username,
		generators,
		earliestTime,
		latestTime
	): string => {
		const profileUsername = creator?.user?.username ?? ''

		console.log({ profileUsername })

		return `/api/creations?limit=${String(limit)}&page=${String(
			pageIndex
		)}&username=${String(profileUsername)}&generators=${String(
			generators
		)}&earliestTime=${String(earliestTime)}&latestTime=${String(latestTime)}`
	}

	console.log({ createProfileCreationsUrl })

	return (
		<>
			<main className={stylesHeader.headerWrapper}>
				<Header />
			</main>

			<CreatorHeader creator={creator} creatorRoute='creations' />
			{isMyProfileData ? (
				<CreationsGrid
					createUrl={createProfileCreationsUrl}
					creator={creator}
				/>
			) : (
				<Row style={{ display: 'flex', justifyContent: 'center' }}>
					<Spin indicator={antIcon} />
				</Row>
			)}
		</>
	)
}

export default MyProfile
