import React from 'react'
import type { FC } from 'react'

import Head from 'next/head'

import Header from '../app/components/NavBar/Header'
import CreationsGrid from '../app/components/Creations/CreationsGrid'
import CreationSaveModal from '../app/components/CreationSaveModal'

import stylesHeader from '../styles/Header.module.css'
import stylesCreationsGrid from '../styles/CreationsGrid.module.css'

const Index: FC = () => {
	return (
		<>
			<Head>
				<title>{'Eden Art'}</title>
				<meta name='description' content='The Garden of Artificial Delights' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<>
				<main className={stylesHeader.headerWrapper}>
					<Header />
				</main>

				<CreationSaveModal />

				<section className={stylesCreationsGrid.creationsWrapper}>
					<CreationsGrid />
				</section>
			</>
		</>
	)
}

export default Index
