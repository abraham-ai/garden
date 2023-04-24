import React from 'react'
import type { FC } from 'react'

import Masonry from 'react-masonry-css'
import breakpointColumnsObj from '../../../constants/breakpointColumns'

import type Creation from '../../../interfaces/Creation'

import CreationCard from '../CreationCard'

import styles from '../../../styles/CreationsGrid.module.css'

interface CreationsMasonryTypes {
	creations: Creation[]
	isMobile: boolean
}

const CreationsMasonry: FC<CreationsMasonryTypes> = ({
	creations,
	isMobile,
}) => {
	return (
		<Masonry
			breakpointCols={breakpointColumnsObj}
			className={styles.crGridMasonry}
			columnClassName={styles.crGridMasonryColumn}
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
						/>
					)
				}
			})}
		</Masonry>
	)
}

export default CreationsMasonry
