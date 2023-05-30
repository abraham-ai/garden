import React from 'react'
import type { FC } from 'react'
import emptyCreatorProfile from '../constants/emptyCreatorProfile'

import Head from 'next/head'
import MobileBar from '../../app/components/NavBar/MobileBar'
import Header from '../app/components/NavBar/Header'
import CreationsGrid from '../app/components/Creations/CreationsGrid'
import CreationSaveModal from '../app/components/Creation/CreationSaveModal/CreationSaveModal'

import useWindowDimensions from '../hooks/useWindowDimensions'
import styles from '../styles/CreationsGrid.module.css'

const Index: FC = () => {
	const createGardenCreationsUrl = (
		limit,
		pageIndex,
		username,
		generators,
		earliestTime,
		latestTime
	): string => {
		console.log({ pageIndex })

		return `/api/creations?limit=${String(limit)}&page=${String(
			pageIndex
		)}&username=${String(username)}&generators=${String(
			generators
		)}&earliestTime=${String(earliestTime)}&latestTime=${String(latestTime)}`
	}

	const { width: appWidth } = useWindowDimensions()

	return (
		<>
			<Head>
				<title>{'Eden Art'}</title>
				<meta name='description' content='The Garden of Artificial Delights' />
				<meta
					name='viewport'
					content='width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no'
				/>
				<meta name='twitter:title' content='Eden Art' />
				<meta
					name='twitter:description'
					content='Garden of Artificial Delights'
				/>
				<meta
					name='twitter:image'
					content='https://garden.eden.art/_next/image?url=%2Feden-logo-512x512.png'
				/>
				<meta name='twitter:card' content='eden_art_logo' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<>
				<main>
					<Header />
					<MobileBar />
				</main>

				<CreationSaveModal />

				<section className={styles.creationsWrapper}>
					<CreationsGrid
						creatorProfile={emptyCreatorProfile}
						appWidth={appWidth}
					/>
				</section>
			</>
		</>
	)
}

export default Index
