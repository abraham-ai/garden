import type { FC, MouseEvent } from 'react'
import type Collection from '../interfaces/Collection'

import React, { useState, useContext } from 'react'
import { useRouter } from 'next/navigation'

import AppContext from '../context/AppContext'

import Header from '../app/components/NavBar/Header'
import CreatorHeader from '../app/components/Creator/CreatorHeader'
import CollectionModal from '../app/components/collection/CollectionModal'

import useGetCollections from '../hooks/useGetCollections'

import styles from '../styles/MyCollections.module.css'

import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { AiTwotoneEdit } from 'react-icons/ai'
import { TiDelete } from 'react-icons/ti'
import { MdMoreVert } from 'react-icons/md'
import type { MenuProps } from 'antd'
import { Typography, Button, Row, Spin, Col, Dropdown } from 'antd'

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />
const { Text } = Typography

const CreateCollectionButton: FC = () => {
	const context = useContext(AppContext)

	const setIsCollectionModalOpen =
		context?.setIsCollectionModalOpen ?? (() => {})
	const setIsCreateCollectionModalOpen =
		context?.setIsCreateCollectionModalOpen ?? (() => {})

	const handleCreateCollection = (): void => {
		setIsCreateCollectionModalOpen(true)
		setIsCollectionModalOpen(true)
	}

	return (
		<Row className={styles.createCollectionButtonWrapper}>
			<Button
				className={styles.createCollectionButton}
				type='default'
				shape='round'
				size='large'
				icon={<PlusOutlined />}
				onClick={(e) => {
					handleCreateCollection()
				}}
			>
				<Text className={styles.createCollectionButtonText}>
					{'Create Collection'}
				</Text>
			</Button>
		</Row>
	)
}

interface CollectionItemButton {
	isCollectionHovering: boolean
}

const CollectionItemMoreButton: FC<CollectionItemButton> = ({
	isCollectionHovering,
}) => {
	const handleDeleteCollectionModal = (): void => {
		console.log('handleDeleteCollection')
	}

	const items: MenuProps['items'] = [
		{
			key: 1,
			label: (
				<Text onClick={() => handleDeleteCollectionModal}>{'Delete'}</Text>
			),
		},
	]

	return (
		<>
			{isCollectionHovering ? (
				<span>
					<Dropdown menu={{ items }}>
						<Button
							// onClick={handleButtonClick}
							shape='circle'
							size='large'
							type='text'
							icon={<MdMoreVert />}
						/>
					</Dropdown>
				</span>
			) : null}
		</>
	)
}

const CollectionItemDeleteButton: FC<CollectionItemButton> = ({
	isCollectionHovering,
}) => {
	const handleDeleteCollectionModal = (): void => {
		console.log('handleDeleteCollection')
	}

	const deleteStyles = {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center ',
		marginLeft: 10,
	}

	return (
		<>
			{isCollectionHovering ? (
				<span>
					<Button
						onClick={handleDeleteCollectionModal}
						shape='circle'
						size='large'
						type='text'
						style={deleteStyles}
						icon={<TiDelete />}
					/>
				</span>
			) : null}
		</>
	)
}

const CollectionItemRenameButton: FC<CollectionItemButton> = ({
	isCollectionHovering,
}) => {
	const renameStyles = {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center ',
		marginLeft: 10,
	}

	return (
		<>
			{isCollectionHovering ? (
				<span>
					<Button
						shape='circle'
						size='large'
						type='text'
						icon={<AiTwotoneEdit />}
						style={renameStyles}
					/>
				</span>
			) : null}
		</>
	)
}

const CollectionItem: FC<Collection> = ({ collection }) => {
	const [isCollectionHovering, setIsCollectionHovering] =
		useState<boolean>(false)

	const handleMouseOver = (): void => {
		setIsCollectionHovering(true)
	}

	const handleMouseOut = (): void => {
		setIsCollectionHovering(false)
	}

	console.log({ isCollectionHovering })

	return (
		<section
			key={collection._id}
			onMouseOver={handleMouseOver}
			onMouseOut={handleMouseOut}
			style={{ position: 'relative' }}
		>
			<Button
				className={styles.collectionButton}
				onClick={(e) => {
					handleClickCollection(e, collection._id)
				}}
			>
				<Text className={styles.collectionButtonText}>{collection.name}</Text>
			</Button>

			<Row
				style={{
					display: 'flex',
					justifyContent: 'flex-end',
					position: 'absolute',
					top: 20,
					right: 20,
					zIndex: 100,
				}}
			>
				<CollectionItemRenameButton
					isCollectionHovering={isCollectionHovering}
				/>
				<CollectionItemDeleteButton
					isCollectionHovering={isCollectionHovering}
				/>
			</Row>
		</section>
	)
}

const MyCollections: FC = () => {
	const context = useContext(AppContext)

	const userId =
		typeof context !== 'undefined' && context !== null && 'userId' in context
			? String(context.userId)
			: ''

	const router = useRouter()

	const {
		collections: myCollectionsData,
		isLoading,
		error,
	} = useGetCollections()

	console.log({ myCollectionsData })

	const handleClickCollection = (
		e: MouseEvent<HTMLAnchorElement>,
		collectionId: string
	): void => {
		e.preventDefault()
		router.push(`/collection/${String(collectionId)}`)
	}

	const isMyCollections =
		myCollectionsData !== null && !isLoading && typeof error === 'undefined'

	console.log({ myCollectionsData, isLoading, error })

	return (
		<>
			<main>
				<Header />
			</main>

			<CreatorHeader userId={userId} isMyCollectionsRoute={true} />
			{isMyCollections ? (
				<Col className={styles.collectionsWrapper}>
					<Row
						style={{
							display: 'flex',
							flexDirection: 'column',
						}}
					>
						<CreateCollectionButton />

						<CollectionModal />

						<Row style={{ justifyContent: 'center' }}>
							{myCollectionsData.map((collection: Collection) => {
								return (
									<CollectionItem
										key={collection._id}
										collection={collection}
									/>
								)
							})}
						</Row>
					</Row>
				</Col>
			) : (
				<Row className={styles.loading}>
					<Spin indicator={antIcon} />
				</Row>
			)}
		</>
	)
}

export default MyCollections
