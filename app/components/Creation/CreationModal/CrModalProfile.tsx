import type { FC } from 'react'
import type Creation from '../../../../interfaces/Creation'

import React from 'react'
import Blockies from 'react-blockies'
import { Typography, Row } from 'antd'

import styles from '../../../../styles/CreationModal.module.css'

const { Text } = Typography

interface CrModalProfileProps {
	creation: Creation
	displayAddress: string
	isMobile: boolean
	timeAgoCreatedAt: string
	appWidth: number
}

const CrModalProfile: FC<CrModalProfileProps> = ({
	creation,
	displayAddress,
	appWidth,
	isMobile,
	timeAgoCreatedAt,
}) => {
	return (
		<Row
			style={{
				display: 'flex',
				alignItems: 'center',
				marginBottom: isMobile ? 20 : 50,
			}}
		>
			<Row
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
					}}
				>
					<Blockies seed={creation?.user} />
				</span>
				<Text
					className={styles.displayAddress}
					style={{
						color: isMobile ? 'white' : 'black',
						fontWeight: isMobile ? 'bold' : 'regular',
					}}
				>
					{displayAddress}
				</Text>
			</Row>
			<Text
				className={styles.crDate}
				style={{
					color: isMobile ? 'white' : 'black',
					fontWeight: isMobile ? 'bold' : 'regular',
				}}
			>
				{timeAgoCreatedAt}
			</Text>
		</Row>
	)
}

export default CrModalProfile
