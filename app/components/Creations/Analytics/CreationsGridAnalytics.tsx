import type { FC } from 'react'
import type Creation from '../../../../interfaces/Creation'

import React, { useEffect, useContext } from 'react'
import AppContext from '../../../../context/AppContext'
import Image from 'next/image'

import timeAgo from '../../../../util/timeAgo'
import emptyCreation from '../../../../constants/emptyCreation'

import CreationsTable from './CreationsTable'
import styles from '../../../../styles/CreationsGrid.module.css'
import { Button, Col, Card, Typography, ConfigProvider, theme } from 'antd'
const { Text } = Typography

const themeDark = { algorithm: theme.darkAlgorithm }
const themeDefault = { algorithm: theme.defaultAlgorithm }

interface CurrentCreationIndexProps {
	creationIndex: number
}

const CurrentCreationIndex: FC<CurrentCreationIndexProps> = ({
	creationIndex,
}) => {
	return (
		<Col style={{ display: 'flex', justifyContent: 'space-between' }}>
			<Text strong>{'Current Creation Index'}</Text>
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
	const textInput = creation?.task?.config?.text_input

	const isCurrentCreationModal = textInput !== ''

	// console.log(isCurrentCreationModal ? { textInput } : 'Creation Modal Empty')

	return (
		<Col style={{ display: 'flex', justifyContent: 'space-between' }}>
			{isCurrentCreationModal ? (
				<Image
					alt={textInput}
					src={creation.thumbnail}
					width={50}
					height={50}
				/>
			) : null}
			<Col>
				<Text strong>{'Current Creation Modal Creation'}</Text>
				{isCurrentCreationModal ? <Text>{textInput}</Text> : null}
			</Col>
		</Col>
	)
}

interface CreationsGridAnalyticsProps {
	creationsData: Creation[]
	size: number
	setSize: (size: number) => void
	mutate: () => void
	isLoadingMore: boolean
	// handleLoadMore: () => void
	isRefreshing: boolean
	isEmpty: boolean
}

const CreationsGridAnalytics: FC<CreationsGridAnalyticsProps> = ({
	creationsData,
	size,
	setSize,
	mutate,
	isLoadingMore,
	// handleLoadMore,
	isRefreshing,
	isEmpty,
}) => {
	const context = useContext(AppContext)
	const latestCreationTime = context?.latestCreationTime ?? 0
	const currentCreationIndex = context?.currentCreationIndex ?? 0
	const currentCreationModalCreation =
		context?.currentCreationModalCreation ?? emptyCreation

	const isCurrentCreationModalCreationEmpty =
		currentCreationModalCreation._id === ''

	// console.log({ currentCreationIndex })
	// console.log(
	// 	isCurrentCreationModalCreationEmpty
	// 		? 'Creation Modal Emtpy'
	// 		: { currentCreationModalCreation }
	// )
	// console.log({ creationsData })

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
					<Text strong>{'Latest Creation Date'}</Text>
					<Text>{timeAgo(latestCreationTime)}</Text>
				</Col>

				<Col style={{ display: 'flex', justifyContent: 'space-between' }}>
					<Text strong>{'Creations Data Length'}</Text>
					<Text>{creationsData.length}</Text>
				</Col>

				<div style={{ display: 'flex', flexDirection: 'column' }}>
					<span className={styles.loadingState}>
						{`showing ${size} page(s) of 
            ${isLoadingMore ? '...' : creationsData.length}
            creation(s) `}
					</span>

					<span style={{ display: 'flex' }}>
						<Button
							disabled={isLoadingMore}
							// onClick={() => {
							//     handleLoadMore()
							// }}
						>
							{isLoadingMore ? 'Loading...' : 'load more'}
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
				{isEmpty ? <p>{'End of the creations.'}</p> : null}
				<CreationsTable creations={creationsData} />
			</Card>
		</ConfigProvider>
	)
}

export default CreationsGridAnalytics
