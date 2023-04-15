import type { FC, MouseEvent } from 'react'
import type Collection from '../interfaces/Collection'

import React, { useContext } from 'react'
import { useRouter } from 'next/navigation'

import AppContext from '../context/AppContext'

import Header from '../app/components/NavBar/Header'
import CreatorHeader from '../app/components/Creator/CreatorHeader'

import useGetCollections from '../hooks/useGetCollections'

import styles from '../styles/MyCollections.module.css'

import { LoadingOutlined } from '@ant-design/icons'
import { Typography, Button, Row, Spin } from 'antd'
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
		error,
	} = useGetCollections()

	const handleClickCollection = (
		e: MouseEvent<HTMLAnchorElement>,
		collectionId: string
	): void => {
		e.preventDefault()
		router.push(`/collection/${String(collectionId)}`)
	}

	const isMyCollections =
		myCollectionsData !== null && !isLoading && error === false

	return (
		<>
			<main>
				<Header />
			</main>

			<CreatorHeader userId={userId} />
			{isMyCollections ? (
				<section className={styles.creationsWrapper}>
					{myCollectionsData.map((collection: Collection) => {
						return (
							<Button
								className={styles.collectionButton}
								key={collection._id}
								onClick={(e) => {
									handleClickCollection(e, collection._id)
								}}
							>
								<Text className={styles.collectionButtonText}>
									{collection.name}
								</Text>
							</Button>
						)
					})}
				</section>
			) : (
				<Row className={styles.loading}>
					<Spin indicator={antIcon} />
				</Row>
			)}
		</>
	)
}

export default MyCollections
