import type { FC } from 'react'
import React, { useMemo } from 'react'
import { Row, Typography } from 'antd'
import styles from '../../../styles/Header.module.css'
const { Text } = Typography

interface CreationDateProps {
	timeAgoCreatedAt: string
	isMobile: boolean
	appWidth: number
}

const CreationDate: FC<CreationDateProps> = ({
	timeAgoCreatedAt,
	isMobile,
	appWidth,
}) => {
	const handleCreatedAtColor = useMemo(() => {
		if (appWidth <= 768) {
			return 'white'
		} else if (appWidth >= 768 && appWidth <= 1024) {
			return 'white'
		} else {
			return 'white'
		}
	}, [appWidth])

	return (
		<Row
			style={{
				display: 'flex',
				alignItems: 'center',
				marginBottom: isMobile ? 20 : 50,
			}}
		>
			<Text
				className={styles.crDate}
				style={{
					color: handleCreatedAtColor,
					fontWeight: isMobile ? 'bold' : 'regular',
				}}
			>
				{timeAgoCreatedAt}
			</Text>
		</Row>
	)
}

export default CreationDate
