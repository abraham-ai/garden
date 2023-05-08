import type { FC } from 'react'
import type Creation from '../../../../interfaces/Creation'
import type CreatorProfile from '../../../../interfaces/CreatorProfile'

import React from 'react'
import CreationCreator from '../CreationCreator'
import CreationPrompt from '../CreationPrompt'
import styles from '../../../../styles/CreationCard.module.css'

interface CrCardDesktopProps {
	creation: Creation
	currentTheme: string
	appWidth: number
	creator: CreatorProfile
	page: string
	layout: string
}

const CrCardDesktop: FC<CrCardDesktopProps> = ({
	creation,
	appWidth,
	currentTheme,
	creator,
	page,
	layout,
}) => {
	const isMobile = appWidth < 768
	const isTablet = appWidth >= 768 && appWidth <= 1024

	return (
		// <div className={styles.crPromptMainWrapper}>
		<article className={styles.promptWrapper}>
			<CreationPrompt
				creation={creation}
				layout={layout}
				page={page}
				appWidth={appWidth}
				currentTheme={currentTheme}
			/>

			<CreationCreator
				creation={creation}
				creator={creator}
				layout={layout}
				page={page}
				appWidth={appWidth}
				currentTheme={currentTheme}
			/>
		</article>
		// </div>
	)
}

export default CrCardDesktop
