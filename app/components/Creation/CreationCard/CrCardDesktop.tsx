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
							color: currentTheme === 'ligiht' ? 'black' : 'white',
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
						marginTop: 10,
					}}
				>
					<Link
						href={{
							pathname: `/creator/${String(creation?.user)}`,
							query: { user },
						}}
						style={{
							display: 'flex',
							alignItems: 'center',
							marginRight: 10,
						}}
					>
						<span
							style={{
								borderRadius: '50%',
								overflow: 'hidden',
								width: '32px',
								height: '32px',
								marginRight: 10,
								background: 'white',
							}}
						>
							<Blockies seed={creation?.user} />
						</span>

						<Text className={styles.displayAddress}>{displayAddress}</Text>
					</Link>
					<Text className={styles.crDate}>{timeAgoCreatedAt}</Text>
				</div>
			</article>
		</div>
	)
}

export default CrCardDesktop
