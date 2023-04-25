import React, { useState, useContext } from 'react'
import type { FC } from 'react'
import AppContext from '../../../context/AppContext'
import axios from 'axios'
import { useConnectModal } from '@rainbow-me/rainbowkit'

import { Button, Typography } from 'antd'
const { Text } = Typography

interface BurnButtonTypes {
	creationId: string
	burns: number
	isBurned: boolean
	setIsBurned: (isBurned: boolean, updatedBurns: number) => void
	layout?: string
	isMobile?: boolean
}

const BurnButton: FC<BurnButtonTypes> = ({
	creationId,
	burns,
	isBurned,
	setIsBurned,
	layout = 'default',
	isMobile,
}) => {
	const context = useContext(AppContext)
	const isSignedIn = context?.isSignedIn ?? false
	const isWalletConnected = context?.isWalletConnected ?? false
	const setIsSignInModalOpen = context?.setIsSignInModalOpen ?? (() => {})
	const currentTheme = context?.currentTheme ?? 'light'

	const { openConnectModal } = useConnectModal()

	const [isBurnHovering, setIsBurnHovering] = useState<boolean>(false)

	// console.log('Burn Button: CreationId: ' + creationId)

	const handleBurn = async (): Promise<void> => {
		console.log({ isSignedIn, isWalletConnected })

		if (isSignedIn && isWalletConnected) {
			console.log({ isSignedIn, isWalletConnected })
			const newIsBurned = !isBurned
			const updatedBurns = newIsBurned ? burns + 1 : burns - 1
			setIsBurned(newIsBurned, updatedBurns)

			try {
				await axios.post('/api/react', {
					creationId,
					reaction: '🔥',
					unreact: isBurned,
				})
			} catch (error) {
				setIsBurned(!newIsBurned, burns)
				console.error('Error updating praise:', error)
			}
		} else if (!isSignedIn && !isWalletConnected) {
			openConnectModal?.() ?? (() => null)()
		} else if (!isSignedIn && isWalletConnected) {
			setIsSignInModalOpen(true)
		}
	}

	const burnGray = (
		<span
			style={{
				filter: 'grayscale(1)',
				fontSize: isMobile ? '1rem' : '1.8rem',
			}}
		>
			{'🔥'}
		</span>
	)

	const burnFilled = (
		<span style={{ fontSize: isMobile ? '1rem' : '1.8rem' }}>{'🔥'}</span>
	)

	const handleMouseOver = (): void => {
		console.log('handleMouseOver')
		setIsBurnHovering(true)
	}

	const handleMouseOut = (): void => {
		console.log('handleMouseOut')
		setIsBurnHovering(false)
	}

	// console.log(isBurned)

	const isMobileThemeLight = isMobile && currentTheme === 'light'

	return (
		<div
			className='socialButtonWrapper'
			style={{
				display: 'flex',
				alignItems: 'center',
				paddingRight: isMobile ? 10 : 10,
			}}
		>
			<Button
				className={isBurned ? 'crBurn isActive' : 'crBurn'}
				size='large'
				type='text'
				shape='round'
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: isMobile ? 'flex-start' : 'center',
					background: isMobile ? 'transparent' : 'rgba(0, 0, 0, 0.5)',
					width: isMobile ? 60 : 100,
					height: isMobile ? 30 : 50,
					padding: isMobile ? '10px 0' : 10,
					border: 'none',
					transition: '1s',
				}}
				onClick={async () => {
					await handleBurn()
				}}
				onMouseOver={handleMouseOver}
				onMouseOut={handleMouseOut}
			>
				<span
					className='social-icon'
					style={{ display: 'flex', alignItems: 'center' }}
				>
					{isBurned || isBurnHovering ? burnFilled : burnGray}
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
					{isNaN(burns) ? 0 : burns}
				</Text>
			</Button>
		</div>
	)
}

export default BurnButton
