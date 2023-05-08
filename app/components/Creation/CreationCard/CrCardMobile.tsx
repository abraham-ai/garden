import type { FC, CSSProperties } from 'react'
import type Creation from '../../../../interfaces/Creation'
import type CreatorProfile from '../../../../interfaces/CreatorProfile'

import React from 'react'

import CreationCreator from '../CreationCreator'
import CreationPrompt from '../CreationPrompt'

interface CrCardMobileProps {
	creation: Creation
	creator: CreatorProfile
	currentTheme: string
	appWidth: number
	page: string
	layout: string
}

const CrCardMobile: FC<CrCardMobileProps> = ({
	creation,
	creator,
	currentTheme,
	appWidth,
	page,
	layout,
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
				creation={creation}
				creator={creator}
				appWidth={appWidth}
				layout={layout}
				currentTheme={currentTheme}
				page={page}
			/>
			<CreationPrompt
				creation={creation}
				appWidth={appWidth}
				layout={layout}
				currentTheme={currentTheme}
				page={page}
			/>
		</div>
	)
}

export default CrCardMobile
