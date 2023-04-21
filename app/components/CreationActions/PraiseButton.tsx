import React, { useState, useContext } from 'react'
import type { FC } from 'react'
import AppContext from '../../../context/AppContext'
import axios from 'axios'
import { useConnectModal } from '@rainbow-me/rainbowkit'

import { Button, Typography } from 'antd'
const { Text } = Typography

interface PraiseButtonTypes {
	creationId: string
	praises: number
	isPraised: boolean
	setIsPraised: (value: boolean, updatedPraises: number) => void
	layout: string
}

const PraiseButton: FC<PraiseButtonTypes> = ({
	creationId,
	praises,
	isPraised,
	setIsPraised,
	layout,
}) => {
	const context = useContext(AppContext)
	const isSignedIn = context?.isSignedIn ?? false
	const isWalletConnected = context?.isWalletConnected ?? false

	const [isPraiseHovering, setIsPraiseHovering] = useState(false)

	const { openConnectModal } = useConnectModal()

	const isLayoutMinimal = layout === 'minimal'

	const handlePraise = async (): Promise<void> => {
		if (!isSignedIn && isWalletConnected) {
			await Promise.resolve()
		} else if (!isSignedIn && !isWalletConnected) {
			openConnectModal?.() ?? (() => null)()
			await Promise.resolve()
		} else if (isSignedIn && !isWalletConnected) {
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

	const praiseGray = (
		<span
			style={{
				filter: 'grayscale(1)',
				fontSize: isLayoutMinimal ? '1rem' : '1.8rem',
				marginBottom: 6,
			}}
		>
			{'🙌'}
		</span>
	)

	const praiseFilled = (
		<span
			style={{ fontSize: isLayoutMinimal ? '1rem' : '1.8rem', marginBottom: 6 }}
		>
			{'🙌'}
		</span>
	)

	const handleMouseOver = (): void => {
		setIsPraiseHovering(true)
	}

	const handleMouseOut = (): void => {
		setIsPraiseHovering(false)
	}

	return (
		<div
			className='socialButtonWrapper'
			style={{
				position: isLayoutMinimal ? 'relative' : 'relative',
				margin: isLayoutMinimal ? 'unset' : 'unset',
				alignItems: isLayoutMinimal ? 'center' : 'center',
				display: 'flex',
			}}
		>
			<Button
				className={isPraised ? 'crPraise isActive' : 'crPraise'}
				shape='round'
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					background: 'rgba(0, 0, 0, 0.5)',
					width: isLayoutMinimal ? 60 : 100,
					height: isLayoutMinimal ? 30 : 50,
					border: 'none',
					transition: '1s',
				}}
				onClick={() => handlePraise}
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
						color: 'white',
						filter: 'drop-shadow(3px 3px 3px rgb(0 0 0 / 0.4))',
						marginLeft: 10,
						fontWeight: 'bold',
					}}
				>
					{praises}
				</Text>
			</Button>
		</div>
	)
}

export default PraiseButton
