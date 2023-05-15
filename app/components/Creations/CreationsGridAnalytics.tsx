import type { FC } from 'react'
import type Creation from '../../../interfaces/Creation'

import React, { useEffect, useContext } from 'react'
import AppContext from '../../../context/AppContext'
import emptyCreation from '../../../constants/emptyCreation'

import styles from '../../../styles/CreationsGrid.module.css'
import { Button } from 'antd'

interface CurrentCreationIndexProps {
	creationIndex: number
}

const CurrentCreationIndex: FC<CurrentCreationIndexProps> = ({
	creationIndex,
}) => {
	return (
		<span style={{ display: 'flex', justifyContent: 'space-between' }}>
			<b>{'Current Creation Index'}</b>
			<p>{creationIndex}</p>
		</span>
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
		<span style={{ display: 'flex', justifyContent: 'space-between' }}>
			<b>{'Current Creation Modal Creation'}</b>
			{isCurrentCreationModal ? <p>{currentCreationTextInput}</p> : null}
		</span>
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
		<section className={styles.creationAnalytics}>
			<span>{`Page ${size}`}</span>

			<CurrentCreationIndex creationIndex={currentCreationIndex} />

			<CurrentCreationModalCreation creation={currentCreationModalCreation} />

			{/* <span style={{ display: 'flex', justifyContent: 'space-between' }}>
				<b>{'Last Creation Earliest Time'}</b>
				<p>{timeAgo(lastCreationEarliestTime)}</p>
			</span> */}

			<span style={{ display: 'flex', justifyContent: 'space-between' }}>
				<b>{'Creations Data Length'}</b>
				<p>{creationsData.length}</p>
			</span>

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
		</section>
	)
}

export default CreationsGridAnalytics
