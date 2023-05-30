import type { FC } from 'react'
import React, { useContext, useMemo, useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import AppContext from '../../../../context/AppContext'
import { Button, ConfigProvider, theme, Typography, Row } from 'antd'

import themeDefault from '../../../../themes/themeDefault'
import themeDark from '../../../../themes/themeDark'
import styles from '../../../../styles/CreationsSorter.module.css'
import { BiTrendingUp } from 'react-icons/bi'
import SortButton from './SortButton'
const { Text } = Typography

const CreationsSorter: FC = ({ appWidth }) => {
	const context = useContext(AppContext)
	const currentSort = context?.currentSort ?? 'latest'
	const setCurrentSort = context?.setCurrentSort ?? (() => {})

	const appTheme = context?.appTheme ?? 'light'
	const isLight = appTheme === 'light'

	const themeDark = {
		// algorithm: theme.darkAlgorithm,
		token: {
			colorPrimary: isLight ? 'blue' : '#fff', // deep purple #724db5
		},
	}
	const themeDefault = { algorithm: theme.defaultAlgorithm }
	const currentTheme = isLight ? themeDefault : themeDark

	const textSize: string = useMemo(() => {
		return styles.sortText
	}, [])

	const sortList = ['Latest', 'Praises', 'Burns', 'Trending']

	return (
		<Row>
			{sortList.map((title, index) => (
				<SortButton
					key={index}
					title={title}
					isLight={isLight}
					currentSort={currentSort}
					setCurrentSort={setCurrentSort}
					appTheme={appTheme}
					currentTheme={currentTheme}
				/>
			))}
		</Row>
	)
}

export default CreationsSorter
