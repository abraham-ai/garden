import type { FC, CSSProperties } from 'react'
import type Creation from '../../../../interfaces/Creation'
import type CreatorProfile from '../../../../interfaces/CreatorProfile'

import React from 'react'

import CreationCreator from '../CreationCreator'
import CreationPrompt from '../CreationPrompt'

interface CrCardMobileProps {
	creation: Creation
	creatorProfile: CreatorProfile
	appTheme: string
	appWidth: number
	page: string
	layout: string
}

const CrCardMobile: FC<CrCardMobileProps> = ({
	creation,
	creatorProfile,
	appTheme,
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
				creatorProfile={creatorProfile}
				appWidth={appWidth}
				layout={layout}
				appTheme={appTheme}
				page={page}
			/>
			<CreationPrompt
				creation={creation}
				appWidth={appWidth}
				layout={layout}
				appTheme={appTheme}
				page={page}
			/>
		</div>
	)
}

export default CrCardMobile
