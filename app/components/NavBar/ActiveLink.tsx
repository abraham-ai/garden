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

import MyProfileButton from './MyProfileButton'
import ConnectButtonCustom from './ConnectButtonCustom'
import SettingsMenuPopOver from './SettingsMenuPopOver'
import SignInModal from './SignInModal'
import MenuButton from './MenuButton'
import SettingsMenu from './SettingsMenu'
import EthereumVerify from '../Ethereum/EthereumVerify'
// import EthereumAuth from '../Ethereum/EthereumAuth'

import { Typography, Button, Select, Space, Row, theme } from 'antd'
// import { BsGear } from 'react-icons/bs'
const themeDark = { algorithm: theme.darkAlgorithm }
const themeDefault = { algorithm: theme.defaultAlgorithm }

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

	const { openConnectModal } = useConnectModal()

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

	// console.log({ isSignedIn, isWalletConnected })

	return (
		<Button
			type='text'
			size='large'
			shape='round'
			onClick={(e) => {
				handleClick(e)
			}}
			style={linkStyle}
		>
			{children}
		</Button>
	)
}

export default ActiveLink
