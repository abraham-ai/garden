import type { FC } from 'react'
import type Creation from '../../../../interfaces/Creation'

import React from 'react'
import Link from 'next/link'

import Blockies from 'react-blockies'

import CreationCreator from '../CreationCreator'
import CreationPrompt from '../CreationPrompt'
import styles from '../../../../styles/CreationCard.module.css'

interface CrCardMobileProps {
	creation: Creation
	isMobile: boolean
	displayAddress: string
	timeAgoCreatedAt: string
	currentTheme: string
	user: string
	GeneratorName: string
	prompt: string
	appWidth: number
}

const CrCardMobile: FC<CrCardMobileProps> = ({
	creation,
	isMobile,
	displayAddress,
	timeAgoCreatedAt,
	currentTheme,
	user,
	GeneratorName,
	prompt,
	appWidth,
}) => {
	const crCreatorPromptWrapperStyles = {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	}
	return (
		<div className={crCreatorPromptWrapperStyles}>
			<CreationCreator
				creationData={creation}
				isMobile={isMobile}
				displayAddress={displayAddress}
				timeAgoCreatedAt={timeAgoCreatedAt}
				user={user}
				currentTheme={currentTheme}
			/>
			<CreationPrompt
				creation={creation}
				isMobile={isMobile}
				appWidth={appWidth}
				prompt={prompt}
				GeneratorName={GeneratorName}
			/>
		</div>
	)
}

export default CrCardMobile
