'use client'

import type { FC } from 'react'
import type CreatorProfile from '../../../interfaces/CreatorProfile'
import type Creation from '../../../interfaces/Creation'
import React, { useState, useRef, useCallback, useContext } from 'react'
import AppContext from '../../../context/AppContext'
import useSWRInfinite from 'swr/infinite'

import timeAgo from '../../../util/timeAgo'
import emptyCreatorProfile from '../../../constants/emptyCreatorProfile'
import CreationsMasonry from './CreationsMasonry'
import CreationsGridAnalytics from './Analytics/CreationsGridAnalytics'

import { LoadingOutlined } from '@ant-design/icons'
import { Spin, Row } from 'antd'

import styles from '../../../styles/CreationsGrid.module.css'

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

interface CreationsGridProps {
	creatorProfile: CreatorProfile
	appWidth: number
	collectionId?: string
}

const CreationsGrid: FC<CreationsGridProps> = ({
	creatorProfile,
	appWidth,
	collectionId,
}) => {
	const [isScrollAnalytics, setIsScrollAnalytics] = useState<boolean>(false)

	const [generators, setGenerators] = useState<string | string>('create')
	const [limit, setLimit] = useState<number>(10)

	const username = creatorProfile?.user?.username ?? ''

	console.log({ creatorProfile })
	console.log({ username })

	const observer = useRef<IntersectionObserver | null>(null)

	const context = useContext(AppContext)

	const latestCreationTime = context?.latestCreationTime ?? ''
	// const setEarliestCreationTime = context?.setEarliestCreationTime ?? (() => {})
	const setLatestCreationTime = context?.setLatestCreationTime ?? (() => {})
	const setCurrentCreationIndex = context?.setCurrentCreationIndex ?? (() => {})
	const setCurrentCreationModalCreation =
		context?.setCurrentCreationModalCreation ?? (() => {})

	const handleCreationClick = (creation: Creation, creationIndex): void => {
		const index = dataArray.findIndex((c) => c._id === creation._id)
		if (index !== -1) {
			setCurrentCreationIndex(creationIndex)
			setCurrentCreationModalCreation(creation)
		}
	}

	const fetcher = async (url: string): Promise<Creation[]> => {
		// console.log({ url })
		const res = await fetch(url)
		const data = await res.json()
		// console.log({ data })
		return data
	}

	const getKey = useCallback(
		(pageIndex, previousPageData): string | null => {
			// console.log('getKey')

			let adjustedLatestCreationTime = ''
			let timeAgoLatestTime = ''

			if (previousPageData != null && previousPageData.length > 0) return null

			let url = `/api/creations?limit=${limit}&page=${String(
				pageIndex
			)}&username=${username}&generators=${generators}&collectionId=${String(
				collectionId
			)}&earliestTime=${''}&latestTime=${adjustedLatestCreationTime}`

			if (pageIndex === 0 && previousPageData != null) {
				return null
			} else if (pageIndex === 0 && previousPageData === null) {
				// console.log({ url })
				// console.log({ pageIndex })
				// console.log({ previousPageData })
				// console.log({ dataArray })
				return url
			} else if (pageIndex !== 0) {
				// console.log({ previousPageData })
				// console.log({ pageIndex })
				// console.log({ dataArray })

				const prevPageCreatedAt =
					(previousPageData?.[previousPageData.length - 1]?.createdAt !== '' &&
						typeof previousPageData?.[previousPageData.length - 1]
							?.createdAt !== 'undefined') ??
					''
				// console.log({ prevPageCreatedAt })

				adjustedLatestCreationTime = addSecondsToDate(
					previousPageData?.[previousPageData.length - 1]?.createdAt,
					10
				)
				timeAgoLatestTime = timeAgo(adjustedLatestCreationTime)
				setLatestCreationTime(adjustedLatestCreationTime)

				console.log({ latestCreationTime })
				console.log(
					`latestCreationTime: ${String(timeAgo(latestCreationTime))}`
				)
				console.log({ timeAgoLatestTime })
				console.log({ adjustedLatestCreationTime })
				console.log('pageIndex:', pageIndex)
				console.log('previousPageData:', previousPageData)

				url = `/api/creations?limit=${limit}&page=${pageIndex}&username=${username}&generators=${generators}&earliestTime=${''}&latestTime=${adjustedLatestCreationTime}`

				// console.log({ url })

				return url
			} else {
				return null
			}
		},
		[username, generators, limit]
	)

	const { data, mutate, size, setSize, isValidating, isLoading, error } =
		useSWRInfinite(getKey, fetcher)
	// console.log({ data, size })

	const dataArray = data != null ? data.flat() : []
	// console.log({ dataArray, size })

	const isLoadingMore =
		isLoading ||
		(size > 0 && data != null && typeof data[size - 1] === 'undefined')
	const isEmpty = data?.[0]?.length === 0
	const isReachingEnd =
		isEmpty || (data != null && data[data.length - 1]?.length < limit)
	const isRefreshing = isValidating && data != null && data.length === size

	// console.log({ isLoading, isReachingEnd })

	const addSecondsToDate = (date, seconds): string => {
		if (date === '') {
			return ''
		}
		const newDateTime = new Date(date).getTime() - seconds
		const newDate = new Date(newDateTime).toISOString()
		return newDate
	}

	const lastElementRef = useCallback(
		(node) => {
			// console.log('isLoadingMore:', isLoadingMore)
			// console.log('isReachingEnd:', isReachingEnd)
			// console.log('node:', node)

			if (isLoadingMore || isReachingEnd) return
			if (observer.current != null) observer.current.disconnect()
			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting && !isReachingEnd) {
					setSize((prevSize) => {
						if (!isReachingEnd) {
							return prevSize + 1
						}
						return prevSize
					})
				}
			})
			if (node) observer.current.observe(node)
		},
		[isLoadingMore, isReachingEnd]
	)

	const isCreator =
		typeof creatorProfile !== 'undefined' &&
		creatorProfile?.user?.username !== ''

	return (
		<>
			{isScrollAnalytics ? (
				<CreationsGridAnalytics
					creationsData={dataArray}
					size={size}
					isLoadingMore={isLoadingMore}
					isReachingEnd={isReachingEnd}
					isRefreshing={isRefreshing}
					mutate={mutate}
					setSize={setSize}
					isEmpty={isEmpty}
				/>
			) : null}

			<CreationsMasonry
				creationsData={dataArray}
				appWidth={appWidth}
				onCreationClick={handleCreationClick}
				creatorProfile={isCreator ? creatorProfile : emptyCreatorProfile}
			/>

			<div ref={lastElementRef} className={styles.loadMore}>
				<Spin indicator={antIcon} />
			</div>
		</>
	)
}

export default CreationsGrid
