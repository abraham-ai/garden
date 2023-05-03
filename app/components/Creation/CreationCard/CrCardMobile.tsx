import type { FC } from 'react'
import type Creation from '../../../../interfaces/Creation'

import React from 'react'
import Link from 'next/link'

import Blockies from 'react-blockies'

import styles from '../../../../styles/CreationCard.module.css'

import { Typography, Col } from 'antd'
const { Text } = Typography

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
				<div
					style={{
						display: 'flex',
						order: isMobile ? 1 : 'unset',
						alignItems: 'center',
						marginTop: isMobile ? 0 : 10,
					}}
				>
					<Text className={styles.displayAddress}>{displayAddress}</Text>
					<Text className={styles.crDate}>{timeAgoCreatedAt}</Text>
				</div>
			</article>
		</div>
	)
}

export default CrCardMobile
