import type { FC, CSSProperties } from 'react'
import type Collection from '../interfaces/Collection'

import React, { useState, useContext, useEffect } from 'react'

import AppContext from '../context/AppContext'

import Header from '../app/components/NavBar/Header'
import CreatorHeader from '../app/components/Creator/CreatorHeader'
import CollectionModal from '../app/components/CollectionModal/CollectionModal'
import CreateCollectionButton from '../app/components/MyCollections/CreateCollectionButton'
import CollectionItem from '../app/components/MyCollections/CollectionItem'

import useGetCollectionsCreations from '../hooks/useGetCollectionsCreations'
import useGetProfile from '../hooks/useGetProfile'

import type CollectionsCreations from '../interfaces/CollectionsCreations'

import styles from '../styles/MyCollections.module.css'

import { LoadingOutlined } from '@ant-design/icons'
import { Row, Spin, Col } from 'antd'

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

const emtpyCollectionsCreations = {
	collections: [],
	collectionsCreations: [],
	isLoading: false,
	error: false,
	isValidating: false,
}

const MyCollections: FC = () => {
	const context = useContext(AppContext)

	const [myCollectionsCreations, setMyCollectionsCreations] =
		useState<CollectionsCreations>(emtpyCollectionsCreations)
	const [refetchTrigger, setRefetchTrigger] = useState(0)

	const isContext =
		typeof context !== 'undefined' && context !== null && 'userId' in context
	const userId = isContext ? String(context.userId) : ''
	const userAddress = context?.userAddress ?? ''
	const currentTheme = context?.currentTheme ?? ''
	const currentModalCollection = context?.currentModalCollection ?? {
		_id: '',
		name: '',
	}

	const creatorProfile = useGetProfile(userId, refetchTrigger)

	const {
		collectionsCreationsData: myCollectionsCreationsData,
		isLoading,
		error,
	} = useGetCollectionsCreations(refetchTrigger)

	const isMyCollectionsCreations =
		myCollectionsCreations !== null &&
		typeof myCollectionsCreations !== 'undefined'

	const isMyCollectionsCreationsData =
		typeof myCollectionsCreationsData?.collections !== 'undefined' &&
		myCollectionsCreationsData?.collections !== null &&
		myCollectionsCreationsData?.collections.length > 0

	console.log(myCollectionsCreationsData)

	useEffect(() => {
		if (isMyCollectionsCreationsData) {
			setMyCollectionsCreations(myCollectionsCreationsData)
		}
	}, [myCollectionsCreationsData])

	useEffect(() => {
		if (isMyCollectionsCreationsData) {
			if (myCollectionsCreationsData?.collections?.length > 0) {
				setMyCollectionsCreations(myCollectionsCreationsData)
			}
		}
	}, [myCollectionsCreations])

	const handleCurrentCollectionsData = (): CollectionsCreations => {
		if (isMyCollectionsCreations) {
			if (myCollectionsCreations?.collections.length > 0) {
				return myCollectionsCreations
			}
		}

		if (isMyCollectionsCreationsData) {
			if (myCollectionsCreationsData?.collections.length > 0) {
				return myCollectionsCreationsData
			}
		}

		return emtpyCollectionsCreations
	}
	const currentMyCollectionsCreations = handleCurrentCollectionsData()

	// const isCurrentMyCollectionsCreationsData =
	// 	currentMyCollectionsCreations !== null &&
	// 	!isLoading &&
	// 	typeof error === 'undefined'

	const isCurrentMyCollectionsCreations =
		currentMyCollectionsCreations?.collections.length > 0 ?? null

	console.log({ myCollectionsCreationsData, isLoading, error })
	console.log({ creatorProfile })
	// console.log({ myCollections })
	// console.log({ currentMyCollections })

	// console.log({ collectionModalView })
	// console.log({ currentModalCollection })

	const collectionWrapperStyles: CSSProperties = {
		marginTop: 100,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	}

	const collectionInnerWrapperStyles: CSSProperties = {
		display: 'flex',
		flexDirection: 'column',
	}

	console.log({ userAddress })

	return (
		<>
			<main>
				<Header />
			</main>

			<Col style={collectionWrapperStyles}>
				<CreatorHeader
					creatorProfile={creatorProfile}
					creatorRoute='collections'
				/>

				{isCurrentMyCollectionsCreations ? (
					<Col className={styles.collectionsWrapper}>
						<Row style={collectionInnerWrapperStyles}>
							<CreateCollectionButton currentTheme={currentTheme} />

							<CollectionModal
								collection={currentModalCollection}
								refetchTrigger={refetchTrigger}
								setRefetchTrigger={setRefetchTrigger}
							/>

							<Row style={{ justifyContent: 'center' }}>
								{currentMyCollectionsCreations.collections?.map(
									(collection: Collection, index: number) => {
										return (
											<CollectionItem
												key={collection._id}
												collection={collection}
												currentTheme={currentTheme}
												collectionCreations={
													currentMyCollectionsCreations?.collectionsCreations[
														index
													]
												}
												refetchTrigger={refetchTrigger}
												setRefetchTrigger={setRefetchTrigger}
											/>
										)
									}
								)}
							</Row>
						</Row>
					</Col>
				) : (
					<Row className={styles.loading}>
						<Spin indicator={antIcon} />
					</Row>
				)}
			</Col>
		</>
	)
}

export default MyCollections
