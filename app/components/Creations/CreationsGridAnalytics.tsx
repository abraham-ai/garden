import React from 'react'

import timeAgo from '../../../util/timeAgo'

import styles from '../../../styles/CreationsGrid.module.css'
import { Button } from 'antd'

interface CreationsGridAnalyticsTypes {
	size: number
	setSize: (size: number) => void
	mutate: () => void
	creationsData: any[]
	isLoadingMore: boolean
	isReachingEnd: boolean
	// handleLoadMore: () => void
	isRefreshing: boolean
	isEmpty: boolean
}

const CreationsGridAnalytics = ({
	size,
	setSize,
	mutate,
	creationsData,
	isLoadingMore,
	isReachingEnd,
	// handleLoadMore,
	isRefreshing,
	isEmpty,
}: CreationsGridAnalyticsTypes): JSX.Element => {
	return (
		<section className={styles.creationAnalytics} style={{ color: 'black' }}>
			<span>{`Page ${size}`}</span>
			{/* <span style={{ display: 'flex', justifyContent: 'space-between' }}>
				<b>{'Last Creation Earliest Time'}</b>
				<p>{timeAgo(lastCreationEarliestTime)}</p>
			</span> */}
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
