'use client'

import React, {
	useState,
	useEffect,
	useRef,
	useCallback,
	useMemo,
	useContext
} from 'react'
import useSWRInfinite from 'swr/infinite'

import AppContext from '../../../context/AppContext'

import { createMachine, interpret, assign } from 'xstate'

import deepEqual from '../../../util/deepEqual'
import timeAgo from '../../../util/timeAgo'

import type FilterType from '../../../interfaces/Filter'
import type Creation from '../../../interfaces/Creation'

import CreationsMasonry from './CreationsMasonry'
import CreationsGridAnalytics from './CreationsGridAnalytics'

import { Spin, Row } from 'antd'

import styles from '../../../styles/CreationsGrid.module.css'

import { LoadingOutlined } from '@ant-design/icons'

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

const CreationsGrid = (): JSX.Element => {
		const [isScrollAnalytics, setIsScrollAnalytics] = useState<boolean>(false)
	
		const [username, setUsername] = useState<string | string>('')
		const [generators, setGenerators] = useState<string | string>('')
		const [earliestTime, setEarliestTime] = useState<number | string>('')
		const [latestTime, setLatestTime] = useState<number | string>('')
		const [limit, setLimit] = useState<number>(10)
	
		const [latestCreationTime, setLatestCreationTime] = useState<number | string>(() => {
			const now = new Date()
			now.setMinutes(now.getMinutes() - 1)
			return now.toISOString()
		})
	
		const observer = useRef<HTMLDivElement | null>(null)
	
		const context = useContext(AppContext)
		const creationsData = useMemo(() => context?.creationsData || [], [context?.creationsData])
		const setCreationsData = useMemo(() => context?.setCreationsData, [context?.setCreationsData])
	
		const fetcher = async (url: string) => {
			const res = await fetch(url)
			const data = await res.json()
			console.log('Fetched data:', data)
			return data
		}
	
		const getKey = (pageIndex, previousPageData) => {
			if (pageIndex !== 0 && previousPageData === null) {
				return null;
			}
		
			let adjustedLatestCreationTime = '';
		
			if (pageIndex === 0) {
				adjustedLatestCreationTime = '';
			} else {
				// Use the last creation's createdAt value from previousPageData if available
				const lastCreationTime = previousPageData?.[previousPageData.length - 1]?.createdAt || latestCreationTime;
				adjustedLatestCreationTime = addSecondsToDate(lastCreationTime, 1);
			}
		
			const url = `/api/creations?limit=${limit}&page=${
				pageIndex + 1
			}&username=${username}&generators=${generators}&earliestTime=${earliestTime}&latestTime=${adjustedLatestCreationTime}`;
		
			console.log('getKey URL:', url);
			return url;
		};
	
		const {
			data,
			mutate,
			size,
			setSize,
			isValidating,
			isLoading,
			error,
		} = useSWRInfinite(getKey, fetcher)
	
		const isLoadingMore = isLoading || (size > 0 && data && typeof data[size - 1] === 'undefined')
		const isEmpty = data?.[0]?.length === 0
		const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < limit)
		const isRefreshing = isValidating && data && data.length === size
	
		const addSecondsToDate = (date, seconds) => {
			let newDateTime = new Date(date).getTime() - seconds
			let newDate = new Date(newDateTime).toISOString()
			return newDate
		}
	
		const allCreationsData = useMemo(() => {
			if (!data) return []
			return data.flat()
		}, [data])
	
		const lastElementRef = useCallback(
			(node) => {
				if (isLoadingMore || isReachingEnd) return
				if (observer.current) observer.current.disconnect()
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

		console.log({ allCreationsData })
		console.log({ creationsData })
	
		// Update the useEffect hook to set the latest creation time
useEffect(() => {
	if (!data) return;

	console.log('Data changed:', data);

	const newData = data.flat();
	const uniqueCreations = newData.filter((newCreation: Creation) => {
			return !creationsData.some((prevCreation) => prevCreation.id === newCreation.id);
	});

	if (uniqueCreations.length > 0) {
			setCreationsData((prevCreations: Creation[]) => {
					return [...prevCreations, ...uniqueCreations];
			});

			// Update the latest creation time state
			const lastCreation = uniqueCreations[uniqueCreations.length - 1];
			setLatestCreationTime(lastCreation.createdAt);
	}
}, [data, creationsData, size]);
			
		// lastCreationEarliestTime !== '' 
			return (
				<>
					{isScrollAnalytics ? (
						<CreationsGridAnalytics
							// lastCreationEarliestTime={lastCreationEarliestTime}
							size={size}
							creationsData={allCreationsData}
							isLoadingMore={isLoadingMore}
							isReadingEnd={isReachingEnd}
							isRefreshing={isRefreshing}
							mutate={mutate}
							setSize={setSize}
							isEmpty={isEmpty}
						/>
					) : null}
			
					<CreationsMasonry creations={allCreationsData} />
			
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