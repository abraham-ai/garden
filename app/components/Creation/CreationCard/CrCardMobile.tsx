import type { FC, CSSProperties } from 'react'
import type Creation from '../../../../interfaces/Creation'
import type CreatorProfile from '../../../../interfaces/CreatorProfile'

import React from 'react'

import CreationCreator from '../CreationCreator'
import CreationPrompt from '../CreationPrompt'

interface CrCardMobileProps {
	creation: Creation
	creator: CreatorProfile
	displayAddress: string
	timeAgoCreatedAt: string
	currentTheme: string
	GeneratorName: string
	prompt: string
	appWidth: number
}

const CrCardMobile: FC<CrCardMobileProps> = ({
	creation,
	creator,
	timeAgoCreatedAt,
	currentTheme,
	GeneratorName,
	prompt,
	appWidth,
}) => {
	const crCreatorPromptWrapperStyles: CSSProperties = {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	}
	return (
		<div style={crCreatorPromptWrapperStyles}>
			<CreationCreator
				creationData={creation}
				appWidth={appWidth}
				displayAddress={displayAddress}
				timeAgoCreatedAt={timeAgoCreatedAt}
				creator={creator}
				currentTheme={currentTheme}
			/>
			<CreationPrompt
				creation={creation}
				appWidth={appWidth}
				prompt={prompt}
				GeneratorName={GeneratorName}
			/>
		</div>
	)
}

export default CrCardMobile
