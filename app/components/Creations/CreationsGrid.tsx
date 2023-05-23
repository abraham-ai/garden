'use client'

import type { FC } from 'react'
import type CreatorProfile from '../../../interfaces/CreatorProfile'
import type Creation from '../../../interfaces/Creation'
import React, { useState, useRef, useCallback, useContext } from 'react'
import AppContext from '../../../context/AppContext'
import useSWRInfinite from 'swr/infinite'

import emptyCreatorProfile from '../../../constants/emptyCreatorProfile'
import CreationsMasonry from './CreationsMasonry'
import CreationsGridAnalytics from './Analytics/CreationsGridAnalytics'

import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'

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
	collectionId = '',
}) => {
	const [isScrollAnalytics] = useState<boolean>(false)
	const [generators] = useState<string>('create')
	const [limit] = useState<number>(10)

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
		console.log({ url })
		const res = await fetch(url)
		const data = await res.json()
		console.log({ data })
		return data
	}

	const getKey = useCallback(
		(pageIndex, previousPageData): string | null => {
			let url = `/api/creations?limit=${limit}&page=${String(
				pageIndex
			)}&username=${username}&generators=${generators}&collectionId=${collectionId}&earliestTime=&latestTime=`

			if (pageIndex === 0 && previousPageData != null) {
				return null
			} else if (pageIndex === 0 && previousPageData === null) {
				return url
			} else if (pageIndex !== 0) {
				const lastCreationCreatedAt =
					previousPageData?.[previousPageData.length - 1]?.createdAt

				let lastCreationCreatedAtNew = ''
				if (lastCreationCreatedAt != null) {
					lastCreationCreatedAtNew = addSecondsToDate(lastCreationCreatedAt, 1)
				}
				url = `/api/creations?limit=${limit}&page=${String(
					pageIndex
				)}&username=${username}&generators=${generators}&collectionId=${collectionId}&earliestTime=&latestTime=${lastCreationCreatedAtNew}`

				return url
			} else {
				return null
			}
		},
		[username, generators, limit]
	)

	const { data, mutate, size, setSize, isValidating, isLoading, error } =
		useSWRInfinite(getKey, fetcher, { keepPreviousData: true })

	const dataArray = data != null ? data.flat() : []

	const isLoadingMore =
		isLoading ||
		(size > 0 && data != null && typeof data[size - 1] === 'undefined')
	const isEmpty = data?.[0]?.length === 0
	const isRefreshing = isValidating && data != null && data.length === size

	const addSecondsToDate = (date: string, seconds: number): string => {
		console.log({ date, seconds })
		const newDateTime = new Date(date).getTime() - seconds
		console.log({ newDateTime })

		if (date === '') {
			return ''
		}

		if (isNaN(newDateTime)) {
			throw new Error(
				`Invalid date or seconds. Date: ${date}, Seconds: ${seconds}`
			)
		}

		const newDate = new Date(newDateTime).toISOString()
		return newDate
	}

	const lastElementRef = useCallback(
		(node) => {
			// console.log('isLoadingMore:', isLoadingMore)
			// console.log('node:', node)

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
		},
		[isLoadingMore]
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
