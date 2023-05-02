import type { FC, MouseEvent, CSSProperties } from 'react'
import type Collection from '../../../interfaces/Collection'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

import type Creation from '../../../interfaces/Creation'

import CollectionItemRenameButton from './CollectionItemRenameButton'
import CollectionItemDeleteButton from './CollectionItemDeleteButton'

import styles from '../../../styles/MyCollections.module.css'

import {
	Typography,
	Button,
	Row,
	ConfigProvider,
	theme,
	type ThemeConfig,
} from 'antd'

const themeDark = { algorithm: theme.darkAlgorithm }
const themeDefault = { algorithm: theme.defaultAlgorithm }

const { Text } = Typography

interface CollectionItemProps {
	collection: Collection
	currentTheme: string
	collectionCreations: Creation[]
}

const CollectionItem: FC<CollectionItemProps> = ({
	collection,
	currentTheme,
	collectionCreations,
}) => {
	const router = useRouter()

	const [isCollectionHovering, setIsCollectionHovering] =
		useState<boolean>(false)

	const handleMouseOver = (): void => {
		setIsCollectionHovering(true)
	}

	const handleMouseOut = (): void => {
		setIsCollectionHovering(false)
	}

	const isCollectionEmpty = collectionCreations?.length === 0

	const handleClickCollection = (
		e: MouseEvent<HTMLAnchorElement>,
		collectionId: string
	): void => {
		e.preventDefault()
		router.push(`/collection/${String(collectionId)}`)
	}

	const handleButtonTheme = (): ThemeConfig => {
		if (currentTheme === 'light' && !isCollectionEmpty) {
			return themeDark
		} else if (currentTheme === 'light' && isCollectionEmpty) {
			return themeDefault
		} else {
			return themeDefault
		}
	}

	// console.log({ isCollectionHovering })
	// console.log({ collectionCreations })

	const buttonTheme = handleButtonTheme()

	const isCollectionCreations = collectionCreations?.length > 0

	const collectionImageStyles: CSSProperties = {
		position: 'absolute',
		top: 0,
		right: 0,
		height: '100%',
		width: '100%',
		zIndex: 0,
	}

	const deleteWrapperStyles: CSSProperties = {
		position: 'absolute',
		bottom: 20,
		right: 20,
		zIndex: 100,
	}
	const renameWrapperStyles: CSSProperties = {
		position: 'absolute',
		top: 20,
		right: 20,
		zIndex: 100,
	}

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
					{isCollectionCreations ? (
						<Row style={collectionImageStyles}>
							<Image
								width={200}
								height={200}
								src={collectionCreations[0].uri}
								alt={collectionCreations[0].task.config.text_input}
								style={{ width: '100%', height: 'auto', opacity: '0.7' }}
							/>
						</Row>
					) : null}
				</Button>
			</ConfigProvider>

			{isCollectionHovering ? (
				<>
					<Row style={renameWrapperStyles}>
						<CollectionItemRenameButton
							collection={collection}
							currentTheme={currentTheme}
							isCollectionHovering={isCollectionHovering}
							collectionCreations={collectionCreations}
						/>
					</Row>
					<Row style={deleteWrapperStyles}>
						<CollectionItemDeleteButton
							collection={collection}
							currentTheme={currentTheme}
							isCollectionHovering={isCollectionHovering}
							collectionCreations={collectionCreations}
						/>
					</Row>
				</>
			) : null}
		</section>
	)
}

export default CollectionItem
