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
	appWidth: number
}

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
									creator={creator}
									key={creation._id}
									index={i}
									appWidth={appWidth}
									currentTheme={currentTheme}
								/>
							)
						}
					})}
				</Masonry>
			) : (
				<span>{'Loading...'}</span>
			)}
		</>
	)
}

export default CreationsMasonry
