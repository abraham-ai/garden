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
import CreationsGrid from '../../app/components/Creations/CreationsGrid'
import CreatorDashboard from '../../app/components/Creator/CreatorDashboard'
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

const CreatorPage: FC<CreatorPageProps> = () => {
	const router = useRouter()

	const [isFollowing, setIsFollowing] = useState(false)

	// const queryCreatorId = router.query.creatorId
	// console.log(creatorId)

	console.log(router.query)

	const { width: appWidth } = useWindowDimensions()

	const queryCreatorId = Array.isArray(router.query.creatorId)
		? router.query.creatorId[0]
		: router.query.creatorId ?? ''

	console.log({ queryCreatorId })

	if (typeof queryCreatorId === 'undefined') {
		return <Text>{'Loading...'}</Text>
	}
	const creatorCreationsData = useGetCreatorCreations(queryCreatorId)

	console.log({ creatorCreationsData })

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
								creatorCreationsData?.creatorProfile ??
								emptyCreatorCreations.creator
							}
							creatorRoute={'creations'}
						/>

						<CreatorDashboard profileAddress={queryCreatorId ?? ''} />

						{isCreatorCreationsData ? (
							<section className={stylesCreationsGrid.creationsWrapper}>
								<CreationsGrid
									// creationsData={creatorCreationsData?.creations ?? []}
									appWidth={appWidth}
									creator={
										creatorCreationsData?.creatorProfile ??
										emptyCreatorCreations
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

export default CreatorPage
