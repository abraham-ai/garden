import React, { useContext, useState } from 'react'
import type { FC } from 'react'

import AppContext from '../../../context/AppContext'

import type Creation from '../../../interfaces/Creation'

import { useConnectModal } from '@rainbow-me/rainbowkit'

import { Button, notification } from 'antd'
import type { NotificationPlacement } from 'antd/es/notification/interface'

import axios from 'axios'

import { RiBookmarkFill, RiBookmarkLine } from 'react-icons/ri'

import styles from '../../../styles/CreationSocial.module.css'

interface SaveButtonTypes {
	isBookmarked: boolean
	setIsBookmarked: (value: boolean) => void
	creation: Creation
	layout?: string
	isMobile: boolean
}

const SaveButton: FC<SaveButtonTypes> = ({
	isBookmarked,
	setIsBookmarked,
	creation,
	isMobile,
}) => {
	const [isSaveHovering, setIsSaveHovering] = useState(false)

	const context = useContext(AppContext)

	const { openConnectModal } = useConnectModal()

	const isSignedIn = context?.isSignedIn ?? false
	const isWalletConnected = context?.isWalletConnected ?? false
	const setIsSignInModalOpen = context?.setIsSignInModalOpen ?? (() => {})

	const setCollectionModalView = context?.setCollectionModalView ?? (() => null)
	const collections = context?.collections ?? []
	const setCollections = context?.setCollections ?? (() => {})
	const currentTheme = context?.currentTheme ?? 'light'

	const setIsSaveCreationModalOpen =
		context?.setIsSaveCreationModalOpen ?? (() => {})
	const setCurrentCreationModalCreation =
		context?.setCurrentCreationModalCreation ?? (() => {})

	// console.log({ isSignedIn })

	const handleSave = (): void => {
		// console.log({ isSignedIn })
		if (!isSignedIn && !isWalletConnected) {
			openConnectModal?.() ?? (() => null)()
		} else if (!isSignedIn && isWalletConnected) {
			setIsSignInModalOpen(true)
		} else if (isSignedIn && isWalletConnected) {
			console.log('handle SAVE 🔖!')
			setIsBookmarked(!isBookmarked)
			// showSaveNotification()
			setIsSaveCreationModalOpen(true)
			setCurrentCreationModalCreation(creation)
			setCollectionModalView('first-modal')
		}
	}

	const handleMouseOver = (): void => {
		// console.log('handleMouseOver')
		setIsSaveHovering(true)
	}

	const handleMouseOut = (): void => {
		// console.log('handleMouseOut')
		setIsSaveHovering(false)
	}

	const bgHoverStyles = isSaveHovering
		? 'rgb(26, 115, 232, 0.4)'
		: 'rgba(0, 0, 0, 0.5)'

	const isMobileThemeLight = isMobile && currentTheme === 'light'

	return (
		<>
			<span
				className='crSocial bookmark'
				style={{
					display: 'flex',
					width: '100%',
					justifyContent: 'space-between',
					margin: isMobile ? '0 0 5px 25px' : 'unset',
				}}
				onMouseOver={handleMouseOver}
				onMouseOut={handleMouseOut}
			>
				<Button
					className='btn'
					shape={'circle'}
					type='link'
					onClick={() => {
						handleSave()
					}}
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						background: isMobileThemeLight ? 'transparent' : bgHoverStyles,
						width: isMobile ? 30 : 50,
						height: isMobile ? 30 : 50,
						border: 'none',
						transition: '300ms',
					}}
				>
					{isBookmarked || isSaveHovering ? (
						<RiBookmarkFill
							className={styles.crSocialIcon}
							style={{
								fontSize: '1rem',
								minWidth: isMobile ? 15 : 25,
								minHeight: isMobile ? 15 : 25,
								color: '#1a73e8',
							}}
						/>
					) : (
						<RiBookmarkLine
							className={styles.crSocialIcon}
							style={{
								fontSize: '1rem',
								minWidth: isMobile ? 15 : 25,
								minHeight: isMobile ? 15 : 25,
								color: isMobileThemeLight ? 'black' : 'white',
							}}
						/>
					)}
				</Button>
			</span>
		</>
	)
}

export default SaveButton
