import React from 'react'
import type { FC } from 'react'

import styles from '../../../styles/Logo.module.css'

interface AppLogoProps {
	size: string
	position: string
	logo: string
}

const AppLogo: FC<AppLogoProps> = ({
	size = 'medium',
	position = 'middle',
	logo = 'abraham',
}) => {
	const abrahamLogo =
		'https://eden-art.s3.amazonaws.com/abraham_eth_star_logo.png'
	const edenLogo = 'https://eden-art.s3.amazonaws.com/eden_logo_transparent.png'

	const renderSize = (size: string): string => {
		switch (size) {
			case 'icon-small':
				return 'icon-small'
			case 'x-small':
				return 'x-small'
			case 'small':
				return 'small'
			case 'medium':
				return 'medium'
			case 'large':
				return 'large'
			case 'x-large':
				return 'x-large'
			default:
				return 'medium'
		}
	}

	const renderPosition = (position: string): string => {
		let currentPosition

		switch (position) {
			case 'left':
				currentPosition = 'left'
				break
			case 'middle':
				currentPosition = 'middle'
				break
			case 'right':
				currentPosition = 'right'
				break
			default:
				currentPosition = 'middle'
				break
		}
		return currentPosition
	}

	const renderLogo = (logo: string): string => {
		let currentLogo

		switch (logo) {
			case 'abraham':
				currentLogo = abrahamLogo
				break
			case 'eden':
				currentLogo = edenLogo
				break
			default:
				currentLogo = edenLogo
				break
		}

		return currentLogo
	}

	const sizeType = renderSize(size)
	const positionType = renderPosition(position)
	const logoType = renderLogo(logo)

	return (
		<section
			id='logo'
			className={`${String(styles.sizeType)} ${String(styles.positionType)}`}
			style={{ margin: '30px 0' }}
		>
			<img
				className={`logo ${styles.sizeType}`}
				src={logoType}
				height='150px'
			/>
		</section>
	)
}

export default AppLogo
