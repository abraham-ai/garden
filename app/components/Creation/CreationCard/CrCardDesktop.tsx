import type { FC } from 'react'
import type Creation from '../../../../interfaces/Creation'
import type CreatorProfile from '../../../../interfaces/CreatorProfile'

import React from 'react'
import CreationCreator from '../CreationCreator'
import CreationPrompt from '../CreationPrompt'
import styles from '../../../../styles/CreationCard.module.css'

interface CrCardDesktopProps {
	creation: Creation
	appTheme: string
	appWidth: number
	creatorProfile: CreatorProfile
	page: string
	layout: string
}

const CrCardDesktop: FC<CrCardDesktopProps> = ({
	creation,
	appWidth,
	appTheme,
	creatorProfile,
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
				appTheme={appTheme}
			/>

			<CreationCreator
				creation={creation}
				creatorProfile={creatorProfile}
				layout={layout}
				page={page}
				appWidth={appWidth}
				appTheme={appTheme}
			/>
		</article>
		// </div>
	)
}

export default CrCardDesktop
