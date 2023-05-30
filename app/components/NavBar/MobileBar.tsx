import type { FC } from 'react'
import React, { useContext } from 'react'
import AppContext from '../../../context/AppContext'
import { Row, Typography, Button, ConfigProvider } from 'antd'
import themeDefault from '../../../themes/themeDefault'
import themeDark from '../../../themes/themeDark'
import styles from '../../../styles/MobileBar.module.css'

import { HiOutlineUsers, HiHome } from 'react-icons/hi'
import { BsGrid3X3, BsPlusLg } from 'react-icons/bs'

import { IoMdGitNetwork } from 'react-icons/io'
const { Text } = Typography

const MobileBar: FC = () => {
	const context = useContext(AppContext)
	const appTheme = context?.appTheme ?? 'light'

	const isLight = appTheme === 'light'
	const currentTheme = isLight ? themeDefault : themeDark

	const bgColor = isLight ? styles.bgLight : styles.bgDark

	return (
		<Row className={`${bgColor} ${styles.mobileBarWrapper}`}>
			<ConfigProvider
				theme={{
					algorithm: currentTheme,
					token: {
						colorPrimary: isLight ? '#f2f2f2' : '#272727',
					},
				}}
			>
				<Button type='text' className={styles.mobileMenuBtn}>
					<HiHome className={styles.mobileMenuIcon} />
					<Text className={styles.mobileMenuText}>{'Creations'}</Text>
				</Button>
			</ConfigProvider>

			<ConfigProvider
				theme={{
					algorithm: currentTheme,
					token: {
						colorPrimary: isLight ? '#f2f2f2' : '#272727',
					},
				}}
			>
				<Button type='text' className={styles.mobileMenuBtn}>
					<HiOutlineUsers className={styles.mobileMenuIcon} />
					<Text className={styles.mobileMenuText}>{'Creators'}</Text>
				</Button>
			</ConfigProvider>

			<ConfigProvider
				theme={{
					algorithm: currentTheme,
					token: {
						colorPrimary: isLight ? 'black' : 'white',
					},
				}}
			>
				<Button
					type='primary'
					icon={<BsPlusLg className={styles.mobileMenuCreateIcon} />}
					className={styles.mobileMenuCreateBtn}
				></Button>
			</ConfigProvider>

			<ConfigProvider
				theme={{
					algorithm: currentTheme,
					token: {
						colorPrimary: isLight ? '#f2f2f2' : '#272727',
					},
				}}
			>
				<Button type='text' className={styles.mobileMenuBtn}>
					<BsGrid3X3 className={styles.mobileMenuIcon} />
					<Text className={styles.mobileMenuText}>{'Collections'}</Text>
				</Button>
			</ConfigProvider>

			<ConfigProvider
				theme={{
					algorithm: currentTheme,
					token: {
						colorPrimary: isLight ? '#f2f2f2' : '#272727',
					},
				}}
			>
				<Button type='text' className={styles.mobileMenuBtn}>
					<IoMdGitNetwork className={styles.mobileMenuIcon} />
					<Text className={styles.mobileMenuText}>{'Concepts'}</Text>
				</Button>
			</ConfigProvider>
		</Row>
	)
}

export default MobileBar
