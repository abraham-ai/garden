import type { FC } from 'react'
import type CreationResponse from '../../interfaces/CreationResponse'

import React from 'react'
import { useRouter } from 'next/router'
import useGetCollection from '../../hooks/useGetCollection'
import useWindowDimensions from '../../hooks/useWindowDimensions'

import styles from '../../styles/Collection.module.css'

import Header from '../../app/components/NavBar/Header'
import CreationsGrid from '../../app/components/Creations/CreationsGrid'
import CreatorHeader from '../../app/components/Creator/CreatorHeader'

import { Typography, Col } from 'antd'
const { Text } = Typography

interface CollectionPageTypes {
	params: { id: string }
	creation: CreationResponse
	size?: string
}

const Collection: FC<CollectionPageTypes> = () => {
	const router = useRouter()

	const queryCollectionId = router.query.collectionId ?? ''

	const { width: appWidth } = useWindowDimensions()

	const collectionData = useGetCollection(queryCollectionId)

	if (collectionData != null) {
		console.log({ collectionData })
	}

	const isCollectionData = collectionData !== null
	console.log({ isCollectionData })
	const isUser = collectionData?.creatorProfile?.user?.userId !== undefined
	console.log('isUser', isUser)

	const isCollectionId =
		typeof queryCollectionId === 'string' && queryCollectionId !== ''

	return (
		<>
			<Header />

			<section className={styles.collectionWrapper}>
				{isUser ? (
					<>
						<CreatorHeader
							creatorProfile={collectionData?.creatorProfile}
							creatorRoute='collections'
						/>
						<Col className={styles.collectionNameWrapper}>
							<Text className={styles.collectionName}>
								{collectionData?.collection?.name}
							</Text>
						</Col>
					</>
				) : null}

				{isCollectionId && isCollectionData ? (
					<CreationsGrid
						appWidth={appWidth}
						creatorProfile={collectionData?.creatorProfile}
						collectionId={queryCollectionId}
					/>
				) : null}
			</section>
		</>
	)
}

export default Collection
