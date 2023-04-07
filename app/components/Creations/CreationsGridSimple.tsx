'use client'

import React, { useState, useEffect, useRef, useMemo, useContext } from 'react'

import AppContext from '../../../context/AppContext'

import CreationCard from '../CreationCard'
import type Creation from '../../interfaces/Creation'
import type Creations from '../../interfaces/Creations'

import Masonry from 'react-masonry-css'
import styles from '../../../styles/CreationsGrid.module.css'
import breakpointColumnsObj from '../../../constants/breakpointColumns'

const CreationsGridSimple = ({
	creations,
}: {
	creations: Creations
}): JSX.Element => {
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
		</>
	)
}

export default CreationsGridSimple
