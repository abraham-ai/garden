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
import useWindowDimensions from '../../hooks/useWindowDimensions'

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

const Collection: FC<CollectionPageTypes> = () => {
	const router = useRouter()

	const queryCollectionId = Array.isArray(router.query.collectionId)
		? router.query.collectionId[0]
		: router.query.collectionId ?? null

	console.log(router.query)
	console.log(queryCollectionId)

	const { width } = useWindowDimensions()

	const collectionData = useGetCollection(queryCollectionId)

	// console.log('[collectionId] ROUTE')
	// console.log({ collectionData })

	if (collectionData != null) {
		console.log({ collectionData })
	}

	const isCollectionData = collectionData !== null
	console.log({ isCollectionData })
	const isUser = collectionData?.creator?.user?.userId !== undefined
	console.log('isUser', isUser)

	const isCollectionArray = Array.isArray(collectionData?.creations)
	console.log({ isCollectionArray })

	if (typeof collectionData?.creations !== 'undefined') {
		console.log(collectionData.creations.length)
	}

	const isCollectionCreations =
		isCollectionArray &&
		collectionData?.creations?.every(
			(creation): creation is Creation =>
				typeof creation === 'object' && creation !== null
		)
	const collectionCreations =
		isCollectionArray && isCollectionCreations === true
			? collectionData?.creations ?? []
			: []

	console.log('isCollectionCreations:', isCollectionCreations)

	// const isCollectionId =
	// 	typeof queryCollectionId === 'string' ? queryCollectionId : undefined

	return (
		<>
			<Header />

			<section className={styles.collectionWrapper}>
				{isCollectionData ? (
					<>
						{isUser ? (
							<>
								<CreatorHeader
									creator={collectionData?.creator}
									creatorRoute='collections'
								/>
								<Col style={collectionStyles.col}>
									<Text style={{ fontSize: '1.4rem', margin: '20px 0' }}>
										{collectionData?.collection?.name}
									</Text>
								</Col>
							</>
						) : null}
						{isCollectionCreations === true ? (
							<CreationsGridSimple
								creations={collectionCreations}
								appWidth={width}
								creator={collectionData?.creator}
								onCreationClick={(creation) => null}
							/>
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
