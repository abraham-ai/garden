import React, { useState, useContext } from 'react'
import type { FC } from 'react'

import AppContext from '../../../context/AppContext'
import axios from 'axios'

import { Button, Typography } from 'antd'
const { Text } = Typography

interface PraiseButtonTypes {
	creationId: string
	praisesData: number
	isPraisedData: boolean
	setIsPraised: (value: boolean, updatedPraises: number) => void
}

const PraiseButton: FC<PraiseButtonTypes> = ({
	creationId,
	praisesData,
	isPraisedData,
	setIsPraised,
}: PraiseButtonTypes) => {
	const context = useContext(AppContext)
	const isSignedIn = context?.isSignedIn || false
	const isWalletConnected = context?.isWalletConnected || false

	const [isPraiseHovering, setIsPraiseHovering] = useState(false)

	const handlePraise = async (): Promise<void> => {
		if (!isSignedIn) {
			return null
		} else if (isSignedIn && !isWalletConnected) {
			return null
		} else {
			const newIsPraised = !isPraisedData
			const updatedPraises = newIsPraised ? praisesData + 1 : praisesData - 1

			setIsPraised(newIsPraised, updatedPraises)

			try {
				await axios.post('/api/react', {
					creationId,
					reaction: '🙌',
				})
			} catch (error) {
				setIsPraised(!newIsPraised, praisesData)
				console.error('Error updating praise:', error)
			}
		}
	}

	const praiseGray = (
		<span
			style={{ filter: 'grayscale(1)', fontSize: '1.8rem', marginBottom: 6 }}
		>
			{'🙌'}
		</span>
	)

	const praiseFilled = (
		<span style={{ fontSize: '1.8rem', marginBottom: 6 }}>{'🙌'}</span>
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
			style={{ display: 'flex', alignItems: 'center' }}
		>
			<Button
				className={isPraisedData ? 'crPraise isActive' : 'crPraise'}
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
					await handlePraise()
				}}
				onMouseOver={handleMouseOver}
				onMouseOut={handleMouseOut}
			>
				<span
					className='social-icon'
					style={{ display: 'flex', alignItems: 'center' }}
				>
					{isPraisedData || isPraiseHovering ? praiseFilled : praiseGray}
				</span>
				<Text
					style={{
						color: 'white',
						filter: 'drop-shadow(3px 3px 3px rgb(0 0 0 / 0.4))',
						marginLeft: 10,
						fontWeight: 'bold',
					}}
				>
					{praisesData}
				</Text>
			</Button>
		</div>
	)
}

export default PraiseButton
