'use client'

import type { FC } from 'react'
import type Creation from '../../../interfaces/Creation'
import type CreatorProfile from '../../../interfaces/CreatorProfile'

import React, { useContext } from 'react'
import AppContext from '../../../context/AppContext'

import CreationCard from '../Creation/CreationCard/CreationCard'

import Masonry from 'react-masonry-css'
import styles from '../../../styles/CreationsGrid.module.css'
import breakpointColumnsObj from '../../../constants/breakpointColumns'

interface CreationsGridProps {
	creations: Creation[]
	creator: CreatorProfile
	appWidth: number
	onCreationClick: (creation: Creation, index: number) => void
}

const CreationsGridSimple: FC<CreationsGridProps> = ({
	creations,
	creator,
	appWidth,
	onCreationClick,
}) => {
	const context = useContext(AppContext)
	const currentTheme = context?.currentTheme ?? 'light'

	console.log('CREATIONS GRID SIMPLE')
	console.log(creations)

	const isMobile = appWidth < 768

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
								layout={isMobile ? 'relative' : 'overlay'}
								creation={creation}
								creator={creator}
								key={creation._id}
								index={i}
								appWidth={appWidth}
								currentTheme={currentTheme}
								onCreationClick={onCreationClick}
								page='creations'
							/>
						)
					}
				})}
			</Masonry>
		</>
	)
}

export default CreationsGridSimple
