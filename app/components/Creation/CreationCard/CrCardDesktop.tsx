import type { FC } from 'react'
import type Creation from '../../../../interfaces/Creation'
import type CreatorProfile from '../../../../interfaces/CreatorProfile'

import React from 'react'
import CreationCreator from '../CreationCreator'
import CreationPrompt from '../CreationPrompt'
import styles from '../../../../styles/CreationCard.module.css'

interface CrCardDesktopProps {
	creation: Creation
	GeneratorName: string
	currentTheme: string
	displayAddress: string
	timeAgoCreatedAt: string
	prompt: string
	appWidth: number
	creator?: CreatorProfile
}

const CrCardDesktop: FC<CrCardDesktopProps> = ({
	creation,
	appWidth,
	GeneratorName,
	currentTheme,
	displayAddress,
	timeAgoCreatedAt,
	prompt,
	creator,
}) => {
	const isMobile = appWidth < 768
	const isTablet = appWidth >= 768 && appWidth <= 1024

	return (
		<div className={styles.crPromptMainWrapper}>
			<article className={styles.promptWrapper}>
				<CreationPrompt
					layout='overlay'
					creation={creation}
					appWidth={appWidth}
					timeAgoCreatedAt={timeAgoCreatedAt}
					currentTheme={currentTheme}
					GeneratorName={GeneratorName}
					prompt={prompt}
				/>

				<CreationCreator
					layout='overlay'
					creationData={creation}
					appWidth={appWidth}
					timeAgoCreatedAt={timeAgoCreatedAt}
					currentTheme={currentTheme}
					creator={creator}
				/>
			</article>
		</div>
	)
}

export default CrCardDesktop
