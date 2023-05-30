import type { FC } from 'react'
import React, { useContext, useCallback } from 'react'
import AppContext from '../../../context/AppContext'

import { PlusOutlined } from '@ant-design/icons'

import styles from '../../../styles/MyCollections.module.css'

import { Typography, Button, Row } from 'antd'
const { Text } = Typography

interface CreateCollectionButtonProps {
	appTheme: string
}

const CreateCollectionButton: FC<CreateCollectionButtonProps> = ({
	appTheme,
}) => {
	const context = useContext(AppContext)

	const setIsCollectionModalOpen =
		context?.setIsCollectionModalOpen ?? (() => {})
	const setCollectionModalView = context?.setCollectionModalView ?? (() => {})

	const handleCreateCollection = useCallback((): void => {
		setCollectionModalView('create')
		setIsCollectionModalOpen(true)
	}, [setCollectionModalView, setIsCollectionModalOpen])

	return (
		<Row className={styles.createCollectionButtonWrapper}>
			<Button
				className={styles.createCollectionButton}
				type='default'
				shape='round'
				size='large'
				icon={<PlusOutlined />}
				onClick={(e) => {
					handleCreateCollection()
				}}
			>
				<Text className={styles.createCollectionButtonText}>
					{'Create Collection'}
				</Text>
			</Button>
		</Row>
	)
}

export default CreateCollectionButton
