import React, { useState, useContext } from 'react'
import AppContext from '../../../context/AppContext'
import type { FC } from 'react'

import axios from 'axios'

import styles from '../../../styles/CreationSaveModal.module.css'

import {
	Row,
	Col,
	Button,
	Typography,
	Modal,
	Input,
	Checkbox,
	notification,
} from 'antd'
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

const CreateCollection: FC = ({
	inputCollectionName,
	setInputCollectionName,
	handleCollectionAction,
	handleCollectionCancel,
	setIsCollectionModalOpen,
	setCollectionModalView,
	currentModalCollection,
	setCurrentModalCollection,
}) => {
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

const RenameCollection: FC = ({
	collection,
	inputCollectionName,
	setInputCollectionName,
	handleCollectionAction,
	handleCollectionCancel,
	setIsCollectionModalOpen,
	setCollectionModalView,
}) => {
	const textWrapperStyle = {
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'column',
		justifyContent: 'center',
		width: '100%',
	}
	const textStyle = {
		color: '#1677ff',
		fontWeight: 600,
		fontSize: '1rem',
		margin: '0 10px',
	}

	console.log({ collection })
	console.log(collection._id)
	console.log(collection.name)

	const displayRenameCollection =
		inputCollectionName === '' ? collection.name : inputCollectionName
	return (
		<>
			<Row className={styles.row} style={{ marginTop: 20, minWidth: 300 }}>
				<span className={styles.textBold} style={textWrapperStyle}>
					<Text>{'Rename Collection:'}</Text>
					<Text style={textStyle}>{displayRenameCollection}</Text>
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

const DeleteCollection: FC = ({
	collection,
	inputName,
	setInputName,
	handleCollectionAction,
	handleCollectionCancel,
	setIsCollectionModalOpen,
	setCollectionModalView,
	setCurrentModalCollection,
}) => {
	const [isDeleteDisabled, setIsDeleteDisabled] = useState<boolean>(true)
	const onChange = (e: CheckboxChangeEvent): void => {
		console.log(`checked = ${String(e.target.checked)}`)
		setIsDeleteDisabled(!isDeleteDisabled)
	}

	const textStyle = {
		color: '#1677ff',
		fontWeight: 600,
		fontSize: '1rem',
		margin: '0 10px',
	}
	const textWrapperStyle = {
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'column',
		justifyContent: 'center',
		width: '100%',
		margin: '20px 0',
		minWidth: 200,
	}

	const deleteWrapperStyle = {
		display: 'flex',
		minWidth: 300,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
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

					<span
						style={{
							display: 'flex',
							justifyContent: 'flex-end',
							width: '100%',
						}}
					>
						<Button
							type={'default'}
							shape='round'
							danger
							disabled={isDeleteDisabled}
							className={styles.buttonPrimary}
							onClick={() => {
								handleCollectionAction('delete', collection._id, undefined)
									.then(() => {
										openNotificationWithIcon(
											'success',
											'Collection Deleted successfully!',
											'Deleted Collection'
										)
										handleCollectionCancel()
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

const CollectionModal: FC = ({ collection }) => {
	const context = useContext(AppContext)

	const isCollectionModalOpen = context?.isCollectionModalOpen ?? false
	const setIsCollectionModalOpen =
		context?.setIsCollectionModalOpen ?? (() => {})

	const collectionModalView = context?.collectionModalView ?? ''
	const setCollectionModalView = context?.setCollectionModalView ?? (() => {})

	const [inputCollectionName, setInputCollectionName] = useState<string>('')

	const setCurrentModalCollection =
		context?.setCurrentModalCollection ?? (() => {})

	const handleCollectionAction = async (
		actionType: 'create' | 'rename' | 'delete',
		collectionId: string | null,
		collectionName: string | null
	): Promise<void> => {
		console.log({ collectionId })
		console.log({ collectionName })
		try {
			let endpoint = ''
			let requestData = {}

			if (actionType === 'create') {
				endpoint = '/api/collection/create'
				requestData = {
					collectionName,
				}
			} else if (actionType === 'rename') {
				endpoint = '/api/collection/rename'
				requestData = {
					collectionId,
					newCollectionName: collectionName,
				}
			} else if (actionType === 'delete') {
				endpoint = '/api/collection/delete'
				requestData = {
					collectionId,
					collectionName,
				}
			} else {
				throw new Error('Invalid action type')
			}

			const { data } = await axios.post(endpoint, requestData)

			if (actionType === 'create') {
				setCollections((prevCollections) => [...data])
			} else if (actionType === 'delete' || actionType === 'rename') {
				setCollections((prevCollections) => [...data])
			}
		} catch (error) {
			console.error(`Error in ${actionType} collection:`, error)
		}
	}

	const handleCollectionCancel = (): void => {
		setIsCollectionModalOpen(false)
		setCollectionModalView('')
		setCurrentModalCollection({})
		setInputCollectionName('')
	}

	console.log({ collection })
	console.log(collection.name)
	console.log({ collectionModalView })
	console.log({ inputCollectionName })

	return (
		<Modal
			open={isCollectionModalOpen}
			footer={<></>}
			onCancel={() => {
				handleCollectionCancel()
			}}
		>
			{collectionModalView === 'rename' ? (
				<RenameCollection
					collection={collection}
					inputCollectionName={inputCollectionName}
					setInputCollectionName={setInputCollectionName}
					handleCollectionAction={handleCollectionAction}
					handleCollectionCancel={handleCollectionCancel}
					setIsCollectionModalOpen={setIsCollectionModalOpen}
					setCollectionModalView={setCollectionModalView}
				/>
			) : null}

			{collectionModalView === 'create' ? (
				<CreateCollection
					collection={collection}
					inputCollectionName={inputCollectionName}
					setInputCollectionName={setInputCollectionName}
					handleCollectionAction={handleCollectionAction}
					handleCollectionCancel={handleCollectionCancel}
					setIsCollectionModalOpen={setIsCollectionModalOpen}
					setCollectionModalView={setCollectionModalView}
				/>
			) : null}

			{collectionModalView === 'delete' ? (
				<DeleteCollection
					collection={collection}
					inputCollectionName={inputCollectionName}
					setInputCollectionName={setInputCollectionName}
					handleCollectionAction={handleCollectionAction}
					handleCollectionCancel={handleCollectionCancel}
					setIsCollectionModalOpen={setIsCollectionModalOpen}
					setCollectionModalView={setCollectionModalView}
				/>
			) : null}
		</Modal>
	)
}

export default CollectionModal
