import type { FC, MouseEvent } from 'react'
import type Collection from '../interfaces/Collection'

import React, { useState, useContext, useEffect } from 'react'
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
import {
	Typography,
	Button,
	Row,
	Spin,
	Col,
	Dropdown,
	ConfigProvider,
	theme,
} from 'antd'

const themeDark = { algorithm: theme.darkAlgorithm }
const themeDefault = { algorithm: theme.defaultAlgorithm }

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />
const { Text } = Typography

const CreateCollectionButton: FC = ({ currentTheme }) => {
	const context = useContext(AppContext)

	const setIsCollectionModalOpen =
		context?.setIsCollectionModalOpen ?? (() => {})
	const setCollectionModalView = context?.setCollectionModalView ?? (() => {})

	const handleCreateCollection = (): void => {
		setCollectionModalView('create')
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
	collection: Collection
}

const CollectionItemMoreButton: FC<CollectionItemButton> = ({
	isCollectionHovering,
	collection,
}) => {
	const handleMoreCollectionModal = (): void => {
		console.log('handleMoreCollection')
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
	collection,
	currentTheme,
}) => {
	const context = useContext(AppContext)

	const setIsCollectionModalOpen =
		context?.setIsCollectionModalOpen ?? (() => {})
	const setCollectionModalView = context?.setCollectionModalView ?? (() => {})
	const setCurrentModalCollection =
		context?.setCurrentModalCollection ?? (() => {})

	const handleDeleteCollectionModal = (): void => {
		console.log('handleDeleteCollection')
		console.log({ collection })
		console.log(collection.name)
		setCollectionModalView('delete')
		setIsCollectionModalOpen(true)
		setCurrentModalCollection(collection)
	}

	const deleteStyles = {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center ',
		marginLeft: 10,
	}

	return (
		<>
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
		</>
	)
}

const CollectionItemRenameButton: FC<CollectionItemButton> = ({
	collection,
	currentTheme,
}) => {
	const renameStyles = {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center ',
		marginLeft: 10,
	}

	const context = useContext(AppContext)

	const setIsCollectionModalOpen =
		context?.setIsCollectionModalOpen ?? (() => {})
	const setCollectionModalView = context?.setCollectionModalView ?? (() => {})
	const setCurrentModalCollection =
		context?.setCurrentModalCollection ?? (() => {})

	const handleRenameCollectionModal = (): void => {
		console.log('handleDeleteCollection')
		console.log({ collection })
		console.log(collection.name)
		setCollectionModalView('rename')
		setIsCollectionModalOpen(true)
		setCurrentModalCollection(collection)
	}

	return (
		<>
			<span>
				<Button
					shape='circle'
					size='large'
					type='text'
					icon={<AiTwotoneEdit />}
					style={renameStyles}
					onClick={handleRenameCollectionModal}
				/>
			</span>
		</>
	)
}

const CollectionItem: FC<Collection> = ({ collection, currentTheme }) => {
	const router = useRouter()

	const [isCollectionHovering, setIsCollectionHovering] =
		useState<boolean>(false)

	const handleMouseOver = (): void => {
		setIsCollectionHovering(true)
	}

	const handleMouseOut = (): void => {
		setIsCollectionHovering(false)
	}

	const handleClickCollection = (
		e: MouseEvent<HTMLAnchorElement>,
		collectionId: string
	): void => {
		e.preventDefault()
		router.push(`/collection/${String(collectionId)}`)
	}

	// console.log({ isCollectionHovering })

	const buttonTheme = currentTheme === 'light' ? themeDefault : themeDark

	return (
		<section
			key={collection._id}
			onMouseOver={handleMouseOver}
			onMouseOut={handleMouseOut}
			style={{ position: 'relative' }}
		>
			<ConfigProvider theme={buttonTheme}>
				<Button
					className={styles.collectionButton}
					onClick={(e) => {
						handleClickCollection(e, collection._id)
					}}
				>
					<Text className={styles.collectionButtonText}>{collection.name}</Text>
				</Button>
			</ConfigProvider>

			{isCollectionHovering ? (
				<>
					<Row
						style={{
							position: 'absolute',
							top: 20,
							right: 20,
							zIndex: 100,
						}}
					>
						<CollectionItemRenameButton
							collection={collection}
							isCollectionHovering={isCollectionHovering}
						/>
					</Row>
					<Row
						style={{
							position: 'absolute',
							bottom: 20,
							right: 20,
							zIndex: 100,
						}}
					>
						<CollectionItemDeleteButton
							collection={collection}
							isCollectionHovering={isCollectionHovering}
						/>
					</Row>
				</>
			) : null}
		</section>
	)
}

const MyCollections: FC = () => {
	const context = useContext(AppContext)

	const [myCollections, setMyCollections] = useState<Collections>([])

	const userId =
		typeof context !== 'undefined' && context !== null && 'userId' in context
			? String(context.userId)
			: ''

	const currentTheme = context?.currentTheme ?? ''

	const collections = context?.collections ?? []
	const setCollections = context?.setCollections ?? (() => {})

	const collectionModalView = context?.collectionModalView ?? ''
	const currentModalCollection = context?.currentModalCollection ?? ''

	const {
		collections: myCollectionsData,
		isLoading,
		error,
	} = useGetCollections()

	useEffect(() => {
		setMyCollections(collections)
	}, [collections, setCollections])

	const handleCurrentCollectionsData = (): void => {
		if (myCollections.length > 0) {
			return myCollections
		} else if (myCollectionsData.length > 0) {
			return myCollectionsData
		}
	}

	const isMyCollectionsData =
		myCollectionsData !== null && !isLoading && typeof error === 'undefined'

	const currentMyCollections = handleCurrentCollectionsData()
	const isCurrentMyCollections = currentMyCollections.length > 0

	console.log({ myCollectionsData, isLoading, error })
	console.log({ myCollections })
	console.log({ currentMyCollections })

	console.log({ collectionModalView })
	console.log({ currentModalCollection })

	const collectionWrapperStyles = {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	}

	const collectionInnerWrapperStyles = {
		display: 'flex',
		flexDirection: 'column',
	}

	return (
		<>
			<main>
				<Header />
			</main>

			<Col style={collectionWrapperStyles}>
				<CreatorHeader userId={userId} isMyCollectionsRoute={true} />
				{isCurrentMyCollections ? (
					<Col className={styles.collectionsWrapper}>
						<Row style={collectionInnerWrapperStyles}>
							<CreateCollectionButton />

							<CollectionModal collection={currentModalCollection} />

							<Row style={{ justifyContent: 'center' }}>
								{currentMyCollections.map((collection: Collection) => {
									return (
										<CollectionItem
											key={collection._id}
											collection={collection}
											currentTheme={currentTheme}
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
			</Col>
		</>
	)
}

export default MyCollections
