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

import getUniqueCreations from '../../../util/getUniqueCreations'
import useWindowDimensions from '../../../hooks/useWindowDimensions'
import useGetCreationsFetcher from '../../../hooks/useGetCreationsFetcher'
import addSecondsToDate from '../../../util/addSecondsToDate'
import useCreationsGridParams from '../../../hooks/useCreationsGridParams'

import emptyCreatorProfile from '../../../constants/emptyCreatorProfile'
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

	const { username, generators, earliestTime, limit } = useCreationsGridParams()

	const context = useContext(AppContext)

	const setCurrentCreationIndex = context?.setCurrentCreationIndex ?? (() => {})
	const setCurrentCreationModalCreation =
		context?.setCurrentCreationModalCreation ?? (() => {})
	const creationsData = context?.creationsData ?? []
	const setCreationsData = context?.setCreationsData ?? (() => {})
	const latestCreationTime = context?.latestCreationTime ?? ''
	const setLatestCreationTime =
		context?.setLatestCreationTime ??
		(() => {
			const now = new Date()
			now.setMinutes(now.getMinutes() - 1)
			return String(now.toISOString())
		})
	const updateCreationsData = context?.updateCreationsData ?? (() => {})

	const { width: appWidth } = useWindowDimensions()

	const observer = useRef<IntersectionObserver | null>(null)

	const getKey = useCallback(
		(pageIndex, previousPageData): string => {
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
				generators,
				earliestTime,
				adjustedLatestCreationTime
			)
		},
		[latestCreationTime]
	)

	const { data, size, setSize, isValidating, error, mutate } = useSWRInfinite(
		getKey,
		useGetCreationsFetcher
	)

	console.log({ error })
	const dataArray = data?.[0] ?? []
	const isDataArray =
		dataArray != null &&
		dataArray.length > 0 &&
		typeof data[size - 1] === 'undefined'

	const isLoadingMore = isValidating && size === data?.length
	const isEmpty = data?.[0]?.length === 0
	const isReachingEnd =
		isEmpty || (data != null && data[data.length - 1]?.length < limit)
	const isRefreshing = isValidating && isDataArray && data.length === size

	console.log(dataArray)
	console.log(`Data Length: ${String(dataArray.length ?? '')}`)

	console.log({ isLoadingMore, isEmpty, isReachingEnd, isRefreshing })

	const allCreationsData: Creation[] = useMemo(() => {
		if (data != null) {
			return data.flat()
		}
		return []
	}, [data])

	const isAllCreationsData =
		typeof allCreationsData !== 'undefined' &&
		allCreationsData != null &&
		allCreationsData.length > 0

	const lastElementRef = useCallback(
		(node) => {
			console.log('Ref node: ', node)
			if (isLoadingMore || isReachingEnd) return
			if (observer.current != null) observer.current.disconnect()
			observer.current = new IntersectionObserver((entries) => {
				console.log('Intersection observer entries: ', entries)
				if (entries[0].isIntersecting && !isReachingEnd) {
					console.log('Intersection observed and not reaching end.')
					setSize((prevSize) => {
						console.log('Prev size: ', prevSize)
						if (!isReachingEnd) {
							const newSize = prevSize + 1
							console.log('New size: ', newSize)
							return newSize
						}
						return prevSize
					})
				}
			})
			if (node) observer.current.observe(node)
		},
		[isLoadingMore, isReachingEnd, setSize]
	)

	useEffect(() => {
		return () => {
			if (observer.current != null) {
				observer.current.disconnect()
			}
		}
	}, [])

	const handleCreationClick = (creation: Creation, creationIndex): void => {
		const index = dataArray.findIndex((c) => c._id === creation._id)
		if (index !== -1) {
			setCurrentCreationIndex(creationIndex)
			setCurrentCreationModalCreation(creation)
		}
	}

	// Update the useEffect hook to set the latest creation time
	useEffect(() => {
		if (data == null) return

		const newData = data.flat()
		const uniqueCreations = getUniqueCreations(newData)

		if (uniqueCreations.length > 0) {
			setCreationsData((prevCreations: Creation[]) => {
				return [...prevCreations, ...uniqueCreations]
			})

			// Update the latest creation time state
			const lastCreation = uniqueCreations[uniqueCreations.length - 1]
			setLatestCreationTime(lastCreation.createdAt)
		}
	}, [data, setCreationsData, setLatestCreationTime])

	const isCreator =
		typeof creator !== 'undefined' && creator?.user?.username !== ''

	// console.log({ creator })
	// console.log(lastElementRef)
	console.log({ latestCreationTime })
	console.log({ allCreationsData })
	console.log({ creationsData })
	console.log(`CreationsGrid - Creations Data Length: ${creationsData.length}`)
	console.log(`All Creations Length: ${allCreationsData.length}`)
	console.log(`Creations Data Length: ${creationsData.length}`)

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
