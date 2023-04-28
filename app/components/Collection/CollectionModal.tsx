import React, { useState, useContext } from 'react'
import AppContext from '../../../context/AppContext'
import type { FC } from 'react'

import styles from '../../../styles/CreationSaveModal.module.css'

import { Row, Button, Typography, Modal, Input } from 'antd'
import { BiLeftArrowAlt } from 'react-icons/bi'
const { Text } = Typography

const CreateCollection: FC = ({ inputName, setInputName }) => {
	return (
		<article className={styles.modalView2}>
			{
				<>
					<Row>
						<Text className={styles.textBold}>{'Create new collection'}</Text>
					</Row>

					<Input
						placeholder='Name'
						onChange={(e) => {
							setInputCollectionName(e.target.value)
						}}
					/>

					<Button
						type={'primary'}
						shape='round'
						className={styles.buttonPrimary}
						disabled={inputName === ''}
						onClick={() => {
							handleCollectionAction(
								'create',
								null,
								currentCreationModalCreation?._id ?? null
							).catch((error) => {
								console.error('Error creating collection:', error)
							})
						}}
					>
						{'Create'}
					</Button>
				</>
			}
		</article>
	)
}

const RenameCollection: FC = ({
	setIsCollectionModalOpen,
	setIsRenameCollectionModalOpen,
}) => {
	const handleRenameCollectionModal = (): void => {
		setIsCollectionModalOpen(true)
		setIsRenameCollectionModalOpen(true)
	}
	return (
		<>
			<Row className={styles.row}>
				<Button
					type='link'
					className={styles.buttonLink}
					onClick={() => {
						handleRenameCollectionModal()
					}}
				>
					<BiLeftArrowAlt size={'1.2rem'} />
				</Button>
				<Text className={styles.textBold}>{'Rename Collection:'}</Text>
			</Row>

			<Input
				placeholder={currentRenameCollection}
				onChange={(e) => {
					setInputCollectionName(e.target.value)
				}}
			/>
			<Button
				type={'primary'}
				shape='round'
				className={styles.buttonPrimary}
				disabled={inputCollectionName === ''}
				onClick={() => {
					handleRenameCollectionName(
						currentRenameCollection,
						currentCreationModalCreation?._id ?? null
					).catch((error) => {
						console.error('Error renaming collection:', error)
					})
				}}
			>
				{'Rename'}
			</Button>
		</>
	)
}

const CollectionModal: FC = () => {
	const context = useContext(AppContext)

	const [inputCollectionName, setInputCollectionName] = useState([])

	const isCollectionModalOpen = context?.isCollectionModalOpen ?? (() => {})
	const setIsCollectionModalOpen =
		context?.setIsCollectionModalOpen ?? (() => {})

	const isCreateCollectionModalOpen =
		context?.isCreateCollectionModalOpen ?? false
	const setIsCreateCollectionModalOpen =
		context?.setIsSaveCreationModalOpen != null
			? context.setIsSaveCreationModalOpen
			: noop

	const isRenameCollectionModalOpen =
		context?.isRenameCollectionModalOpen ?? false
	const setIsRenameCollectionModalOpen =
		context?.setIsSaveCreationModalOpen != null
			? context.setIsSaveCreationModalOpen
			: noop

	const handleCollectionAction = async (
		actionType: 'create' | 'rename',
		collectionId: string | null,
		creationId: string | null
	): Promise<void> => {
		try {
			let endpoint = ''
			let requestData = {}

			if (actionType === 'create') {
				endpoint = '/api/collection/createEmtpy'
				requestData = {
					collectionName: inputCollectionName,
				}
			} else if (actionType === 'rename') {
				endpoint = '/api/collection/rename'
				requestData = {
					collectionId,
				}
			} else {
				throw new Error('Invalid action type')
			}

			const { data } = await axios.post(endpoint, requestData)

			if (actionType === 'create') {
				setCollections((prevCollections) => [...prevCollections, data])
				handleCreateModalCleanUp()
			} else if (actionType === 'save') {
				const { addedCreationResult, collection } = data

				if (addedCreationResult?.success === true) {
					setCurrentSavedCollection(collection)
					handleSaveModalCleanUp().catch((error) => {
						console.error(error)
						console.error('Error handling saveModalCleanUp')
					})
				}
			}
		} catch (error) {
			console.error(`Error in ${actionType} collection:`, error)
		}
	}

	const handleCollectionCancel = (): void => {
		setIsCollectionModalOpen(false)
		setIsRenameCollectionModalOpen(false)
		setIsCreateCollectionModalOpen(false)
	}

	return (
		<Modal
			open={isCollectionModalOpen}
			footer={<></>}
			onCancel={() => {
				handleCollectionCancel()
			}}
		>
			{isRenameCollectionModalOpen ? (
				<RenameCollection
					inputName={inputCollectionName}
					setInputName={setInputCollectionName}
					handleCollectionAction={handleCollectionAction}
					setIsCollectionModalOpen={setIsCollectionModalOpen}
					setIsRenameCollectionModalOpen={setIsRenameCollectionModalOpen}
				/>
			) : null}

			{isCreateCollectionModalOpen ? (
				<CreateCollection
					inputName={inputCollectionName}
					setInputName={setInputCollectionName}
					handleCollectionAction={handleCollectionAction}
					setIsCollectionModalOpen={setIsCollectionModalOpen}
					setIsCreateCollectionModalOpen={setIsCreateCollectionModalOpen}
				/>
			) : null}
		</Modal>
	)
}

export default CollectionModal
