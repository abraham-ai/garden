import type { FC, Dispatch, SetStateAction } from 'react'
import type Collection from '../../../interfaces/Collection'

import React, { useState, useContext } from 'react'
import AppContext from '../../../context/AppContext'

import RenameCollectionModal from './RenameCollectionModal'
import CreateCollectionModal from './CreateCollectionModal'
import DeleteCollectionModal from './DeleteCollectionModal'

import { Modal } from 'antd'

const emptyCollection: Collection = {
	_id: '',
	name: '',
}

interface CollectionModalProps {
	collection: Collection
	refetchTrigger: number
	setRefetchTrigger: Dispatch<SetStateAction<number>>
}

const CollectionModal: FC<CollectionModalProps> = ({
	collection,
	refetchTrigger,
	setRefetchTrigger,
}) => {
	const context = useContext(AppContext)

	const isCollectionModalOpen = context?.isCollectionModalOpen ?? false
	const setIsCollectionModalOpen =
		context?.setIsCollectionModalOpen ?? (() => {})

	const collectionModalView = context?.collectionModalView ?? ''
	const setCollectionModalView = context?.setCollectionModalView ?? (() => {})

	const [inputCollectionName, setInputCollectionName] = useState<string>('')

	const setCurrentModalCollection =
		context?.setCurrentModalCollection ?? (() => {})

	const handleCollectionCancel = (): void => {
		setIsCollectionModalOpen(false)
		setCollectionModalView('')
		setCurrentModalCollection(emptyCollection)
		setInputCollectionName('')
	}

	// console.log({ collection })
	// console.log(collection.name)
	// console.log({ collectionModalView })
	// console.log({ inputCollectionName })

	return (
		<Modal
			open={isCollectionModalOpen}
			footer={<></>}
			onCancel={() => {
				handleCollectionCancel()
			}}
		>
			{collectionModalView === 'rename' ? (
				<RenameCollectionModal
					collection={collection}
					inputCollectionName={inputCollectionName}
					setInputCollectionName={setInputCollectionName}
					handleCollectionCancel={handleCollectionCancel}
					setIsCollectionModalOpen={setIsCollectionModalOpen}
					setCollectionModalView={setCollectionModalView}
					refetchTrigger={refetchTrigger}
					setRefetchTrigger={setRefetchTrigger}
				/>
			) : null}

			{collectionModalView === 'create' ? (
				<CreateCollectionModal
					collection={collection}
					inputCollectionName={inputCollectionName}
					setInputCollectionName={setInputCollectionName}
					handleCollectionCancel={handleCollectionCancel}
					setIsCollectionModalOpen={setIsCollectionModalOpen}
					setCollectionModalView={setCollectionModalView}
					currentModalCollection={emptyCollection}
					setCurrentModalCollection={setCurrentModalCollection}
					refetchTrigger={refetchTrigger}
					setRefetchTrigger={setRefetchTrigger}
				/>
			) : null}

			{collectionModalView === 'delete' ? (
				<DeleteCollectionModal
					collection={collection}
					handleCollectionCancel={handleCollectionCancel}
					setIsCollectionModalOpen={setIsCollectionModalOpen}
					setCollectionModalView={setCollectionModalView}
					setCurrentModalCollection={setCurrentModalCollection}
					refetchTrigger={refetchTrigger}
					setRefetchTrigger={setRefetchTrigger}
				/>
			) : null}
		</Modal>
	)
}

export default CollectionModal
