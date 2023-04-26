import React from 'react'
import type { FC } from 'react'
import Head from 'next/head'
import Header from '../components/NavBar/Header'
import styles from '../styles/Home.module.css'

const Profile: FC = () => {
	return (
		<>
			<Head>
				<title>{'Eden AI'}</title>
				<meta name='description' content='The Garden of Artificial Delights' />
				<meta
					name='viewport'
					content='width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no'
				/>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<main className={styles.main}>
				<Header />
			</main>
		</>
	)
}

export default Profile
