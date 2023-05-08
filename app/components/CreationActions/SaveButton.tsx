import React, { useContext, useState, useMemo } from 'react'
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
	page?: string
	appWidth: number
}

const SaveButton: FC<SaveButtonTypes> = ({
	isBookmarked,
	setIsBookmarked,
	creation,
	appWidth,
	layout = 'relative',
	page = 'creationId',
}) => {
	const [isSaveHovering, setIsSaveHovering] = useState(false)

	const context = useContext(AppContext)

	const { openConnectModal } = useConnectModal()

	const isMobile = appWidth < 768
	const isTablet = appWidth >= 768 && appWidth <= 1024

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
		} else if (isSignedIn && !isWalletConnected) {
			openConnectModal?.() ?? (() => null)()
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

	const textSize = useMemo(() => {
		if (isMobile) {
			return '1rem'
		} else if (page === 'creationId' && layout === 'relative') {
			return '.8rem'
		} else {
			return '1.8rem'
		}
	}, [isMobile, isTablet, layout, page])

	const buttonSize = useMemo(() => {
		if (isMobile) {
			return 'small'
		} else if (page === 'creationId' && layout === 'relative') {
			return 'small'
		} else {
			return 'large'
		}
	}, [isMobile, isTablet, layout, page])

	const buttonWidth = useMemo(() => {
		if (isMobile) {
			return 30
		} else if (page === 'creationId' && layout === 'relative') {
			return 30
		} else {
			return 100
		}
	}, [isMobile, isTablet, layout, page])

	const buttonHeight = useMemo(() => {
		if (isMobile) {
			return 30
		} else if (page === 'creationId' && layout === 'relative') {
			return 30
		} else {
			return 100
		}
	}, [isMobile, isTablet, layout, page])

	const iconSize = useMemo(() => {
		if (isMobile) {
			return 15
		} else if (page === 'creationId' && layout === 'relative') {
			return 18
		} else {
			return 25
		}
	}, [isMobile, isTablet, layout, page])

	// console.log({ iconSize })

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
					size={buttonSize}
					type='link'
					onClick={() => {
						handleSave()
					}}
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						background: isMobileThemeLight ? 'transparent' : bgHoverStyles,
						width: buttonWidth,
						height: buttonHeight,
						border: 'none',
						transition: '300ms',
					}}
				>
					{isBookmarked || isSaveHovering ? (
						<RiBookmarkFill
							className={styles.crSocialIcon}
							style={{
								fontSize: textSize,
								minWidth: iconSize,
								minHeight: iconSize,
								color: '#1a73e8',
							}}
						/>
					) : (
						<RiBookmarkLine
							className={styles.crSocialIcon}
							style={{
								fontSize: textSize,
								minWidth: iconSize,
								minHeight: iconSize,
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
