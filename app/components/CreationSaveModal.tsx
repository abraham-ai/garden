import React, { useState, useEffect, useContext, useMemo } from 'react'
import type Collection from '../../interfaces/Collection'
import type { FC } from 'react'
import type Creation from '../../interfaces/Creation'

import Link from 'next/link'

import AppContext from '../../context/AppContext'

import axios from 'axios'

import useGetCollections from '../../hooks/useGetCollections'

import { Modal, Button, Input, notification, Typography, Row, Col } from 'antd'
import type { NotificationPlacement } from 'antd/es/notification/interface'

import { BiLeftArrowAlt } from 'react-icons/bi'
import { MdOutlineAdd } from 'react-icons/md'

import styles from '../../styles/CreationSaveModal.module.css'

const { Text } = Typography

const CreationSaveModal: FC = () => {
	const [inputCollectionName, setInputCollectionName] = useState('')

	const [isRenameCollection, setIsRenameCollection] = useState(false)
	const [currentRenameCollection, setCurrentRenameCollection] = useState('')
	const [currentSavedCollection, setCurrentSavedCollection] =
		useState<Collection | null>(null)
	const [createdCollectionName, setCreatedCollectionName] = useState<string>('')

	const [api, contextHolder] = notification.useNotification()

	const context = useContext(AppContext)
	const collections =
		context != null && context.collections != null ? context.collections : []

	const setCollections = useMemo(
		() =>
			context != null && context.setCollections
				? context.setCollections
				: () => null,
		[context]
	)

	const collectionModalView = context?.collectionModalView
	const setCollectionModalView = (value: number): void => {
		context?.setCollectionModalView(value)
	}

	const noop = (): void => {}

	const currentCreationModalCreation = context?.currentCreationModalCreation

	const isSaveCreationModalOpen =
		context?.isSaveCreationModalOpen != null
			? context.isSaveCreationModalOpen
			: false
	const setIsSaveCreationModalOpen =
		context?.setIsSaveCreationModalOpen != null
			? context.setIsSaveCreationModalOpen
			: noop

	// const inputCollectionRef = useRef<InputRef>(null)

	const collectionsData = useGetCollections()

	// console.log(collections)
	// console.log(collectionsData)
	// console.log(collectionModalView)
	console.log({ currentSavedCollection })
	console.log({ createdCollectionName })

	const createNotification = (placement: NotificationPlacement): void => {
		api.info({
			message: (
				<Text>
					{`Creation saved to ${currentSavedCollection?._id ?? ''} collection `}
					<Link
						href={`/collection/${String(currentSavedCollection?._id ?? '')}`}
						style={{ margin: '0 5px' }}
					>
						{String(currentSavedCollection?.name ?? '')}
					</Link>
					{`Collection!`}
				</Text>
			),
			description:
				'View your collection in the Collections tab or on your profile page.',
			placement,
		})
	}

	const saveNotification = async (
		placement: NotificationPlacement
	): Promise<void> => {
		await new Promise((resolve) => {
			console.log('save Notification')
			console.log(currentSavedCollection)
			const savedCollectionPropsArray =
				currentSavedCollection != null
					? Object.keys(currentSavedCollection as object)
					: []

			if (
				typeof currentSavedCollection !== 'undefined' &&
				savedCollectionPropsArray.length > 0
			) {
				setIsSaveCreationModalOpen(false)
				api.info({
					message: (
						<>
							<Text>
								{`Creation saved to`}
								<Link
									href={`/collection/${String(currentSavedCollection?._id)}`}
									style={{ margin: '0 5px' }}
								>
									{String(currentSavedCollection?.name)}
								</Link>
								{`Collection!`}
							</Text>
						</>
					),
					description:
						'View your collection in the Collections tab or on your profile page.',
					placement,
					duration: 3,
				})
				setTimeout(() => {
					resolve(undefined)
				}, 1000) // 3000 ms = 3 seconds, same as the duration of the notification
			} else {
				resolve(undefined)
			}
		})
	}

	useEffect(() => {
		// console.log('USE-EFFECT')
		// console.log({collectionsData})
		if (
			Array.isArray(collectionsData.collections) &&
			collectionsData.collections.length > 0
		) {
			// console.log('SET COLLECTIONS!')
			setCollections(collectionsData.collections)
		}
	}, [collectionsData, setCollections])

	useEffect(() => {
		const savedCollectionPropsArray =
			currentSavedCollection != null ? Object.keys(currentSavedCollection) : []

		if (
			typeof currentSavedCollection !== 'undefined' &&
			savedCollectionPropsArray.length > 0
		) {
			console.log(currentSavedCollection)
			handleSaveModalCleanUp().catch((error) => {
				console.error(error)
				console.error('Error handling saveModalCleanUp')
			})
		}
	}, [currentSavedCollection])

	useEffect(() => {
		if (
			typeof createdCollectionName !== 'undefined' &&
			createdCollectionName !== ''
		) {
			handleCollectionAction(
				'create',
				null,
				currentCreationModalCreation?._id ?? null
			).catch((error) => {
				console.error('Error creating collection:', error)
			})
		}
	}, [createdCollectionName])

	const handleFirstModal = (): void => {
		console.log('handleFirstModal')
		setCollectionModalView(1)
	}

	const handleCollectionAction = async (
		actionType: 'create' | 'save',
		collectionId: string | null,
		creationId: string | null
	): Promise<void> => {
		try {
			let endpoint = ''
			let requestData = {}

			if (actionType === 'create') {
				endpoint = '/api/collection/create'
				requestData = {
					collectionName: inputCollectionName,
					creationId,
				}
			} else if (actionType === 'save') {
				endpoint = '/api/collection/save'
				requestData = {
					collectionId,
					creationId,
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

	const handleSaveModalCleanUp = async (): Promise<void> => {
		// setModalOpen(false)
		setCollectionModalView(0)
		// console.log({ currentSavedCollection })
		// setInputCollectionName('')

		if (
			typeof currentSavedCollection !== 'undefined' &&
			currentSavedCollection != null
		) {
			// console.log(currentSavedCollection)
			try {
				await saveNotification('bottom')
			} catch (error) {
				console.error('Error handling saveNotification:', error)
			}

			setCurrentSavedCollection(null)
		}
	}

	const handleCreateModalCleanUp = (): void => {
		setIsSaveCreationModalOpen(false)
		setCollectionModalView(0)
		// setInputCollectionName('')
		createNotification('bottom')
	}

	const handleRenameCollectionName = async (
		inputCollectionName: string,
		collectionId: string | null
	): Promise<void> => {
		try {
			await axios.post('/api/collection/rename', {
				inputCollectionName,
				collectionId,
			})
		} catch (error) {
			console.error('Error renaming collection:', error)
		}
	}

	const SaveToCollectionList =
		Array.isArray(collections) && collections.length > 0 ? (
			collections.map((collection: Collection, i: number) => {
				return (
					<Col key={i}>
						<Row className={styles.row}>
							<Button
								shape='round'
								onClick={() => {
									handleCollectionAction(
										'save',
										collection._id,
										currentCreationModalCreation?._id ?? null
									).catch((error) => {
										console.error('Error saving to collection:', error)
									})
								}}
								className={styles.button}
							>
								{collection.name}
							</Button>
						</Row>
					</Col>
				)
			})
		) : (
			<Col>
				<Text className={styles.textNotification}>
					{'You don’t have any collections yet.'}
				</Text>
			</Col>
		)

	const handleSetCurrentSavedCollection = (inputCollectionName): void => {
		setCreatedCollectionName(inputCollectionName)
	}

	const CreateCollectionButton = (
		<Button
			shape='round'
			type='primary'
			icon={
				<span
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						marginRight: 10,
					}}
				>
					<MdOutlineAdd style={{ fontSize: '1.3rem' }} />
				</span>
			}
			onClick={() => {
				handleFirstModal()
			}}
			className={styles.buttonPrimary}
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			{'Create a new collection'}
		</Button>
	)

	// console.log({ currentCreationModalCreation })

	console.log(currentSavedCollection)
	// console.log(collections)

	return (
		<Modal
			open={isSaveCreationModalOpen}
			footer={<></>}
			onCancel={() => {
				setIsSaveCreationModalOpen(false)
			}}
			style={{ zIndex: 200 }}
		>
			<div style={{ padding: 20, borderRadius: 20 }}>
				<section className={styles.modalView1}>
					{collectionModalView === 0 ? (
						<article className={styles.modalView1}>
							{collections.length > 0 ? (
								<>
									<Text className={styles.saveModalCollectionTitle}>
										{'Your Collections:'}
									</Text>

									{SaveToCollectionList}
									{CreateCollectionButton}
								</>
							) : (
								<>
									<Text className={styles.textNotification}>
										{'You don’t have any collections yet.'}
									</Text>
									{CreateCollectionButton}
								</>
							)}
							{/* <Button
								shape='round'
								type='primary'
								icon={
									<span
										style={{
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
											marginRight: 10,
										}}
									>
										<MdOutlineAdd style={{ fontSize: '1.3rem' }} />
									</span>
								}
								onClick={() => {
									handleFirstModal()
								}}
								className={styles.buttonPrimary}
								style={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
								}}
							>
								{'Add to a new collection'}
							</Button> */}
						</article>
					) : null}

					{collectionModalView === 1 ? (
						<article className={styles.modalView2}>
							{isRenameCollection ? (
								<>
									<Row className={styles.row}>
										<Button
											type='link'
											className={styles.buttonLink}
											onClick={() => {
												setCollectionModalView(0)
											}}
										>
											<BiLeftArrowAlt size={'1.2rem'} />
										</Button>
										<Text className={styles.textBold}>
											{`Rename ${String(collection?.name)} Collection:`}
										</Text>
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
							) : (
								<>
									<Row>
										<Button
											type='link'
											className={styles.buttonLink}
											onClick={() => {
												setCollectionModalView(0)
											}}
										>
											<BiLeftArrowAlt size={'1rem'} />
										</Button>

										<Text className={styles.textBold}>
											{'Create new collection'}
										</Text>
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
										disabled={inputCollectionName === ''}
										onClick={() => {
											handleSetCurrentSavedCollection(inputCollectionName)
										}}
									>
										{'Create'}
									</Button>
								</>
							)}
						</article>
					) : null}
				</section>
			</div>
			{contextHolder}
		</Modal>
	)
}

export default CreationSaveModal
