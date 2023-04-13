import React from 'react'
import type { FC } from 'react'

import { useRouter } from 'next/router'

import type CreationResponse from '../../interfaces/CreationResponse'
import type Creation from '../../interfaces/Creation'

import styles from '../../styles/Collection.module.css'

import Header from '../../app/components/NavBar/Header'
import CreationsGridSimple from '../../app/components/Creations/CreationsGridSimple'
import CreatorHeader from '../../app/components/Creator/CreatorHeader'

import useGetCollection from '../../hooks/useGetCollection'

import { Typography, Row, Col } from 'antd'
const { Text } = Typography

const collectionStyles = {
	col: {
		display: 'flex',
		justifyContent: 'center',
		background: 'white',
		fontWeight: 'bold',
	},
	text: {
		fontSize: '1.4rem',
		margin: '20px 0',
	},
}

interface CollectionPageTypes {
	params: { id: string }
	creation: CreationResponse
	size?: string
}

const fetcher = async (url: string) =>
	await fetch(url).then(async (res) => await res.json())

const Collection: FC<CollectionPageTypes> = () => {
	const router = useRouter()
	const { collectionId } = router.query
	// console.log(collectionId)

	const collectionData =
		typeof collectionId === 'string'
			? useGetCollection(collectionId)
			: undefined

	console.log('[collectionId] ROUTE')
	console.log({ collectionData })
	console.log(collectionData)

	if (typeof collectionData !== 'undefined' && collectionData !== null) {
		console.log({ collectionData })
		// console.log(collectionData.creation.task.config.text_input)
		// timeAgoCreatedAt = timeAgo(parseInt(collectionData.creation.createdAt))
		// console.log(timeAgoCreatedAt)
	}

	const isCollectionData =
		typeof collectionData !== 'undefined' &&
		typeof collectionData?.data !== 'undefined'
	const isUser = typeof collectionData?.data?.collection?.user !== 'undefined'

	const isCollectionArray = Array.isArray(collectionData?.data?.creations)
	const isCollectionCreations =
		!isCollectionArray ||
		(collectionData?.data?.creations != null &&
			collectionData.data.creations.every(
				(creation): creation is Creation =>
					typeof creation === 'object' && creation !== null
			))
	const collectionCreations =
		isCollectionArray && isCollectionCreations
			? collectionData?.data?.creations ?? []
			: []

	return (
		<>
			<Header />

			<section className={styles.collectionWrapper}>
				{isCollectionData ? (
					<>
						{isUser ? (
							<>
								<CreatorHeader
									userId={collectionData?.data?.profile?.user?.userId}
								/>
								<Col style={collectionStyles.col}>
									<Text style={{ fontSize: '1.4rem', margin: '20px 0' }}>
										{collectionData?.data?.collection?.name}
									</Text>
									{/* <pre>{JSON.stringify(collectionData, null, 2)}</pre> */}
								</Col>
							</>
						) : null}
						{collectionData?.data?.creations?.length ?? 0 > 0 ? (
							<CreationsGridSimple creations={collectionCreations} />
						) : (
							<Text style={{ fontSize: '1.4rem', margin: '20px 0' }}>
								{'Loading...'}
							</Text>
						)}
					</>
				) : (
					<Row style={{ background: 'white' }}>
						<Text>{'Loading...'}</Text>
					</Row>
				)}
			</section>
		</>
	)
}

export default Collection
