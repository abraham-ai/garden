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

	const params = earliestTime ? { earliestTime, limit: 5 } : {}

	const { data } = await axios.get('/api/creations', { params })

	return data
}

const CreationsGrid: FC<CreationsGridProps> = ({
	creatorProfile,
	appWidth,
	collectionId = '',
}) => {
	const [isScrollAnalytics, setIsScrollAnalytics] = useState<boolean>(false)

	const [generators, setGenerators] = useState<string>('create')
	const [limit, setLimit] = useState<number>(5)

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

	const addSecondsToDate = (date, seconds): string => {
		if (date === '') {
			return ''
		}
		const newDateTime = new Date(date).getTime() - seconds
		const newDate = new Date(newDateTime).toISOString()
		return newDate
	}

	// const getKey = useCallback(
	// 	(pageIndex, previousPageData) => {
	// 		console.log({ pageIndex, previousPageData })

	// 		if (pageIndex === 0) {
	// 			const url = `/api/creations?limit=${limit}&page=${pageIndex}&username=${username}&generators=${generators}&collectionId=${collectionId}&earliestTime=&latestTime=`
	// 			console.log({ url })
	// 			return url
	// 		} else if (
	// 			previousPageData == null ||
	// 			previousPageData.length === 0 ||
	// 			previousPageData?.[0]?.createdAt == null
	// 		) {
	// 			return null
	// 		} else {
	// 			const prevPageCreatedAt =
	// 				previousPageData[previousPageData.length - 1]?.createdAt || ''
	// 			const adjustedEarliestCreationTime = addSecondsToDate(
	// 				prevPageCreatedAt,
	// 				-1
	// 			)

	// 			const url = `/api/creations?limit=${limit}&page=${pageIndex}&username=${username}&generators=${generators}&earliestTime=${adjustedEarliestCreationTime}&latestTime=`
	// 			console.log({ url })
	// 			return url
	// 		}
	// 	},
	// 	[username, generators, limit]
	// )

	const fetcher = async (url: string) => {
		const response = await axios.get(url)
		console.log({ response })
		return response.data
	}

	const getKey = useCallback(
		(index, previousPageData) => {
			console.log({ index, previousPageData })
			let lastCreationCreatedAt = ''

			if (previousPageData && !previousPageData.length) return null

			if (index === 0) {
				const url = `/api/creations?limit=${10}&page=0&username=&generators=create&earliestTime=&latestTime=`
				console.log({ url })
				return url
			} else if (index > 0) {
				if (previousPageData && previousPageData.length > 0) {
					lastCreationCreatedAt =
						previousPageData[previousPageData.length - 1]?.createdAt ?? ''
				}

				console.log({ lastCreationCreatedAt })

				const url = `/api/creations?limit=${limit}&page=${index}&username=${username}&generators=${generators}&earliestTime=${addSecondsToDate(
					lastCreationCreatedAt,
					1
				)}&latestTime=`
				console.log({ url })
				return url
			}
		},
		[username, generators, limit]
	)

	const { data, mutate, size, setSize, isValidating, isLoading, error } =
		useSWRInfinite(getKey, fetcher, {
			keepPreviousData: true,
		})

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

	const lastElementRef = (node) => {
		if (isLoadingMore) return
		if (observer.current != null) observer.current.disconnect()
		observer.current = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting) {
				setSize((prevSize) => {
					return prevSize + 1
				})
			}
		})
		if (node) observer.current.observe(node)
	}

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
