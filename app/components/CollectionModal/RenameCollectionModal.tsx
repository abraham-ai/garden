import type { FC, CSSProperties, Dispatch, SetStateAction } from 'react'
import React, { useContext } from 'react'
import AppContext from '../../../context/AppContext'

import type Collection from '../../../interfaces/Collection'

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
}

const RenameCollectionModal: FC<RenameCollectionModalProps> = ({
	collection,
	inputCollectionName,
	setInputCollectionName,
	handleCollectionCancel,
	setIsCollectionModalOpen,
	setCollectionModalView,
}) => {
	const context = useContext(AppContext)

	const handleCollectionAction =
		context?.handleCollectionAction ??
		(async () => {
			await Promise.resolve()
		})

	const textWrapperStyle: CSSProperties = {
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'column',
		justifyContent: 'center',
		width: '100%',
	}
	const textStyle: CSSProperties = {
		color: '#1677ff',
		fontWeight: 600,
		fontSize: '1rem',
		margin: '0 10px',
	}

	console.log({ collection })
	console.log(collection._id)
	console.log(collection.name)

	return (
		<>
			<Row className={styles.row} style={{ marginTop: 20, minWidth: 300 }}>
				<span className={styles.textBold} style={textWrapperStyle}>
					<Text>{'Rename Collection:'}</Text>
					<Text style={textStyle}>{collection.name}</Text>
				</span>
			</Row>

			<Input
				style={{ margin: '10px 0' }}
				onChange={(e) => {
					setInputCollectionName(e.target.value)
				}}
			/>

			<span style={{ display: 'flex', flex: 1, justifyContent: 'flex-end' }}>
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
