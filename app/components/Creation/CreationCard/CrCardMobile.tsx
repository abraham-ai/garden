import type { FC } from 'react'
import type Creation from '../../../../interfaces/Creation'

import React from 'react'
import Link from 'next/link'

import Blockies from 'react-blockies'

import CreationCreator from '../CreationCreator/CreationCreator'
import CreationPrompt from '../CreationPrompt/CreationPrompt'
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
}) => {
	return (
		<div className={styles.crPromptMainWrapper}>
			<Link
				href={{
					pathname: `/creator/${String(creation?.user)}`,
					query: { user },
				}}
				style={{
					display: 'flex',
					alignItems: isMobile ? 'flex-start' : 'center',
					marginRight: 10,
				}}
			>
				<span
					style={{
						borderRadius: '50%',
						overflow: 'hidden',
						width: isMobile ? '48px' : '32px',
						height: isMobile ? '48px' : '32px',
						marginRight: isMobile ? 0 : 10,
						background: 'white',
					}}
				>
					<Blockies seed={creation?.user} size={12} />
				</span>
			</Link>
			<article className={styles.promptWrapper}>
				<CreationPrompt
					creation={creation}
					isMobile={isMobile}
					appWidth={appWidth}
					prompt={prompt}
				/>

				<CreationCreator
					creation={creation}
					isMobile={isMobile}
					displayAddress={displayAddress}
					timeAgoCreatedAt={timeAgoCreatedAt}
					user={user}
				/>
			</article>
		</div>
	)
}

export default CrCardMobile
