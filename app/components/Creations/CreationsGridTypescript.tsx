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

import AppContext from '../../context/AppContext'

import { createMachine, interpret, assign } from 'xstate'

import deepEqual from '../../util/deepEqual'

import FilterType from '../../interfaces/Filter'

import CreationCard from './CreationCard'
import type Creation from '../../interfaces/Creation'

import { Button, Spin, Row } from 'antd'

import Masonry from 'react-masonry-css'
import styles from '../../styles/CreationsGrid.module.css'
import breakpointColumnsObj from '../../constants/breakpointColumns'

import { LoadingOutlined } from '@ant-design/icons'

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

const CreationsGrid = (): JSX.Element => {
  const [isScrollAnalytics, setIsScrollAnalytics] = useState<boolean>(false)

  const [username, setUsername] = useState<string | string>('')
  const [generators, setGenerators] = useState<string | string>('')
  const [earliestTime, setEarliestTime] = useState<number | string>('')
  const [latestTime, setLatestTime] = useState<number | string>('')
  const [limit, setLimit] = useState<number>(10)
  const [lastCreationEarliestTime, setLastCreationEarliestTime] = useState<
  number | string
  >('')
  const loadBelowRef = useRef<HTMLDivElement | null>(null)

  const context = useContext(AppContext)
  const creationsData = useMemo(
    () => Array.isArray(context?.creationsData) ? context?.creationsData : [] as Creation[],
    [context?.creationsData]
  )
  const setCreationsData = useMemo(
    () => context?.setCreationsData,
    [context?.setCreationsData]
  )

  const fetcher = async (url: string): Promise<any> => {
    const res = await fetch(url)
    return await res.json() // Returning an awaited promise is required in this context.
  }

  const getKey = (index: number, previousPageData): string => {
    const newIndex = index + 1
    return `/api/creations?limit=${String(limit)}&page=${String(newIndex)}&username=${String(username)}&generators=${String(generators)}&earliestTime=${String(earliestTime)}&latestTime=${String(Number(lastCreationEarliestTime))}`
  }

  const { data, mutate, size, setSize, isValidating, isLoading, error } =
    useSWRInfinite(getKey, fetcher)

  // Define the state machine
  // Set predictableActionArguments to true when using createMachine
  const infiniteScrollMachine = createMachine(
    {
      id: 'infiniteScroll',
      initial: 'idle',
      context: {
        lastCreationEarliestTime: ''
      },
      states: {
        idle: {
          on: {
            LOAD_MORE: 'loading'
          }
        },
        loading: {
          invoke: {
            src: 'handleLoadMore',
            onDone: {
              target: 'idle',
              actions: assign({
                lastCreationEarliestTime: (_, event) => event.data
              })
            },
            onError: 'error'
          }
        },
        error: {
          on: {
            RETRY: 'loading'
          }
        }
      }
    }
  )

  // Create a service to interpret the state machine
  const infiniteScrollService = interpret(infiniteScrollMachine)
    .onTransition((state) => {
      // console.log('Transitioned to state:', state.value)
    })
    .start()

  const addSecondsToDate = (date, seconds): string => {
    const newDateTime = new Date(date).getTime() - seconds
    const newDateTimeObj = new Date(newDateTime)
    if (isNaN(newDateTimeObj.getTime())) {
      console.error('Invalid time value')
      return ''
    }
    const newDate = newDateTimeObj.toISOString()
    return newDate
  }

  const handleLoadMore = useCallback(async () => {
    // setSize(size + 1)
  }, [])

  // Update the useEffect to listen for state changes in the state machine
  useEffect(() => {
    const subscription = infiniteScrollService.subscribe((state) => {
      if (typeof state !== 'undefined' && typeof state.changed !== 'unedfined') {
        // console.log(state.context.lastCreationEarliestTime)

        if (typeof data !== 'undefined') {
          const lastDataCreation = data[0][data[0].length - 1]
          const lastCreation =
            creationsData.length === 0
              ? {}
              : creationsData[creationsData.length - 1]

          // console.log(creationsData.length)
          // console.log(lastDataCreation)
          // console.log(lastDataCreation.createdAt)
          // console.log(lastCreation.createdAt)

          // let newDate
          // if (typeof lastDataCreation !== 'undefined' && lastDataCreation.createdAt !== 'undefined') {
          //   newDate = addSecondsToDate(lastDataCreation.createdAt, 1000)
          // }

          const newDate = addSecondsToDate(lastDataCreation?.createdAt, 1000)


          // console.log('lastDataCreation.createdAt', lastDataCreation.createdAt)
          // console.log('newDate', newDate)
          // console.log(size * 10)
          // console.log(creationsData.length)
          // console.log(deepEqual(lastDataCreation, lastCreation))

          // console.log({ data })
          // console.log({ creationsData })

          setCreationsData((prevCreations: Creation[]) => [
            ...prevCreations,
            ...(data?.[0] || []) as Creation[]
          ] as Creation[])

          setLastCreationEarliestTime(newDate)
          setSize(Number(size) + 1)

          // Send LOAD_MORE event to the state machine
          infiniteScrollService.send({
            type: 'LOAD_MORE',
            data: newDate
          })
        }
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [
    infiniteScrollService,
    creationsData,
    setCreationsData,
    data,
    size,
    setSize
  ])

  // Create the intersection observer callback
  const loadMoreObserver = useCallback(
    (entries) => {
      const firstEntry = entries[0]
      if (typeof firstEntry !== 'undefined' && typeof firstEntry.isIntersecting !== 'undefined') {
        if (typeof data !== 'undefined') {
          setSize(Number(size + 1))

          infiniteScrollService.send({
            type: 'LOAD_MORE'
            // data: newDate,
          })
        }
      }
    },
    [data, infiniteScrollService, setSize, size]
  )

  // Set up the intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(loadMoreObserver, {
      rootMargin: '0px',
      threshold: 1.0
    })

    const currentRef = loadBelowRef.current

    if (typeof currentRef !== 'undefined' && currentRef !== null) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef !== undefined && currentRef !== null) {
        observer.unobserve(currentRef)
      }
    }
  }, [loadMoreObserver])

  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === 'undefined') as boolean;
  const isEmpty = data?.[0]?.length === 0
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < limit)
  const isRefreshing = isValidating && data && data.length === size

  return (
    <>
      { isScrollAnalytics === true
        ? (

<section className={styles.creationAnalytics} style={{ color: 'black' }}>
<span>{`Page ${size}`}</span>
<span style={{ display: 'flex' }}>
  <b>{'Last Creation Earliest Time'}</b>
  <p>{lastCreationEarliestTime}</p>
</span>
<div>
  <span className={styles.loadingState}>
    {`showing ${size} page(s) of ${isLoadingMore ? '...' : creationsData.length} creation(s) `}
  </span>
  <Button
    disabled={isLoadingMore === true || isReachingEnd === true}
    onClick={() => {
      handleLoadMore()
    }}
  >
    {isLoadingMore === true ? 'loading...' : isReachingEnd === true ? 'no more creations' : 'load more'}
  </Button>
  <Button disabled={isRefreshing} onClick={() => mutate()}>
    {isRefreshing === true ? 'refreshing...' : 'refresh'}
  </Button>
  <Button disabled={!size} onClick={() => setSize(0)}>
    clear
  </Button>
</div>
{isEmpty ? <p>No creations found.</p> : null}
</section>

        )
      : null }

      <Masonry
        breakpointCols={breakpointColumnsObj}
        className={styles.crGridMasonry}
        columnClassName={styles.crGridMasonryColumn}
      >
        {creationsData.map((creation: Creation, i: number) => {
          const generatorName = creation.task.generator.generatorName
          // console.log({ creation })
          if (
            generatorName === 'tts' ||
            generatorName === 'complete' ||
            generatorName === 'interrogate' ||
            generatorName === 'wav2lip' ||
            generatorName === 'interpolate' ||
            generatorName === 'real2real' ||
            generatorName === 'remix'
          ) {
            return null
          } else {
            return (
              <CreationCard creation={creation} key={creation._id} index={i} />
            )
          }
        })}
      </Masonry>

      <Row ref={loadBelowRef} className={styles.loadMore} style={{ display: 'flex', justifyContent: 'center' }}>
        <Spin indicator={antIcon} />
      </Row>
    </>
  )
}

export default CreationsGrid
