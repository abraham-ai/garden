import type Creation from '../../../interfaces/Creation'
import type { FC } from 'react'
import React, { useContext } from 'react'
import AppContext from '../../../context/AppContext'

import emptyCreatorProfile from '../../../constants/emptyCreatorProfile'

import Masonry from 'react-masonry-css'
import breakpointColumnsObj from '../../../constants/breakpointColumns'

import CreationCard from '../Creation/CreationCard/CreationCard'

import styles from '../../../styles/CreationsGrid.module.css'
import { LoadingOutlined } from '@ant-design/icons'
import { Spin, Row } from 'antd'

interface CreationsMasonryProps {
	creations: Creation[]
	appWidth: number
}

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

const CreationsMasonry: FC<CreationsMasonryProps> = ({
	creations,
	appWidth,
}) => {
	const context = useContext(AppContext)
	const currentTheme = context?.currentTheme ?? 'light'

	const isCreations =
		typeof creations !== 'undefined' &&
		creations != null &&
		creations.length > 0

	console.log({ creations })

	return (
		<>
			{isCreations ? (
				<Masonry
					breakpointCols={breakpointColumnsObj}
					className={styles.crGridMasonry}
					columnClassName={styles.crGridMasonryColumn}
				>
					{creations?.map((creation: Creation, i: number) => {
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
								<CreationCard
									creation={creation}
									creator={emptyCreatorProfile}
									key={creation._id}
									index={i}
									appWidth={appWidth}
									currentTheme={currentTheme}
									page='creations'
								/>
							)
						}
					})}
				</Masonry>
			) : (
				<Row style={{ display: 'flex', justifyContent: 'center' }}>
					<Spin indicator={antIcon} />
				</Row>
			)}
		</>
	)
}

export default CreationsMasonry
