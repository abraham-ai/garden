import type Collection from '../../../interfaces/Collection'
import type { FC, Dispatch, SetStateAction } from 'react'

import React, { useContext } from 'react'
import AppContext from '../../../context/AppContext'

import styles from '../../../styles/CreationSaveModal.module.css'

import { Row, Button, Typography, Input, notification } from 'antd'
const { Text } = Typography

const openNotificationWithIcon = (
	type: 'success' | 'error',
	message: string,
	description: string
): void => {
	notification[type]({
		message,
		description,
		placement: 'bottom',
	})
}

interface RenameCollectionModalProps {
	collection: Collection
	inputCollectionName: string
	setInputCollectionName: Dispatch<SetStateAction<string>>
	handleCollectionCancel: () => void
	setIsCollectionModalOpen: Dispatch<SetStateAction<boolean>>
	setCollectionModalView: Dispatch<SetStateAction<string>>
	refetchTrigger: number
	setRefetchTrigger: Dispatch<SetStateAction<number>>
}

const RenameCollectionModal: FC<RenameCollectionModalProps> = ({
	collection,
	inputCollectionName,
	setInputCollectionName,
	handleCollectionCancel,
	setIsCollectionModalOpen,
	setCollectionModalView,
	refetchTrigger,
	setRefetchTrigger,
}) => {
	const context = useContext(AppContext)

	const handleCollectionAction =
		context?.handleCollectionAction ??
		(async () => {
			await Promise.resolve()
		})

	console.log({ collection })
	console.log(collection._id)
	console.log(collection.name)

	return (
		<>
			<Row className={styles.renameRow}>
				<span className={`${styles.textBold} ${styles.textWrapper}`}>
					<Text>{'Rename Collection:'}</Text>
					<Text className={styles.text}>{collection.name}</Text>
				</span>
			</Row>

			<Input
				className={styles.input}
				onChange={(e) => {
					setInputCollectionName(e.target.value)
				}}
			/>

			<span className={styles.renameButtonWrapper}>
				<Button
					type={'primary'}
					shape='round'
					className={styles.buttonPrimary}
					disabled={inputCollectionName === ''}
					size='large'
					onClick={() => {
						handleCollectionAction(
							'rename',
							collection._id,
							inputCollectionName
						)
							.then((res) => {
								console.log({ res })
								openNotificationWithIcon(
									'success',
									'Collection Renamed successfully!',
									'New Collection Name'
								)
								handleCollectionCancel()
								setRefetchTrigger(refetchTrigger + 1)
							})
							.catch((error) => {
								console.error('Error creating collection:', error)
							})
					}}
				>
					{'Rename'}
				</Button>
			</span>
		</>
	)
}

export default RenameCollectionModal
