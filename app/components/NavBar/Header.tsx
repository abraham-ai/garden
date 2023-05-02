'use client'

import React, { useState, useEffect, useContext, useMemo } from 'react'
import type { FC, MouseEvent } from 'react'
import AppContext from '../../../context/AppContext'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import useWindowDimensions from '../../../hooks/useWindowDimensions'
import abbreviateAddress from '../../../util/abbreviateAddress'
import abbreviateText from '../../../util/abbreviateText'

// import { ConnectButton } frsom '@rainbow-me/rainbowkit'
import ConnectButtonCustom from './ConnectButtonCustom'

import styles from '../../../styles/Header.module.css'

import SettingsMenuPopOver from './SettingsMenuPopOver'
import SignInModal from './SignInModal'
import EthereumVerify from '../EthereumVerify'
// import EthereumAuth from '../EthereumAuth'

import {
	// Tooltip,
	Typography,
	Popover,
	Button,
	Select,
	Space,
	Badge,
	Row,
} from 'antd'
import { BsGear } from 'react-icons/bs'

const { Text } = Typography

interface ActiveLinkProps {
	children: React.ReactNode
	href: string
}

const ActiveLink: FC<ActiveLinkProps> = ({ children, href }) => {
	const router = useRouter()
	const { asPath } = router

	const linkStyle = {
		marginRight: 10,
		color: asPath === href ? 'purple' : 'gray',
		fontWeight: asPath === href ? 'bolder' : 'regular',
	}

	const handleClick = (e: MouseEvent<HTMLAnchorElement>): void => {
		e.preventDefault()
		router.push(href)
	}

	return (
		<Button
			type='text'
			size='large'
			shape='round'
			href={href}
			onClick={() => handleClick}
			style={linkStyle}
		>
			{children}
		</Button>
	)
}

const Header: FC = () => {
	const [isMounted, setIsMounted] = useState<boolean>(false)
	const [firstSignInRequest, setFirstSignInRequest] = useState<boolean>(false)

	const router = useRouter()

	const context = useContext(AppContext)
	const isWalletConnected = context?.isWalletConnected ?? false
	const authToken = context?.authToken ?? ''
	const userId = context?.userId ?? ''
	const isSignedIn = context?.isSignedIn ?? false
	const setIsSignInModalOpen = context?.setIsSignInModalOpen ?? (() => {})
	const currentTheme = context?.currentTheme ?? 'light'

	const { width } = useWindowDimensions()

	const isMobile = width < 768

	useEffect(() => {
		setIsMounted(true)
	}, [])

	useEffect(() => {
		if (isMounted && !isSignedIn && !firstSignInRequest) {
			setFirstSignInRequest(true)
		}
	}, [isMounted, firstSignInRequest])

	useEffect(() => {
		if (firstSignInRequest) {
			setIsSignInModalOpen(true)
		}
	}, [firstSignInRequest, setIsSignInModalOpen])

	let displayAddress = ''
	if (typeof userId === 'string') {
		displayAddress = abbreviateAddress(userId)
	}

	let displayAuthToken = ''
	if (typeof authToken === 'string') {
		displayAuthToken = abbreviateText(authToken, 80)
	}

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
		} else if (asPath === '/mycreations') {
			return 'mycreations'
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
				{ value: 'mycreations', label: 'My Creations' },
				{ value: 'mycollections', label: 'My Collections' },
				{ value: 'editprofile', label: 'Edit Profile' },
			]
		} else {
			return [{ value: 'garden', label: 'Garden' }]
		}
	}

	const handleBadgeCount = (): number => {
		if (isWalletConnected && !isSignedIn) {
			return 1
		} else if (isWalletConnected && isSignedIn) {
			return 0
		} else {
			return 0
		}
	}

	const isThemeLight = currentTheme === 'light'
	const textThemeColor = { color: isThemeLight ? 'black' : 'white' }

	// console.log({ isThemeLight })

	return (
		<header className={styles.headerWrapper}>
			<ul className={styles.linksWrapper}>
				<EthereumVerify />

				{isMounted && width > 1280 ? (
					<>
						{/* <ActiveLink href='/'>
							<Text>{'Garden'}</Text>
						</ActiveLink> */}
						{userId !== 'undefined' ? (
							<>
								<ActiveLink href='/mycreations'>
									<Text style={textThemeColor}>{'My Creations'}</Text>
								</ActiveLink>
								<ActiveLink href='/mycollections'>
									<Text style={textThemeColor}>{'My Collections'}</Text>
								</ActiveLink>
								{/* <ActiveLink href='/profile'>
									<Text>{'Edit Profile'}</Text>
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
								style={{ width: 150, border: 'none' }}
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
					{/* <span
						style={{
							display: `${isMobile && isMounted ? 'none' : 'flex'}`,
							alignItems: 'center',
						}}
					>
						<Popover
							content={
								<SettingsMenuPopOver
									isWalletConnected={isWalletConnected}
									userId={userId}
									displayAddress={displayAddress}
									isSignedIn={isSignedIn}
									authToken={authToken}
									displayAuthToken={displayAuthToken}
									isMobile={isMobile}
								/>
							}
							trigger='click'
							placement='bottom'
						>
							<Tooltip placement='bottom' title={<Text>{'Settings'}</Text>}>
							<Button type='link' shape='circle' style={{ marginRight: 10 }}>
								<Badge count={handleBadgeCount()}>
									<BsGear style={{ fontSize: '1.5rem' }} />
								</Badge>
							</Button>
							</Tooltip>
						</Popover>
					</span> */}

					{/* <ConnectButton /> */}
					<ConnectButtonCustom isMobile={isMobile} isMounted={isMounted} />
				</Row>
			</section>

			<SignInModal isMobile={isMobile} />
		</header>
	)
}

export default Header
