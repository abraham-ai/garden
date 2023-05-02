'use client'

import React from 'react'
import type { FC } from 'react'

import CreationCard from '../CreationCard/CreationCard'
import type Creation from '../../../interfaces/Creation'

import Masonry from 'react-masonry-css'
import styles from '../../../styles/CreationsGrid.module.css'
import breakpointColumnsObj from '../../../constants/breakpointColumns'

interface CreationsGridProps {
	creations: Creation[]
	isMobile: boolean
	appWidth: number
}

const CreationsGridSimple: FC<CreationsGridProps> = ({
	creations,
	isMobile,
	appWidth,
}) => {
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
							<CreationCard
								creation={creation}
								key={creation._id}
								index={i}
								isMobile={isMobile}
								appWidth={appWidth}
							/>
						)
					}
				})}
			</Masonry>
		</>
	)
}

export default CreationsGridSimple
