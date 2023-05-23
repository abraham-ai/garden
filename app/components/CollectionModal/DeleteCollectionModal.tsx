import type { FC, CSSProperties, Dispatch, SetStateAction } from 'react'
import React, { useState, useContext } from 'react'
import AppContext from '../../../context/AppContext'

import type Collection from '../../../interfaces/Collection'

import styles from '../../../styles/CreationSaveModal.module.css'

import { Row, Col, Button, Typography, Checkbox, notification } from 'antd'
import type { CheckboxChangeEvent } from 'antd/es/checkbox'

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

interface DeleteCollectionModalProps {
	collection: Collection
	handleCollectionCancel: () => void
	setIsCollectionModalOpen: Dispatch<SetStateAction<boolean>>
	setCollectionModalView: Dispatch<SetStateAction<string>>
	setCurrentModalCollection: Dispatch<SetStateAction<Collection>>
	refetchTrigger: number
	setRefetchTrigger: () => void
}

const DeleteCollectionModal: FC<DeleteCollectionModalProps> = ({
	collection,
	handleCollectionCancel,
	setIsCollectionModalOpen,
	setCollectionModalView,
	setCurrentModalCollection,
	refetchTrigger,
	setRefetchTrigger,
}) => {
	const context = useContext(AppContext)

	const handleCollectionAction =
		context?.handleCollectionAction ??
		(async () => {
			await Promise.resolve()
		})

	const [isDeleteDisabled, setIsDeleteDisabled] = useState<boolean>(true)
	const onChange = (e: CheckboxChangeEvent): void => {
		console.log(`checked = ${String(e.target.checked)}`)
		setIsDeleteDisabled(!isDeleteDisabled)
	}

	const textStyle: CSSProperties = {
		color: '#1677ff',
		fontWeight: 600,
		fontSize: '1rem',
		margin: '0 10px',
	}
	const textWrapperStyle: CSSProperties = {
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'column',
		justifyContent: 'center',
		width: '100%',
		margin: '20px 0',
		minWidth: 200,
	}

	const deleteWrapperStyle: CSSProperties = {
		display: 'flex',
		minWidth: 300,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
	}

	const deleteButtonWrapper: CSSProperties = {
		display: 'flex',
		justifyContent: 'flex-end',
		width: '100%',
	}

	return (
		<article className={styles.modalView2}>
			{
				<Col style={deleteWrapperStyle}>
					<Row style={textWrapperStyle}>
						<Text className={styles.textBold}>{'Delete collection'}</Text>
						<Text style={textStyle}>{collection?.name}</Text>
					</Row>

					<Row>
						<Checkbox onChange={onChange} style={{ marginRight: 20 }} />
						<Text style={{ maxWidth: 200 }}>
							{
								'Once you delete a Collection, there is no going back. Please be certain.'
							}
						</Text>
					</Row>

					<span style={deleteButtonWrapper}>
						<Button
							type={'default'}
							shape='round'
							danger
							disabled={isDeleteDisabled}
							className={styles.buttonPrimary}
							onClick={() => {
								handleCollectionAction('delete', collection._id, null)
									.then(() => {
										openNotificationWithIcon(
											'success',
											'Collection Deleted successfully!',
											'Deleted Collection'
										)
										handleCollectionCancel()
										setRefetchTrigger(refetchTrigger + 1)
									})
									.catch((error) => {
										console.error('Error creating collection:', error)
									})
							}}
						>
							{'Delete'}
						</Button>
					</span>
				</Col>
			}
		</article>
	)
}

export default DeleteCollectionModal
