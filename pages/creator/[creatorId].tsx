import type { FC } from 'react'
import type CreationResponse from '../../interfaces/CreationResponse'

import React, { useState } from 'react'
import { useRouter } from 'next/router'

import styles from '../../styles/CreationId.module.css'
import stylesHeader from '../../styles/Header.module.css'
import stylesCreationsGrid from '../../styles/CreationsGrid.module.css'

// import abbreviateAddress from '../../util/abbreviateAddress'

import emptyCreatorCreations from '../../constants/emptyCreatorCreations'
import useGetCreatorCreations from '../../hooks/useGetCreatorCreations'

// import Blockies from 'react-blockies'
import Header from '../../app/components/NavBar/Header'
import CreationsGridSimple from '../../app/components/Creations/CreationsGridSimple'
// import CreatorDashboard from '../../app/components/Creator/CreatorDashboard'
import CreatorHeader from '../../app/components/Creator/CreatorHeader'
import useWindowDimensions from '../../hooks/useWindowDimensions'

import { Row, Typography, Spin } from 'antd' // Button

import { LoadingOutlined } from '@ant-design/icons'

const { Text } = Typography

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

interface CreatorPageProps {
	params: { id: string }
	creation: CreationResponse
	size?: string
}

const Creator: FC<CreatorPageProps> = () => {
	const router = useRouter()

	// const [isFollowing, setIsFollowing] = useState(false)

	// const queryCreatorId = router.query.creatorId

	// console.log(creatorId)
	// console.log(router.query)

	const { width } = useWindowDimensions()

	const queryCreatorId = Array.isArray(router.query.creatorId)
		? router.query.creatorId[0]
		: router.query.creatorId ?? ''

	console.log({ queryCreatorId })

	if (typeof queryCreatorId === 'undefined') {
		return <Text>{'Loading...'}</Text>
	}
	const creatorCreationsData = useGetCreatorCreations(queryCreatorId)

	// const { creatorCreationsData, creatorId } = data

	// console.log({ creatorCreationsData })

	// console.log(queryCreatorId)
	// console.log(creatorData)
	// console.log(router.query.creatorId)j

	// let displayAddress = ''
	// if (typeof queryCreatorId === 'string') {
	// 	displayAddress = abbreviateAddress(queryCreatorId)
	// }

	if (
		typeof creatorCreationsData !== 'undefined' &&
		creatorCreationsData !== null
	) {
		console.log(creatorCreationsData)
	}

	// const handleFollow = (): void => {
	// 	setIsFollowing(!isFollowing)
	// }

	const isCreatorCreationsData =
		typeof creatorCreationsData !== 'undefined' && creatorCreationsData !== null

	return (
		<>
			<Header />

			<section className={styles.creationWrapper} style={{ marginTop: 90 }}>
				{isCreatorCreationsData ? (
					<>
						<main className={stylesHeader.headerWrapper}>
							<Header />
						</main>
						<CreatorHeader
							creator={
								creatorCreationsData?.creator ?? emptyCreatorCreations.creator
							}
							creatorRoute={'creations'}
						/>

						{/* <CreatorDashboard profileAddress={creatorId ?? ''} /> */}

						{isCreatorCreationsData ? (
							<section className={stylesCreationsGrid.creationsWrapper}>
								<CreationsGridSimple
									creations={creatorCreationsData?.creations ?? []}
									appWidth={width}
									creator={
										creatorCreationsData?.creator ?? emptyCreatorCreations
									}
								/>
							</section>
						) : (
							<Row style={{ display: 'flex', justifyContent: 'center' }}>
								<Spin indicator={antIcon} />
							</Row>
						)}
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

// {/* <article
// 	style={{
// 		marginTop: '-90px',
// 		zIndex: 150,
// 		position: 'relative',
// 		paddingLeft: 20,
// 	}}
// >
// 	<span
// 		className='profile-avatar-wrapper'
// 		style={{ display: 'flex', flex: 1 }}
// 	>
// 		<Blockies scale={13} seed={displayAddress} />
// 	</span>
// </article>

// <article
// 	className='creator-header'
// 	style={{
// 		display: 'flex',
// 		flex: 1,
// 		justifyContent: 'space-between',
// 	}}
// >
// 	<span
// 		className='creator-profile'
// 		style={{
// 			width: '100%',
// 			background: 'white',
// 			display: 'flex',
// 			flex: 2,
// 			flexDirection: 'column',
// 			alignItems: 'flex-start',
// 			paddingLeft: 20,
// 		}}
// 	>
// 		<Title level={1} className='profile-name'>
// 			{queryCreatorId}
// 		</Title>

// 		<div
// 			className='creator-profile-info'
// 			style={{
// 				display: 'flex',
// 				flex: 1,
// 				flexDirection: 'column',
// 				alignItems: 'flex-start',
// 			}}
// 		>
// 			<div className='profile-actions'>
// 				{queryCreatorId === displayAddress ? null : (
// 					<Button
// 						size='large'
// 						shape='round'
// 						className={
// 							isFollowing
// 								? `${styles.following}`
// 								: `${styles.notFollowing}`
// 						}
// 						onClick={() => {
// 							handleFollow()
// 						}}
// 					>
// 						{isFollowing ? 'Following' : 'Follow'}
// 					</Button>
// 				)}

// 				{queryCreatorId === displayAddress ? (
// 					<Link href='/profile'>
// 						<Button shape='round' style={{ marginLeft: 20 }}>
// 							<Text>{'Edit Profile'}</Text>
// 						</Button>
// 					</Link>
// 				) : null}
// 			</div>
// 		</div>
// 	</span>
// </article>

// <article className='creatorBody'>
// 	<article className='creatorGridWrapper'>
// 		<div className='creatorDashboardWrapper'>
// 			<CreatorDashboard profileAddress={displayAddress} />
// 		</div>
// 		{isCreatorData ? (
// 			<div className='creatorGrid'>
// 				<CreationsGridSimple creations={creatorData.creations} />
// 			</div>
// 		) : (
// 			<div className='noCreations'>
// 				<Row
// 					className={styles.loadMore}
// 					style={{ display: 'flex', justifyContent: 'center' }}
// 				>
// 					<Spin indicator={antIcon} />
// 				</Row>
// 			</div>
// 		)}
// 	</article>
// </article> */}
