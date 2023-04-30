import type Collection from '../interfaces/Collection'
import type { FC } from 'react'
import React, { useContext } from 'react'
import AppContext from '../../../context/AppContext'

import { Button } from 'antd'

import { AiTwotoneEdit } from 'react-icons/ai'

interface CollectionItemButton {
	isCollectionHovering: boolean
	collection: Collection
	collectionCreations: Creation[]
	currentTheme: string
}

const CollectionItemRenameButton: FC<CollectionItemButton> = ({
	collection,
	collectionCreations,
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

	const isCollectionArray = Array.isArray(collectionCreations)

	const isCollectionEmpty =
		isCollectionArray && collectionCreations?.length === 0

	const handleRenameCollectionModal = (): void => {
		// console.log('handleDeleteCollection')
		// console.log({ collection })
		// console.log(collection.name)
		setCollectionModalView('rename')
		setIsCollectionModalOpen(true)
		setCurrentModalCollection(collection)
	}

	const handleIconColor = (): string => {
		// console.log('currentTheme:', currentTheme)
		// console.log('isCollectionEmpty:', isCollectionEmpty)

		if (currentTheme === 'light') {
			return isCollectionEmpty ? 'black' : 'white'
		} else {
			return 'white'
		}
	}

	const iconColor = handleIconColor()

	// console.log({ iconColor })

	return (
		<>
			<span>
				<Button
					shape='circle'
					size='large'
					type='text'
					icon={<AiTwotoneEdit style={{ color: iconColor }} />}
					style={renameStyles}
					onClick={handleRenameCollectionModal}
				/>
			</span>
		</>
	)
}

export default CollectionItemRenameButton
