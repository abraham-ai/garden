import type { FC, Dispatch, SetStateAction } from 'react'
import React, { useContext } from 'react'
import AppContext from '../../../context/AppContext'

import type Collection from '../../../interfaces/Collection'
import styles from '../../../styles/CreationSaveModal.module.css'

import { Row, Col, Button, Typography, Input, notification } from 'antd'

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

interface CreateCollectionModalProps {
	collection: Collection
	inputCollectionName: string
	setInputCollectionName: Dispatch<SetStateAction<string>>
	handleCollectionCancel: () => void
	setIsCollectionModalOpen: Dispatch<SetStateAction<boolean>>
	setCollectionModalView: Dispatch<SetStateAction<string>>
	currentModalCollection: Collection
	setCurrentModalCollection: Dispatch<SetStateAction<Collection>>
}

const CreateCollectionModal: FC<CreateCollectionModalProps> = ({
	inputCollectionName,
	setInputCollectionName,
	handleCollectionCancel,
	setIsCollectionModalOpen,
	setCollectionModalView,
	currentModalCollection,
	setCurrentModalCollection,
}) => {
	const context = useContext(AppContext)

	const handleCollectionAction =
		context?.handleCollectionAction ??
		(async () => {
			await Promise.resolve()
		})

	return (
		<article className={styles.modalView2} style={{ minWidth: 300 }}>
			{
				<Col>
					<Row
						style={{
							display: 'flex',
							justifyContent: 'center',
							margin: '20px 0',
						}}
					>
						<Text className={styles.textBold}>{'Create new Collection'}</Text>
					</Row>

					<Input
						placeholder='Collection Name'
						onChange={(e) => {
							setInputCollectionName(e.target.value)
						}}
					/>

					<span
						style={{ display: 'flex', flex: 1, justifyContent: 'flex-end' }}
					>
						<Button
							type={'primary'}
							shape='round'
							size='large'
							className={styles.buttonPrimary}
							disabled={inputCollectionName === ''}
							onClick={() => {
								handleCollectionAction('create', null, inputCollectionName)
									.then((res) => {
										console.log({ res })
										openNotificationWithIcon(
											'success',
											'Creation created successfully!',
											'New Collection Name'
										)
										handleCollectionCancel()
									})
									.catch((error) => {
										console.error('Error creating collection:', error)
									})
							}}
						>
							{'Create'}
						</Button>
					</span>
				</Col>
			}
		</article>
	)
}

export default CreateCollectionModal
