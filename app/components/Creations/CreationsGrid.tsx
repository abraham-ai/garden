'use client'

import type { FC } from 'react'
import type CreatorProfile from '../../../interfaces/CreatorProfile'
import type Creation from '../../../interfaces/Creation'
import React, { useState, useRef, useCallback, useContext } from 'react'
import AppContext from '../../../context/AppContext'
import useSWRInfinite from 'swr/infinite'

import axios from 'axios'
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

const fetchCreations = async (pageIndex, previousPageData, earliestTime) => {
	if (previousPageData && !previousPageData.length) return []

	const params = earliestTime ? { earliestTime, limit: 10 } : {}

	const { data } = await axios.get('/api/creations', { params })

	return data
}

const CreationsGrid: FC<CreationsGridProps> = ({
	creatorProfile,
	appWidth,
	collectionId = '',
}) => {
	const [isScrollAnalytics, setIsScrollAnalytics] = useState<boolean>(false)

	const [generators, setGenerators] = useState<string | string>('create')
	const [limit, setLimit] = useState<number>(10)

	const [latestCreationTime, setLatestCreationTime] = useState<string>('')

	const username = creatorProfile?.user?.username ?? ''

	const observer = useRef<IntersectionObserver | null>(null)

	const context = useContext(AppContext)

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

			console.log({ previousPageData })
			console.log({ pageIndex })

			// && !previousPageData.length > 0

			const url = `/api/creations?limit=${limit}&page=${String(
				pageIndex
			)}&username=${username}&generators=${generators}&collectionId=${String(
				collectionId
			)}&earliestTime=${''}&latestTime=${adjustedLatestCreationTime}`

			if (pageIndex === 0) {
				return `/api/creations?limit=${limit}&page=${pageIndex}&username=${username}&generators=${generators}&collectionId=${collectionId}&earliestTime=&latestTime=${adjustedLatestCreationTime}`
			} else if (
				previousPageData == null ||
				previousPageData.length === 0 ||
				previousPageData?.[0]?.createdAt == null
			) {
				return null
			} else {
				// 		console.log({ latestCreationTime })
				// 		console.log(
				// 			`latestCreationTime: ${String(timeAgo(latestCreationTime))}`
				// 		)
				// 		console.log({ timeAgoLatestTime })
				// 		console.log({ adjustedLatestCreationTime })
				// 		console.log('pageIndex:', pageIndex)
				// 		console.log('previousPageData:', previousPageData)

				const prevPageCreatedAt =
					previousPageData[previousPageData.length - 1]?.createdAt || ''
				adjustedLatestCreationTime = addSecondsToDate(prevPageCreatedAt, 10)

				return `/api/creations?limit=${limit}&page=${pageIndex}&username=${username}&generators=${generators}&earliestTime=&latestTime=${adjustedLatestCreationTime}`
			}
		},
		[username, generators, limit]
	)

	const { data, mutate, size, setSize, isValidating, isLoading, error } =
		useSWRInfinite(
			async (index, previousPageData) => {
				// If it's the first page, we don't need the earliestTime.
				if (index === 0) {
					return await fetchCreations(index, previousPageData)
				}

				// For the other pages, we fetch data using the earliestTime from the last creation of the previous page.
				const lastCreation = previousPageData[previousPageData.length - 1]
				return await fetchCreations(index, previousPageData, lastCreation.time)
			},
			{
				keepPreviousData: true,
				// fallbackData: props.data,
			}
		)
	console.log({ data, size })

	const dataArray = data != null ? data.flat() : []
	console.log({ dataArray, size })
	console.log(dataArray.length)

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

	const lastElementRef = useCallback((node) => {
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
	}, [])

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
