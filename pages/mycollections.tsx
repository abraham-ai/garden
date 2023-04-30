import type { FC } from 'react'
import type Collection from '../interfaces/Collection'

import React, { useState, useContext, useEffect } from 'react'

import AppContext from '../context/AppContext'

import Header from '../app/components/NavBar/Header'
import CreatorHeader from '../app/components/Creator/CreatorHeader'
import CollectionModal from '../app/components/CollectionModal/CollectionModal'
import CreateCollectionButton from '../app/components/MyCollections/CreateCollectionButton'
import CollectionItem from '../app/components/MyCollections/CollectionItem'

import useGetCollections from '../hooks/useGetCollections'
import useGetProfile from '../hooks/useGetProfile'

import styles from '../styles/MyCollections.module.css'

import { LoadingOutlined } from '@ant-design/icons'
import { Row, Spin, Col } from 'antd'

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

const MyCollections: FC = () => {
	const context = useContext(AppContext)

	const [myCollections, setMyCollections] = useState<Collections>([])

	const isContext =
		typeof context !== 'undefined' && context !== null && 'userId' in context
	const userId = isContext ? String(context.userId) : ''
	const userAddress = context?.userAddress ?? ''

	const currentTheme = context?.currentTheme ?? ''

	const collections = context?.collections ?? []
	const setCollections = context?.setCollections ?? (() => {})

	const currentModalCollection = context?.currentModalCollection ?? ''

	const creator = useGetProfile(userId)

	const {
		collections: myCollectionsData,
		isLoading,
		error,
	} = useGetCollections()

	useEffect(() => {
		setMyCollections(collections)
	}, [collections, setCollections])

	useEffect(() => {
		if (myCollectionsData?.collections?.length > 0) {
			setMyCollections(myCollectionsData?.collections)
		}
	}, [myCollectionsData])

	const handleCurrentCollectionsData = (): Collection[] => {
		if (myCollections.length > 0) {
			return myCollections
		} else if (myCollectionsData.length > 0) {
			return myCollectionsData
		}
		return []
	}
	const currentMyCollections = handleCurrentCollectionsData()

	const isCurrentMyCollectionsData =
		currentMyCollections !== null && !isLoading && typeof error === 'undefined'

	const isCurrentMyCollections = currentMyCollections?.length > 0 ?? []

	console.log({ myCollectionsData, isLoading, error })
	console.log({ creator })
	// console.log({ myCollections })
	// console.log({ currentMyCollections })

	// console.log({ collectionModalView })
	// console.log({ currentModalCollection })

	const collectionWrapperStyles = {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	}

	const collectionInnerWrapperStyles = {
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
					creator={creator}
					userAddress={userAddress}
					isMyCollectionsRoute={true}
				/>
				{isCurrentMyCollections ? (
					<Col className={styles.collectionsWrapper}>
						<Row style={collectionInnerWrapperStyles}>
							<CreateCollectionButton />

							<CollectionModal collection={currentModalCollection} />

							<Row style={{ justifyContent: 'center' }}>
								{currentMyCollections?.map(
									(collection: Collection, index: number) => {
										return (
											<CollectionItem
												key={collection._id}
												collection={collection}
												currentTheme={currentTheme}
												collectionCreations={
													myCollectionsData?.collectionsCreations[index]
												}
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
