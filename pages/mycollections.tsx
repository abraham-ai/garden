import type { FC, MouseEvent } from 'react'
import type { Collection } from '../interfaces/Collection'

import React, { useContext } from 'react'
import { useRouter } from 'next/router'

import AppContext from '../context/AppContext'

import Header from '../app/components/NavBar/Header'
import CreatorHeader from '../app/components/Creator/CreatorHeader'

import useGetCollections from '../hooks/useGetCollections'

import abbreviateAddress from '../util/abbreviateAddress'

import styles from '../styles/MyCollections.module.css'

import { LoadingOutlined } from '@ant-design/icons'
import { Typography, Button, Row, Spin } from 'antd'
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />
const { Text } = Typography

const MyCollections: FC = () => {
	const context = useContext<AppContext | undefined>(AppContext)
	const userId = context && 'userId' in context ? String(context.userId) : ''

	const router = useRouter()

	let displayAddress = ''
	if (typeof userId === 'string') {
		displayAddress = abbreviateAddress(userId)
	}

	const myCollectionsData = useGetCollections()

	const handleClickCollection = (
		e: MouseEvent<HTMLAnchorElement>,
		collectionId: string
	): JSX.Element => {
		e.preventDefault()
		router.push(`/collection/${collectionId}`)
	}

	return (
		<>
			<main>
				<Header />
			</main>

			<CreatorHeader userId={userId} />
			{typeof myCollectionsData !== 'undefined' &&
			myCollectionsData !== null ? (
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
