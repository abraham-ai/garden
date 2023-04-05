'use client'

import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useContext
} from 'react'

import AppContext from '../../../context/AppContext'

import CreationCard from '../CreationCard'
import type Creation from '../../interfaces/Creation'
import type Creations from '../../interfaces/Creations'

import { Row, Spin } from 'antd'

import Masonry from 'react-masonry-css'
import styles from '../../../styles/CreationsGrid.module.css'
import breakpointColumnsObj from '../../../constants/breakpointColumns'

import { LoadingOutlined } from '@ant-design/icons'

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

const CreationsGridSimple = ({ creations }) => {
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
    () => context?.creationsData || [],
    [context?.creationsData]
  )
  const setCreationsData = useMemo(
    () => context?.setCreationsData,
    [context?.setCreationsData]
  )

  console.log('CREATIONS GRID SIMPLE')
  console.log(creations)

  return (
    <>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className={styles.crGridMasonry}
        columnClassName={styles.crGridMasonryColumn}
        style={{ marginTop: 0 }}
      >
        {creations.map((creation: Creation, i: number) => {
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

export default CreationsGridSimple
