import type { FC, MouseEvent } from 'react'
import type Collection from '../interfaces/Collection'

import React, { useContext } from 'react'
import { useRouter } from 'next/navigation'

import AppContext from '../context/AppContext'

import Header from '../app/components/NavBar/Header'
import CreatorHeader from '../app/components/Creator/CreatorHeader'

import useGetCollections from '../hooks/useGetCollections'

import styles from '../styles/MyCollections.module.css'

import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { Typography, Button, Row, Spin, Col } from 'antd'
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />
const { Text } = Typography

const MyCollections: FC = () => {
	const context = useContext(AppContext)

	const userId =
		typeof context !== 'undefined' && context !== null && 'userId' in context
			? String(context.userId)
			: ''

	const router = useRouter()

	const {
		collections: myCollectionsData,
		isLoading,
		error
	} = useGetCollections()

	console.log({ myCollectionsData })

	const handleClickCollection = (
		e: MouseEvent<HTMLAnchorElement>,
		collectionId: string
	): void => {
		e.preventDefault()
		router.push(`/collection/${String(collectionId)}`)
	}

	const handleCreateCollection = (): void => {
		console.log('Create Collection Modal')
	}

	const isMyCollections =
		myCollectionsData !== null && !isLoading && typeof error === 'undefined'

	console.log({ myCollectionsData, isLoading, error })

	return (
		<>
			<main>
				<Header />
			</main>

			<CreatorHeader userId={userId} isMyCollectionsRoute={true} />
			{isMyCollections ? (
				<Col className={styles.collectionsWrapper}>
					<Row
						style={{
							display: 'flex',
							flexDirection: 'column'
						}}
					>
						{/* <Row className={styles.createCollectionButtonWrapper}>
							<Button
								className={styles.createCollectionButton}
								type='default'
								shape='round'
								icon={<PlusOutlined />}
								onClick={(e) => {
									handleCreateCollection()
								}}
							>
								<Text className={styles.createCollectionButtonText}>
									{'Create Collection'}
								</Text>
							</Button>
						</Row> */}
						<Row style={{ justifyContent: 'center' }}>
							{myCollectionsData.map((collection: Collection) => {
								return (
									<Button
										className={styles.collectionButton}
										key={collection._id}
										onClick={e => {
											handleClickCollection(e, collection._id)
										}}
									>
										<Text className={styles.collectionButtonText}>
											{collection.name}
										</Text>
									</Button>
								)
							})}
						</Row>
					</Row>
				</Col>
			) : (
				<Row className={styles.loading}>
					<Spin indicator={antIcon} />
				</Row>
			)}
		</>
	)
}

export default MyCollections
