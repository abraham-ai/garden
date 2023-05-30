import type { FC } from 'react'
import React, { useContext, useMemo, useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import AppContext from '../../../../context/AppContext'
import { Button, ConfigProvider, theme, Typography, Row } from 'antd'

import themeDefault from '../../../../themes/themeDefault'
import themeDark from '../../../../themes/themeDark'
import styles from '../../../../styles/CreationsSorter.module.css'
import { BiTrendingUp } from 'react-icons/bi'

const { Text } = Typography

interface SortButtonProps {
	title: string
	currentSort: string
	setCurrentSort: (currentSort: string) => void
	appTheme: string
	appWidth: number
	appTheme: string
}

const SortButton: FC<SortButtonProps> = ({
	title,
	currentSort,
	setCurrentSort,
	appWidth,
	appTheme,
}) => {
	const router = useRouter()
	const pathname = usePathname()

	const [isSelected, setIsSelected] = useState<boolean>(false)

	const isLatest = title.toLowerCase === 'latest'
	const isBurns = title.toLowerCase === 'burns'
	const isTrending = title.toLowerCase === 'trending'
	const isPraises = title.toLowerCase === 'praises'

	const isMobile = appWidth < 768
	const isTablet = appWidth >= 768 && appWidth < 1024
	const isDesktop = appWidth >= 1024

	const isLight = appTheme === 'light'
	const currentTheme = isLight ? themeDefault : themeDark

	useEffect(() => {
		setIsSelected(currentSort === title.toLowerCase())
	}, [isSelected])

	const textSize = useMemo(() => {
		switch (appWidth) {
			case isMobile:
				return isLight ? styles.textSize : styles.textSizeDark
			case isTablet:
				return isLight ? styles.textSize : styles.textSizeDark
			case isDesktop:
				return isLight ? styles.textSize : styles.textSizeDark
			default:
				return isLight ? styles.textSize : styles.textSizeDark
		}
	}, [isLight, appWidth])

	const bgColor: string = useMemo(
		(currentSort): string => {
			console.log({ currentSort })

			switch (currentSort) {
				case 'latest':
					return isLight ? styles.sortSelected : styles.sortSelectedDark
				case 'burns':
					return isLight ? styles.sortSelected : styles.sortSelectedDark
				case 'trending':
					return isLight ? styles.sortSelected : styles.sortSelectedDark
				case 'praises':
					return isLight ? styles.sortSelected : styles.sortSelectedDark
				default:
					return ''
			}
		},
		[currentSort, isLight]
	)

	const sortIcon = useMemo(
		(currentSort): string => {
			console.log({ currentSort })
			switch (currentSort) {
				case 'latest':
					return <></>
				case 'burns':
					return isBurns ? burnFilled : burnGray
				case 'trending':
					return isTrending ? <BiTrendingUp /> : <BiTrendingUp />
				case 'praises':
					return isPraises ? praiseFilled : praiseGray
				default:
					return ''
			}
		},
		[currentSort]
	)

	const handleColorPrimary = useMemo((): string => {
		switch (appTheme) {
			case 'light':
				return '#f2f2f2'
			case 'dark':
				return '#272727'
		}
	}, [appTheme])

	const burnGray = (
		<span
			className={`${textSize}`}
			style={{
				filter: 'grayscale(1)',
			}}
		>
			{'🔥'}
		</span>
	)

	const menuClick = (): void => {
		console.log(`menu click: ${title}`)
		setCurrentSort(title.toLowerCase())
	}

	console.log({ appTheme })
	console.log({ isLight })
	console.log({ title })
	console.log({ isSelected })
	console.log(bgColor)
	console.log(sortIcon)
	console.log(currentSort)
	console.log({ pathname })

	return (
		<div>
			<ConfigProvider
				theme={{
					// algorithm: currentTheme,
					token: {
						colorPrimary: isLight ? 'lightgray' : '#f2f2f2',
					},
				}}
			>
				<Button
					type='primary'
					className={`${styles.sortBtn} ${bgColor}`}
					icon={sortIcon}
					onClick={() => menuClick}
				>
					<Text strong>{title}</Text>
				</Button>
			</ConfigProvider>
		</div>
	)
}

export default SortButton