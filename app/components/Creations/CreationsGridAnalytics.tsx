import type { FC } from 'react'
import type Creation from '../../../interfaces/Creation'

import React, { useEffect, useContext } from 'react'
import AppContext from '../../../context/AppContext'
import emptyCreation from '../../../constants/emptyCreation'
import timeAgo from '../../../util/timeAgo'

import styles from '../../../styles/CreationsGrid.module.css'
import {
	Button,
	Row,
	Col,
	Tag,
	Card,
	Typography,
	ConfigProvider,
	theme,
} from 'antd'
const { Text } = Typography

const themeDark = { algorithm: theme.darkAlgorithm }
const themeDefault = { algorithm: theme.defaultAlgorithm }

interface CreationsTableProps {
	creations: Creation[]
}

const CreationsTable: FC<CreationsTableProps> = ({ creations }) => {
	return (
		<Col style={{ maxHeight: 300, overflowX: 'hidden', overflowY: 'scroll' }}>
			{creations.map((creation, index) => {
				const timeAgoCreatedAt = timeAgo(Date.parse(creation.createdAt))

				return (
					<Col key={index}>
						<Row>
							<Text code>{index}</Text>

							<Text>{timeAgoCreatedAt}</Text>
							<Tag>
								<p>{creation._id}</p>
							</Tag>
						</Row>
					</Col>
				)
			})}
		</Col>
	)
}

interface CurrentCreationIndexProps {
	creationIndex: number
}

const CurrentCreationIndex: FC<CurrentCreationIndexProps> = ({
	creationIndex,
}) => {
	return (
		<Col style={{ display: 'flex', justifyContent: 'space-between' }}>
			<Text>{'Current Creation Index'}</Text>
			<Text>{creationIndex}</Text>
		</Col>
	)
}

interface CurrentCreationModalCreationProps {
	creation: Creation
}

const CurrentCreationModalCreation: FC<CurrentCreationModalCreationProps> = ({
	creation,
}) => {
	const currentCreationTextInput = creation?.task?.config?.text_input

	const isCurrentCreationModal = currentCreationTextInput !== ''

	console.log({ currentCreationTextInput })

	return (
		<Col style={{ display: 'flex', justifyContent: 'space-between' }}>
			<Text>{'Current Creation Modal Creation'}</Text>
			{isCurrentCreationModal ? <Text>{currentCreationTextInput}</Text> : null}
		</Col>
	)
}

interface CreationsGridAnalyticsProps {
	size: number
	setSize: (size: number) => void
	mutate: () => void
	isLoadingMore: boolean
	isReachingEnd: boolean
	// handleLoadMore: () => void
	isRefreshing: boolean
	isEmpty: boolean
}

const CreationsGridAnalytics: FC<CreationsGridAnalyticsProps> = ({
	size,
	setSize,
	mutate,
	isLoadingMore,
	isReachingEnd,
	// handleLoadMore,
	isRefreshing,
	isEmpty,
}) => {
	const context = useContext(AppContext)
	const creationsData = context?.creationsData ?? []
	const currentCreationIndex = context?.currentCreationIndex ?? 0
	const currentCreationModalCreation =
		context?.currentCreationModalCreation ?? emptyCreation

	console.log({ currentCreationIndex })
	console.log({ currentCreationModalCreation })
	console.log({ creationsData })

	useEffect(() => {
		console.log('creationsData changed:', creationsData)
	}, [creationsData])

	return (
		<ConfigProvider theme={themeDark}>
			<Card className={styles.creationAnalytics}>
				<Text>{`Page ${size}`}</Text>

				<CurrentCreationIndex creationIndex={currentCreationIndex} />

				<CurrentCreationModalCreation creation={currentCreationModalCreation} />

				{/* <span style={{ display: 'flex', justifyContent: 'space-between' }}>
				<b>{'Last Creation Earliest Time'}</b>
				<p>{timeAgo(lastCreationEarliestTime)}</p>
			</span> */}

				<Col style={{ display: 'flex', justifyContent: 'space-between' }}>
					<Text>{'Creations Data Length'}</Text>
					<Text>{creationsData.length}</Text>
				</Col>

				<CreationsTable creations={creationsData} />

				<div style={{ display: 'flex', flexDirection: 'column' }}>
					<span className={styles.loadingState}>
						{`showing ${size} page(s) of 
            ${isLoadingMore ? '...' : creationsData.length}
            creation(s) `}
					</span>

					<span style={{ display: 'flex' }}>
						<Button
							disabled={isLoadingMore || isReachingEnd}
							// onClick={() => {
							//     handleLoadMore()
							// }}
						>
							{isLoadingMore
								? 'Loading...'
								: isReachingEnd
								? 'no more creations'
								: 'load more'}
						</Button>
						<Button
							disabled={isRefreshing}
							onClick={() => {
								mutate()
							}}
						>
							{isRefreshing ? 'refreshing...' : 'refresh'}
						</Button>
						<Button
							disabled={!size}
							onClick={() => {
								setSize(0)
							}}
						>
							{'Clear'}
						</Button>
					</span>
				</div>
				{isEmpty ? <p>No creations found.</p> : null}
			</Card>
		</ConfigProvider>
	)
}

export default CreationsGridAnalytics
