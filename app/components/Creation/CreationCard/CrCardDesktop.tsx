import type { FC } from 'react'
import type Creation from '../../../../interfaces/Creation'

import React from 'react'
import CreationCreator from '../CreationCreator'
import CreationPrompt from '../CreationPrompt'
import styles from '../../../../styles/CreationCard.module.css'

interface CrCardDesktopProps {
	creation: Creation
	isMobile: boolean
	GeneratorName: string
	currentTheme: string
	user: string
	displayAddress: string
	timeAgoCreatedAt: string
	prompt: string
}

const CrCardDesktop: FC<CrCardDesktopProps> = ({
	creation,
	isMobile,
	GeneratorName,
	currentTheme,
	user,
	displayAddress,
	timeAgoCreatedAt,
	prompt,
}) => {
	return (
		<div className={styles.crPromptMainWrapper}>
			<article className={styles.promptWrapper}>
				<CreationPrompt
					creation={creation}
					isMobile={isMobile}
					displayAddress={displayAddress}
					timeAgoCreatedAt={timeAgoCreatedAt}
					user={user}
					currentTheme={currentTheme}
					GeneratorName={GeneratorName}
					prompt={prompt}
				/>

				<CreationCreator
					layout='overlay'
					creationData={creation}
					isMobile={isMobile}
					displayAddress={displayAddress}
					timeAgoCreatedAt={timeAgoCreatedAt}
					user={user}
					currentTheme={currentTheme}
				/>
			</article>
		</div>
	)
}

export default CrCardDesktop
