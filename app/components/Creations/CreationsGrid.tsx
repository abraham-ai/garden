'use client'

import type { FC } from 'react'
import type Creation from '../../../interfaces/Creation'
import type CreatorProfile from '../../../interfaces/CreatorProfile'
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
import useGetCreationsFetcher from '../../../hooks/useGetCreationsFetcher'
import addSecondsToDate from '../../../util/addSecondsToDate'
import useCreationsGridParams from '../../../hooks/useCreationsGridParams'

import emptyCreatorProfile from '../../../constants/emptyCreatorProfile'
import CreationsMasonry from './CreationsMasonry'
import CreationsGridAnalytics from './CreationsGridAnalytics'

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

	const { username, generators, earliestTime, limit } = useCreationsGridParams()

	const context = useContext(AppContext)

	const setCurrentCreationIndex = context?.setCurrentCreationIndex ?? (() => {})
	const setCurrentCreationModalCreation =
		context?.setCurrentCreationModalCreation ?? (() => {})
	const creationsData = context?.creationsData ?? []
	const setCreationsData = context?.setCreationsData ?? (() => {})
	const updateCreationsData = context?.updateCreationsData ?? (() => {})

	const { width: appWidth } = useWindowDimensions()

	const [latestCreationTime, setLatestCreationTime] = useState<number | string>(
		() => {
			const now = new Date()
			now.setMinutes(now.getMinutes() - 1)
			return now.toISOString()
		}
	)

	const observer = useRef<IntersectionObserver | null>(null)

	const getKey = (pageIndex, previousPageData) => {
		if (pageIndex !== 0 && previousPageData === null) {
			return null
		}

		let adjustedLatestCreationTime = ''

		if (pageIndex === 0) {
			adjustedLatestCreationTime = ''
		} else {
			const lastCreationTime =
				previousPageData?.[previousPageData.length - 1]?.createdAt ||
				latestCreationTime
			adjustedLatestCreationTime = addSecondsToDate(lastCreationTime, 1)
		}

		return createUrl(
			limit,
			pageIndex + 1,
			username,
			'create',
			earliestTime,
			adjustedLatestCreationTime
		)
	}

	console.log(getKey())

	const { data, mutate, size, setSize, isValidating, isLoading, error } =
		useSWRInfinite(getKey, useGetCreationsFetcher)

	const isLoadingMore =
		isLoading ||
		(size > 0 && data != null && typeof data[size - 1] === 'undefined')
	const isEmpty = data?.[0]?.length === 0
	const isReachingEnd =
		isEmpty || (data != null && data[data.length - 1]?.length < limit)
	const isRefreshing = isValidating && data != null && data.length === size

	const allCreationsData = useMemo(() => {
		if (data == null) return []
		// Update the creationsData every time data changes
		updateCreationsData(data.flat())
		return data.flat()
	}, [data, updateCreationsData])

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

	useEffect(() => {
		if (data != null) {
			updateCreationsData(data.flat())
		}
	}, [data, updateCreationsData])

	const handleCreationClick = (creation: Creation): void => {
		const index = allCreationsData.findIndex((c) => c._id === creation._id)
		if (index !== -1) {
			setCurrentCreationIndex(index)
			setCurrentCreationModalCreation(creation)
		}
	}

	// console.log({ allCreationsData })
	// console.log({ creationsData })

	// Update the useEffect hook to set the latest creation time
	useEffect(() => {
		if (data == null) return

		// console.log('Data changed:', data)

		const newData = data.flat()
		const uniqueCreations = newData.filter((newCreation: Creation) => {
			return !creationsData.some(
				(prevCreation) => prevCreation._id === newCreation._id
			)
		})

		if (uniqueCreations.length > 0) {
			if (setCreationsData != null) {
				setCreationsData((prevCreations: Creation[]) => {
					return [...prevCreations, ...uniqueCreations]
				})
			}

			// Update the latest creation time state
			const lastCreation = uniqueCreations[uniqueCreations.length - 1]
			setLatestCreationTime(lastCreation.createdAt)
		}
	}, [data, creationsData, size])

	const isCreator =
		typeof creator !== 'undefined' && creator?.user?.username !== ''

	// console.log({ creator })

	return (
		<>
			{isScrollAnalytics ? (
				<CreationsGridAnalytics
					// lastCreationEarliestTime={lastCreationEarliestTime}
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
				appWidth={appWidth}
				onCreationClick={handleCreationClick}
				creator={isCreator ? creator : emptyCreatorProfile}
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
