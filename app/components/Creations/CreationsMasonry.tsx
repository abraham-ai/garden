import type Creation from '../../../interfaces/Creation'
import type CreatorProfile from '../../../interfaces/CreatorProfile'
import type { FC } from 'react'
import React, { useContext } from 'react'
import AppContext from '../../../context/AppContext'

import emptyCreatorProfile from '../../../constants/emptyCreatorProfile'

import Masonry from 'react-masonry-css'
import breakpointColumnsObj from '../../../constants/breakpointColumns'

import CreationCard from '../Creation/CreationCard/CreationCard'

import styles from '../../../styles/CreationsGrid.module.css'
import { LoadingOutlined } from '@ant-design/icons'

interface CreationsMasonryProps {
	appWidth: number
	onCreationClick: (creation: Creation, index: number) => void
	creator: CreatorProfile
}

const CreationsMasonry: FC<CreationsMasonryProps> = ({
	appWidth,
	onCreationClick,
	creator,
}) => {
	const context = useContext(AppContext)
	const creationsData = context?.creationsData ?? []
	const currentTheme = context?.currentTheme ?? 'light'

	const isCreations = creationsData.length > 0

	console.log({ creationsData })
	// console.log(`CreationsMasonry - Creations Data Length: ${creations.length}`)

	const isMobile = appWidth < 768

	// console.log({ creator })

	return (
		<>
			{isCreations ? (
				<Masonry
					breakpointCols={breakpointColumnsObj}
					className={styles.crGridMasonry}
					columnClassName={styles.crGridMasonryColumn}
				>
					{creationsData?.map((creation: Creation, i: number) => {
						// console.log({ creation })
						const generatorName = creation?.task?.generator?.generatorName
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
									page='creations'
									onCreationClick={onCreationClick}
								/>
							)
						}
					})}
				</Masonry>
			) : null}
		</>
	)
}

export default CreationsMasonry
