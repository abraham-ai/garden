import React, { useState, useContext, useMemo } from 'react'
import type { FC } from 'react'
import AppContext from '../../../context/AppContext'
import axios from 'axios'
import { useConnectModal } from '@rainbow-me/rainbowkit'

import { Button, Typography } from 'antd'
const { Text } = Typography

interface PraiseButtonProps {
	creationId: string
	praises: number
	isPraised: boolean
	setIsPraised: (value: boolean, updatedPraises: number) => void
	appWidth: number
	layout: string
	page: string
}

const PraiseButton: FC<PraiseButtonProps> = ({
	creationId,
	praises,
	isPraised,
	setIsPraised,
	appWidth,
	layout = 'relative',
	page = 'creationId',
}) => {
	const context = useContext(AppContext)
	const isSignedIn = context?.isSignedIn ?? false
	const isWalletConnected = context?.isWalletConnected ?? false
	const setIsSignInModalOpen = context?.setIsSignInModalOpen ?? (() => {})
	const currentTheme = context?.currentTheme ?? 'light'

	const [isPraiseHovering, setIsPraiseHovering] = useState(false)

	const { openConnectModal } = useConnectModal()

	const isMobile = appWidth < 768
	const isTablet = appWidth >= 768 && appWidth <= 1024

	const handlePraise = async (): Promise<void> => {
		if (!isSignedIn && isWalletConnected) {
			setIsSignInModalOpen(true)
			await Promise.resolve()
		} else if (!isSignedIn && !isWalletConnected) {
			openConnectModal?.() ?? (() => null)()
			await Promise.resolve()
		} else if (isSignedIn && !isWalletConnected) {
			openConnectModal?.() ?? (() => null)()
			await Promise.resolve()
		} else {
			const newIsPraised = !isPraised
			const updatedPraises = newIsPraised ? praises + 1 : praises - 1
			setIsPraised(newIsPraised, updatedPraises)

			try {
				console.log('going to unreact', isPraised)
				await axios.post('/api/react', {
					creationId,
					reaction: '🙌',
					unreact: isPraised,
				})
			} catch (error) {
				setIsPraised(!newIsPraised, praises)
				console.error('Error updating praise:', error)
			}
		}
	}

	const textSize = useMemo(() => {
		if (isMobile) {
			return '1rem'
		} else if (page === 'creationId' && layout === 'relative') {
			return '1rem'
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
			return 60
		} else if (page === 'creationId' && layout === 'relative') {
			return 60
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
			return 50
		}
	}, [isMobile, isTablet, layout, page])

	const praiseGray = (
		<span
			style={{
				filter: 'grayscale(1)',
				fontSize: textSize,
				marginBottom: 6,
			}}
		>
			{'🙌'}
		</span>
	)

	const praiseFilled = (
		<span style={{ fontSize: textSize, marginBottom: 6 }}>{'🙌'}</span>
	)

	const handleMouseOver = (): void => {
		setIsPraiseHovering(true)
	}

	const handleMouseOut = (): void => {
		setIsPraiseHovering(false)
	}

	const isMobileThemeLight = isMobile && currentTheme === 'light'

	return (
		<div
			className='socialButtonWrapper'
			style={{
				position: isMobile ? 'relative' : 'relative',
				margin: isMobile ? 'unset' : 'unset',
				alignItems: isMobile ? 'center' : 'center',
				display: 'flex',
			}}
		>
			<Button
				className={isPraised ? 'crPraise isActive' : 'crPraise'}
				shape='round'
				size={buttonSize}
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					background: isMobile ? 'transparent' : 'rgba(0, 0, 0, 0.5)',
					width: buttonWidth,
					height: buttonHeight,
					border: 'none',
					transition: '1s',
				}}
				onClick={async () => {
					await handlePraise()
				}}
				onMouseOver={handleMouseOver}
				onMouseOut={handleMouseOut}
			>
				<span
					className='social-icon'
					style={{ display: 'flex', alignItems: 'center' }}
				>
					{isPraised || isPraiseHovering ? praiseFilled : praiseGray}
				</span>
				<Text
					style={{
						color: isMobileThemeLight ? 'black' : 'white',
						filter: isMobileThemeLight
							? 'transparent'
							: 'drop-shadow(3px 3px 3px rgb(0 0 0 / 0.4))',
						marginLeft: 10,
						fontWeight: isMobileThemeLight ? 'regular' : 'bold',
					}}
				>
					{isNaN(praises) ? 0 : praises}
				</Text>
			</Button>
		</div>
	)
}

export default PraiseButton
