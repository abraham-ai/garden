'use client'

import type { FC } from 'react'
import type Creation from '../../../interfaces/Creation'
import React, {
	useState,
	useEffect,
	useRef,
	useCallback,
	useMemo,
	useContext,
} from 'react'
import AppContext from '../../../context/AppContext'
import useSWRInfinite from 'swr/infinite'

import useWindowDimensions from '../../../hooks/useWindowDimensions'
import getUniqueCreations from '../../../util/getUniqueCreations'
import CreationsMasonry from './CreationsMasonry'
import CreationsGridAnalytics from './Analytics/CreationsGridAnalytics'

import { LoadingOutlined } from '@ant-design/icons'
import { Spin, Row } from 'antd'

import styles from '../../../styles/CreationsGrid.module.css'

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

interface CreationsGridProps {
	createUrl: (
		limit: number,
		pageIndex: number,
		username: string,
		generators: string,
		earliestTime: string | number,
		latestTime: string
	) => string
	creator: CreatorProfile
}

const CreationsGrid: FC<CreationsGridProps> = ({ createUrl, creator }) => {
	const [isScrollAnalytics, setIsScrollAnalytics] = useState<boolean>(true)

	const [username, setUsername] = useState<string | string>('')
	const [generators, setGenerators] = useState<string | string>('create')
	const [limit, setLimit] = useState<number>(10)

	const { width } = useWindowDimensions()

	const observer = useRef<IntersectionObserver | null>(null)

	const [latestCreationDataTime, setLatestCreationDataTime] = useState(null)

	const context = useContext(AppContext)

	const earliestCreationTime = context?.earliestCreationTime ?? ''
	const latestCreationTime = context?.latestCreationTime ?? ''
	const setLatestCreationTime = context?.setLatestCreationTime ?? (() => {})
	const setCurrentCreationIndex = context?.setCurrentCreationIndex ?? (() => {})
	const setCurrentCreationModalCreation =
		context?.setCurrentCreationModalCreation ?? (() => {})

	const creationsData = context?.creationsData ?? []
	const setCreationsData = context?.setCreationsData ?? (() => {})

	console.log({ latestCreationTime })
	console.log({ earliestCreationTime })

	const fetcher = async (url: string): Creation[] => {
		console.log({ url })
		const res = await fetch(url)
		const data = await res.json()
		console.log('Fetched data:', data)
		return data
	}

	const getKey = (pageIndex, previousPageData): string => {
		if (pageIndex !== 0 && previousPageData === null) {
			return null
		}

		let adjustedLatestCreationTime = ''

		if (pageIndex === 0) {
			adjustedLatestCreationTime = ''
		} else {
			// Use the last creation's createdAt value from previousPageData if available
			const lastCreationTime =
				previousPageData?.[previousPageData.length - 1]?.createdAt ||
				latestCreationTime
			adjustedLatestCreationTime = addSecondsToDate(lastCreationTime, 1)
		}

		console.log({ latestCreationTime })
		console.log({ adjustedLatestCreationTime })

		const url = `/api/creations?limit=${limit}&page=${
			pageIndex + 1
		}&username=${username}&generators=${generators}&earliestTime=${earliestCreationTime}&latestTime=${adjustedLatestCreationTime}`

		return url
	}

	const handleCreationClick = (creation: Creation, creationIndex): void => {
		const index = dataArray.findIndex((c) => c._id === creation._id)
		if (index !== -1) {
			setCurrentCreationIndex(creationIndex)
			setCurrentCreationModalCreation(creation)
		}

		// creationsData[currentCreationIndex]
	}

	const { data, mutate, size, setSize, isValidating, isLoading, error } =
		useSWRInfinite(getKey, fetcher)

	const dataArray = data?.[0] ?? []

	const isLoadingMore =
		isLoading ||
		(size > 0 && data != null && typeof data[size - 1] === 'undefined')
	const isEmpty = data?.[0]?.length === 0
	const isReachingEnd =
		isEmpty || (data != null && data[data.length - 1]?.length < limit)
	const isRefreshing = isValidating && data != null && data.length === size

	const addSecondsToDate = (date, seconds): string => {
		const newDateTime = new Date(date).getTime() - seconds
		const newDate = new Date(newDateTime).toISOString()
		return newDate
	}

	const allCreationsData = useMemo(() => {
		if (data == null) return []
		return data.flat()
	}, [data])

	const lastElementRef = useCallback(
		(node) => {
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

	// Update the useEffect hook to set the latest creation time
	useEffect(() => {
		if (data == null) return

		const newData = data.flat()
		const uniqueCreations = getUniqueCreations(newData)

		if (uniqueCreations.length > 0) {
			// Get the createdAt value of the last creation in the uniqueCreations array
			const lastCreationTime =
				uniqueCreations[uniqueCreations.length - 1].createdAt

			// Get the createdAt value of the last creation in the creationsData state
			const lastCreationsDataTime =
				creationsData[creationsData.length - 1]?.createdAt

			// Update the creationsData state if the two createdAt values are not equal
			if (lastCreationTime !== lastCreationsDataTime) {
				if (setCreationsData != null) {
					setCreationsData((prevCreations: Creation[]) => {
						return [...prevCreations, ...uniqueCreations]
					})
				}
			}

			// Update the latest creation time state, regardless of whether the two createdAt values are equal
			setLatestCreationTime(lastCreationTime)
		}
	}, [data, size])

	return (
		<>
			{isScrollAnalytics ? (
				<CreationsGridAnalytics
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
				creations={allCreationsData}
				appWidth={width}
				onCreationClick={handleCreationClick}
			/>

			<Row
				ref={lastElementRef}
				className={styles.loadMore}
				style={{ display: 'flex', justifyContent: 'center' }}
			>
				<Spin indicator={antIcon} />
			</Row>
		</>
	)
}

export default CreationsGrid
