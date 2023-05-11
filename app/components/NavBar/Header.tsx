'use client'

import type { FC, MouseEvent, ReactNode } from 'react'

import React, { useState, useEffect, useContext } from 'react'
import AppContext from '../../../context/AppContext'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import useWindowDimensions from '../../../hooks/useWindowDimensions'

import ConnectButtonCustom from './ConnectButtonCustom'

import styles from '../../../styles/Header.module.css'

// import SettingsMenuPopOver from './SettingsMenuPopOver'
import SignInModal from './SignInModal'
// import SettingsMenu from './SettingsMenu'
import EthereumVerify from '../Ethereum/EthereumVerify'
// import EthereumAuth from '../Ethereum/EthereumAuth'

import { Typography, Button, Select, Space, Row } from 'antd'
// import { BsGear } from 'react-icons/bs'

const { Text } = Typography

interface ActiveLinkProps {
	children: ReactNode
	href: string
}

const ActiveLink: FC<ActiveLinkProps> = ({ children, href }) => {
	const router = useRouter()
	const { asPath } = router

	const context = useContext(AppContext)
	const isSignedIn = context?.isSignedIn ?? false
	const isWalletConnected = context?.isWalletConnected ?? false
	const setIsSignInModalOpen = context?.setIsSignInModalOpen ?? (() => {})

	const linkStyle = {
		marginRight: 10,
		color: asPath === href ? 'purple' : 'gray',
		fontWeight: asPath === href ? 'bolder' : 'regular',
	}

	const handleClick = (e: MouseEvent<HTMLAnchorElement>): void => {
		console.log('handle Nav Link 🔖!')

		// console.log({ isSignedIn })
		if (!isSignedIn && !isWalletConnected) {
			openConnectModal?.() ?? (() => null)()
		} else if (!isSignedIn && isWalletConnected) {
			setIsSignInModalOpen(true)
		} else if (isSignedIn && !isWalletConnected) {
			openConnectModal?.() ?? (() => null)()
		} else if (isSignedIn && isWalletConnected) {
			console.log('handle Nav Link 🔖!')
			router.push(href).then(() => {
				window.scrollTo(0, 0)
			})
		}
	}

	console.log({ isSignedIn, isWalletConnected })

	return (
		<Button
			type='text'
			size='large'
			shape='round'
			onClick={() => {
				handleClick()
			}}
			style={linkStyle}
		>
			{children}
		</Button>
	)
}

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
		const { asPath } = router

		// const { collection } = router.query
		// console.log('handleDefaultSelectValue')
		// console.log({ asPath })
		// console.log({ collection })

		if (asPath === '/') {
			return 'garden'
		} else if (asPath === '/editprofile') {
			return 'editprofile'
		} else if (asPath === '/myprofile') {
			return 'myprofile'
		} else if (asPath === '/mycollections') {
			return 'mycollections'
		} else if (asPath.includes('/collection')) {
			return 'mycollections'
		} else {
			return 'garden'
		}
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

	// console.log({ isThemeLight })

	console.log({ firstSignInRequest })
	console.log({ userId })

	const isUserId = typeof userId !== 'undefined' && userId !== ''

	return (
		<header className={styles.headerWrapper}>
			<ul className={styles.linksWrapper}>
				<EthereumVerify />

				{isMounted && appWidth > 1280 ? (
					<>
						{isUserId ? (
							<>
								<ActiveLink href='/myprofile'>
									<Text style={textThemeColor}>{'My Profile'}</Text>
								</ActiveLink>
								<ActiveLink href='/mycollections'>
									<Text style={textThemeColor}>{'My Collections'}</Text>
								</ActiveLink>
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
				) : (
					<ActiveLink href='/'>
						<Text>{'Garden'}</Text>
					</ActiveLink>
				)}
			</ul>

			<section className={styles.authSectionStyle}>
				<Link href='/' style={{ zIndex: 100 }}>
					<Image
						src={'/eden-logo-512x512.png'}
						width={40}
						height={40}
						alt={'Eden logo'}
					/>
				</Link>

				<Row className={styles.popoverConnectWrapper}>
					<ConnectButtonCustom appWidth={appWidth} isMounted={isMounted} />
				</Row>
			</section>

			<SignInModal isMounted={isMounted} appWidth={appWidth} />
		</header>
	)
}

export default Header
