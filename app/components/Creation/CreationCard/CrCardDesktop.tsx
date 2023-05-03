import type { FC } from 'react'
import type Creation from '../../../../interfaces/Creation'

import React from 'react'
import Link from 'next/link'

import Blockies from 'react-blockies'

import styles from '../../../../styles/CreationCard.module.css'

import { Typography, Col } from 'antd'
const { Text } = Typography

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
				<Col
					style={{
						order: isMobile ? 2 : 'unset',
					}}
				>
					<Text className={styles.crPromptCommand}>{`/${String(
						GeneratorName
					)} `}</Text>
					<Text
						className={styles.crPrompt}
						style={{
							color: currentTheme === 'light' ? 'black' : 'white',
						}}
					>
						{prompt}
					</Text>
				</Col>
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

export default CrCardDesktop
