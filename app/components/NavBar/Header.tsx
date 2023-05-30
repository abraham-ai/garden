'use client'

import type { FC, MouseEvent, ReactNode } from 'react'

import React, { useState, useEffect, useContext } from 'react'
import AppContext from '../../../context/AppContext'
import Image from 'next/image'
import Link from 'next/link'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { useRouter, usePathname } from 'next/navigation'
import useWindowDimensions from '../../../hooks/useWindowDimensions'

import styles from '../../../styles/Header.module.css'

import MobileBar from './MobileBar'
import DesktopMenu from './DesktopMenu'
import MenuButton from './MenuButton'
import CreateButton from './CreateButton'
import MannaMenu from './MannaMenu/MannaMenu'
import MannaMenuPopOver from './MannaMenu/MannaMenuPopOver'
import SettingsMenu from './SettingsMenu/SettingsMenu'
import SettingsMenuPopOver from './SettingsMenu/SettingsMenuPopOver'
import MyProfileButton from './MyProfileButton'

import ConnectButtonCustom from './ConnectButtonCustom'
import EthereumVerify from '../Ethereum/EthereumVerify'
import SignInModal from './SignInModal'
import CreateModal from '../Create/CreateModal'
// import EthereumAuth from '../Ethereum/EthereumAuth'

import { Typography, Select, Space, Row, theme } from 'antd'
const themeDark = { algorithm: theme.darkAlgorithm }
const themeDefault = { algorithm: theme.defaultAlgorithm }
const { Text } = Typography

const Header: FC = () => {
	const [isMounted, setIsMounted] = useState<boolean>(false)

	const router = useRouter()

	const context = useContext(AppContext)
	const isSignedIn = context?.isSignedIn ?? false
	const isWalletConnected = context?.isWalletConnected ?? false
	const authToken = context?.authToken ?? ''
	const userId = context?.userId ?? ''

	const firstSignInRequest = context?.firstSignInRequest ?? false
	const setFirstSignInRequest = context?.setFirstSignInRequest ?? (() => {})
	const setIsSignInModalOpen = context?.setIsSignInModalOpen ?? (() => {})
	const currentTheme = context?.currentTheme ?? 'light'

	const { width: appWidth } = useWindowDimensions()

	useEffect(() => {
		setIsMounted(true)
	}, [])

	useEffect(() => {
		if (isMounted && !isSignedIn && !firstSignInRequest) {
			setFirstSignInRequest(true)
		}
	}, [isMounted, firstSignInRequest])

	useEffect(() => {
		if (!firstSignInRequest) {
			setIsSignInModalOpen(true)
		}
	}, [firstSignInRequest, setIsSignInModalOpen])

	const handleChange = (
		value: string,
		option: { value: string; label: string }
	): void => {
		// console.log(`selected ${value}`)
		if (value === 'garden') {
			router.push('/')
		} else {
			router.push(`/${value}`)
		}
	}

	const handleDefaultSelectValue = (): string => {
		const pathname = usePathname()

		// const { collection } = router.query
		// console.log('handleDefaultSelectValue')
		// console.log({ asPath })
		// console.log({ collection })

		// if (pathname === '/') {
		// 	return 'garden'
		// } else if (pathname === '/editprofile') {
		// 	return 'editprofile'
		// } else if (pathname === '/myprofile') {
		// 	return 'myprofile'
		// } else if (pathname === '/mycollections') {
		// 	return 'mycollections'
		// } else if (pathname.includes('/collection')) {
		// 	return 'mycollections'
		// } else {
		// 	return 'garden'
		// }
		return 'garden'
	}

	const handleSelectOptions = (): Array<{ value: string; label: string }> => {
		if (isSignedIn) {
			return [
				{ value: 'garden', label: 'Garden' },
				{ value: 'myprofile', label: 'My Profile' },
				{ value: 'mycollections', label: 'My Collections' },
				{ value: 'editprofile', label: 'Edit Profile' },
			]
		} else {
			return [{ value: 'garden', label: 'Garden' }]
		}
	}

	const isThemeLight = currentTheme === 'light'
	const textThemeColor = { color: isThemeLight ? 'black' : 'white' }
	const isUserId = typeof userId !== 'undefined' && userId !== ''

	// console.log({ isThemeLight })
	// console.log({ firstSignInRequest })
	// console.log({ userId })

	const rowStyle = { display: 'flex', alignItems: 'center' }

	return (
		<>
			<header className={styles.headerWrapper}>
				<ul className={styles.linksWrapper}>
					<EthereumVerify />

					{isMounted && appWidth > 1280 ? (
						<>
							{isUserId ? (
								<>
									{/* <ActiveLink href='/myprofile'>
									<Text style={textThemeColor}>{'My Profile'}</Text>
								</ActiveLink>
								<ActiveLink href='/mycollections'>
									<Text style={textThemeColor}>{'My Collections'}</Text>
								</ActiveLink> */}
								</>
							) : null}
						</>
					) : isMounted && isSignedIn ? (
						isWalletConnected ? (
							<Space wrap>
								<Select
									className='navbarSelect'
									defaultValue={handleDefaultSelectValue()}
									style={{ width: 150, border: 'none', textAlign: 'center' }}
									onChange={handleChange}
									options={handleSelectOptions()}
								/>
							</Space>
						) : null
					) : null}
				</ul>

				<section className={styles.authSectionStyle}>
					<Row style={rowStyle}>
						<Link href='/' style={{ zIndex: 100 }}>
							<Image
								src={'/eden-logo-512x512.png'}
								width={40}
								height={40}
								alt={'Eden logo'}
							/>
						</Link>

						<DesktopMenu />
					</Row>

					<Row>
						<CreateButton />
						<MannaMenu content={<MannaMenuPopOver />} />
						<SettingsMenu content={<SettingsMenuPopOver />} />
						{isMounted && isSignedIn && isWalletConnected ? (
							<MyProfileButton />
						) : (
							<Row className={styles.popoverConnectWrapper}>
								<ConnectButtonCustom
									appWidth={appWidth}
									isMounted={isMounted}
								/>
							</Row>
						)}
					</Row>
				</section>

				<CreateModal isMounted={isMounted} appWidth={appWidth} />
				<SignInModal isMounted={isMounted} appWidth={appWidth} />
			</header>
		</>
	)
}

export default Header
