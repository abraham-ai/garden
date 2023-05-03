import type Creation from '../../../interfaces/Creation'
import type { FC } from 'react'
import React, { useContext } from 'react'
import AppContext from '../../../context/AppContext'

import Masonry from 'react-masonry-css'
import breakpointColumnsObj from '../../../constants/breakpointColumns'

import CreationCard from '../Creation/CreationCard/CreationCard'

import styles from '../../../styles/CreationsGrid.module.css'

interface CreationsMasonryProps {
	creations: Creation[]
	isMobile: boolean
	appWidth: number
}

const CreationsMasonry: FC<CreationsMasonryProps> = ({
	creations,
	isMobile,
	appWidth,
}) => {
	const context = useContext(AppContext)
	const currentTheme = context?.currentTheme ?? 'light'

	return (
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
							key={creation._id}
							index={i}
							isMobile={isMobile}
							appWidth={appWidth}
							currentTheme={currentTheme}
						/>
					)
				}
			})}
		</Masonry>
	)
}

export default CreationsMasonry
