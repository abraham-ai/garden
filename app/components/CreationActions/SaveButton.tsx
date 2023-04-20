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
}

const SaveButton: FC<SaveButtonTypes> = ({
	isBookmarked,
	setIsBookmarked,
	creation,
}) => {
	const [isSaveHovering, setIsSaveHovering] = useState(false)

	const context = useContext(AppContext)

	const { openConnectModal } = useConnectModal()

	const isSignedIn = context?.isSignedIn || false
	const isWalletConnected = context?.isWalletConnected || false

	const setCollectionModalView = context?.setCollectionModalView ?? (() => {})
	const collections = context?.collections ?? []
	const setCollections = context?.setCollections ?? (() => {})

	const setIsSaveCreationModalOpen =
		context?.setIsSaveCreationModalOpen ?? (() => {})
	const setCurrentCreationModalCreation =
		context?.setCurrentCreationModalCreation ?? (() => {})

	// console.log({ isSignedIn })

	const handleSave = (): void => {
		// console.log({ isSignedIn })
		if (!isSignedIn && !isWalletConnected) {
			openConnectModal?.() ?? (() => null)()
		} else if (isSignedIn && isWalletConnected) {
			console.log('handle SAVE 🔖!')
			setIsBookmarked(!isBookmarked)
			// showSaveNotification()
			setIsSaveCreationModalOpen(true)
			setCurrentCreationModalCreation(creation)
			setCollectionModalView(0)
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

	return (
		<>
			<span
				className='crSocial bookmark'
				style={{
					display: 'flex',
					width: '100%',
					justifyContent: 'space-between',
					marginBottom: 5,
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
						background: bgHoverStyles,
						width: 50,
						height: 50,
						border: 'none',
						transition: '300ms',
					}}
				>
					{isBookmarked || isSaveHovering ? (
						<RiBookmarkFill
							className={styles.crSocialIcon}
							style={{
								fontSize: '1rem',
								minWidth: 25,
								minHeight: 25,
								color: '#1a73e8',
							}}
						/>
					) : (
						<RiBookmarkLine
							className={styles.crSocialIcon}
							style={{ fontSize: '1rem', minWidth: 25, minHeight: 25 }}
						/>
					)}
				</Button>
			</span>
		</>
	)
}

export default SaveButton
