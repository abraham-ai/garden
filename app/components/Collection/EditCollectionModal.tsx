import React, { useState, useContext } from 'react'
import AppContext from '../../../context/AppContext'
import type { FC } from 'react'

import styles from '../../../styles/CreationSaveModal.module.css'

import { Row, Button, Typography, Modal, Input } from 'antd'
const { Text } = Typography

const EditCollectionModal: FC = () => {
	// const context = useContext(AppContext)

	// const [isRenameCollection, setIsRenameCollection] = useState(false)
	// const [inputCollectionName, setInputCollectionName] = useState([])

	// const setIsEditCollectionModalOpen =
	// 	context?.setIsSaveCreationModalOpen != null
	// 		? context.setIsSaveCreationModalOpen
	// 		: noop

	return <></>
	// <Modal
	// 	open={false}
	// 	footer={<></>}
	// 	onCancel={() => {
	// 		setIsEditCollectionModalOpen(false)
	// 	}}
	// >
	// 	<article className={styles.modalView2}>
	// 		{isRenameCollection ? (
	// 			<>
	// 				<Row className={styles.row}>
	// 					<Text className={styles.textBold}>{'Rename Collection:'}</Text>
	// 				</Row>

	// 				<Input
	// 					placeholder={currentRenameCollection}
	// 					onChange={(e) => {
	// 						setInputCollectionName(e.target.value)
	// 					}}
	// 				/>
	// 				<Button
	// 					type={'primary'}
	// 					shape='round'
	// 					className={styles.buttonPrimary}
	// 					disabled={inputCollectionName === ''}
	// 					onClick={() => {
	// 						handleRenameCollectionName(
	// 							currentRenameCollection,
	// 							currentCreationModalCreation?._id ?? null
	// 						).catch((error) => {
	// 							console.error('Error renaming collection:', error)
	// 						})
	// 					}}
	// 				>
	// 					{'Rename'}
	// 				</Button>
	// 			</>
	// 		) : (
	// 			<>
	// 				<Row>
	// 					<Text className={styles.textBold}>{'Create new collection'}</Text>
	// 				</Row>

	// 				<Input
	// 					placeholder='Name'
	// 					onChange={(e) => {
	// 						setInputCollectionName(e.target.value)
	// 					}}
	// 				/>

	// 				<Button
	// 					type={'primary'}
	// 					shape='round'
	// 					className={styles.buttonPrimary}
	// 					disabled={inputCollectionName === ''}
	// 					onClick={() => {
	// 						handleCollectionAction(
	// 							'create',
	// 							null,
	// 							currentCreationModalCreation?._id ?? null
	// 						).catch((error) => {
	// 							console.error('Error creating collection:', error)
	// 						})
	// 					}}
	// 				>
	// 					{'Create'}
	// 				</Button>
	// 			</>
	// 		)}
	// 	</article>
	// </Modal>
}

export default EditCollectionModal
