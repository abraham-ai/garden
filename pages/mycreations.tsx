import React, { useContext } from 'react'
import type { FC } from 'react'

import AppContext from '../context/AppContext'

import Header from '../app/components/NavBar/Header'
import CreationsGridSimple from '../app/components/Creations/CreationsGridSimple'
import CreatorHeader from '../app/components/Creator/CreatorHeader'

import useGetMyCreations from '../hooks/useGetMyCreations'

import { Row, Spin } from 'antd'

import { LoadingOutlined } from '@ant-design/icons'

import stylesHeader from '../styles/Header.module.css'
import stylesCreationsGrid from '../styles/CreationsGrid.module.css'

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

const MyCreations: FC = () => {
	const context = useContext(AppContext)
	const userId = context?.userId || ''

	const myCreationsData = useGetMyCreations(userId)
	console.log(myCreationsData)

	return (
		<>
			<main className={stylesHeader.headerWrapper}>
				<Header />
			</main>

			<CreatorHeader userId={userId} />

			{typeof myCreationsData !== 'undefined' && myCreationsData !== null ? (
				<section
					className={stylesCreationsGrid.creationsWrapper}
					style={{ marginTop: 50 }}
				>
					<CreationsGridSimple creations={myCreationsData.creations} />
				</section>
			) : (
				<Row style={{ display: 'flex', justifyContent: 'center' }}>
					<Spin indicator={antIcon} />
				</Row>
			)}
		</>
	)
}

export default MyCreations
