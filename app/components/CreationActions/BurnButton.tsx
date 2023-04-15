import React, { useState, useContext } from 'react'
import type { FC } from 'react'
import AppContext from '../../../context/AppContext'
import axios from 'axios'

import { Button, Typography } from 'antd'
const { Text } = Typography

interface BurnButtonTypes {
	creationId: string
	burns: number
	isBurned: boolean
	setIsBurned: (isBurned: boolean, updatedBurns: number) => void
}

const BurnButton: FC<BurnButtonTypes> = ({
	creationId,
	burns,
	isBurned,
	setIsBurned,
}) => {
	const context = useContext(AppContext)
	const isSignedIn = context?.isSignedIn || false
	const isWalletConnected = context?.isWalletConnected || false

	const [isBurnHovering, setIsBurnHovering] = useState<boolean>(false)

	const handleBurn = async (): Promise<void> => {
		if (!isSignedIn || !isWalletConnected) {
		} else {
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
		}
	}

	const burnGray = (
		<span style={{ filter: 'grayscale(1)', fontSize: '1.8rem' }}>{'🔥'}</span>
	)

	const burnFilled = <span style={{ fontSize: '1.8rem' }}>{'🔥'}</span>

	const handleMouseOver = (): void => {
		console.log('handleMouseOver')
		setIsBurnHovering(true)
	}

	const handleMouseOut = (): void => {
		console.log('handleMouseOut')
		setIsBurnHovering(false)
	}

	return (
		<div
			className='socialButtonWrapper'
			style={{ display: 'flex', alignItems: 'center' }}
		>
			<Button
				className={isBurned ? 'crBurn isActive' : 'crBurn'}
				size='large'
				type='text'
				shape='round'
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					background: 'rgba(0, 0, 0, 0.5)',
					width: 100,
					height: 50,
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
						color: 'white',
						filter: 'drop-shadow(3px 3px 3px rgb(0 0 0 / 0.4))',
						marginLeft: 10,
						fontWeight: 'bold',
					}}
				>
					{burns}
				</Text>
			</Button>
		</div>
	)
}

export default BurnButton
