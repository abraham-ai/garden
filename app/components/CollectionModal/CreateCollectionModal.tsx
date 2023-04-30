import type { FC } from 'react'
import React, { useContext } from 'react'
import AppContext from '../../../context/AppContext'

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

const CreateCollectionModal: FC = ({
	inputCollectionName,
	setInputCollectionName,
	handleCollectionCancel,
	setIsCollectionModalOpen,
	setCollectionModalView,
	currentModalCollection,
	setCurrentModalCollection,
}) => {
	const context = useContext(AppContext)

	const handleCollectionAction = context?.handleCollectionAction ?? (() => {})
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
								handleCollectionAction('create', undefined, inputCollectionName)
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
