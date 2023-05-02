import type { FC } from 'react'
import React, { useContext } from 'react'
import AppContext from '../../../context/AppContext'

import type Collection from '../../../interfaces/Collection'
import type Creation from '../../../interfaces/Creation'

import { TiDelete } from 'react-icons/ti'
import { Button } from 'antd'

interface CollectionItemButton {
	collection: Collection
	collectionCreations: Creation[]
	isCollectionHovering: boolean
	currentTheme: string
}

const CollectionItemDeleteButton: FC<CollectionItemButton> = ({
	collection,
	collectionCreations,
	currentTheme,
}) => {
	const context = useContext(AppContext)

	const setIsCollectionModalOpen =
		context?.setIsCollectionModalOpen ?? (() => {})
	const setCollectionModalView = context?.setCollectionModalView ?? (() => {})
	const setCurrentModalCollection =
		context?.setCurrentModalCollection ?? (() => {})

	const isCollectionArray = Array.isArray(collectionCreations)

	const isCollectionEmpty =
		isCollectionArray && collectionCreations?.length === 0

	// console.log(collection.name)
	// console.log({ isCollectionEmpty })

	const handleDeleteCollectionModal = (): void => {
		// console.log('handleDeleteCollection')
		// console.log({ collection })
		// console.log(collection.name)
		setCollectionModalView('delete')
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

	const deleteStyles = {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center ',
		marginLeft: 10,
	}

	// console.log({ isCollectionEmpty })
	// console.log({ iconColor })

	return (
		<>
			<span>
				<Button
					onClick={handleDeleteCollectionModal}
					shape='circle'
					size='large'
					type='text'
					style={deleteStyles}
					icon={<TiDelete style={{ color: iconColor }} />}
				/>
			</span>
		</>
	)
}

export default CollectionItemDeleteButton
