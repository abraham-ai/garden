import type { FC } from 'react'
import React, { useMemo } from 'react'
import { Row, Typography } from 'antd'
import styles from '../../../styles/Header.module.css'
const { Text } = Typography

interface CreationDateProps {
	timeAgoCreatedAt: string
	appWidth: number
	page: string
	layout: string
}

const CreationDate: FC<CreationDateProps> = ({
	timeAgoCreatedAt,
	appWidth,
	page,
	layout,
}) => {
	const isMobile = appWidth < 768
	const isTablet = appWidth >= 768 && appWidth <= 1024

	const isCrPageId = page === 'crPageId'
	const isCrModal = layout === 'crModal'

	const fontWeight = useMemo(() => {
		if (isMobile) {
			if (isCrPageId) {
				return 'regular'
			} else if (isCrModal) {
				return 'regular'
			}
		} else if (isTablet) {
			if (isCrPageId) {
				return 'regular'
			} else if (isCrModal) {
				return 'regular'
			}
		} else {
			if (isCrPageId) {
				return 'regular'
			} else if (isCrModal) {
				return 'regular'
			}
		}
	}, [appWidth])

	const createdAtColor = useMemo(() => {
		if (isMobile) {
			if (isCrPageId) {
				return 'black'
			} else if (isCrModal) {
				return 'white'
			}
		} else if (isTablet) {
			if (isCrPageId) {
				return 'white'
			} else if (isCrModal) {
				return 'white'
			}
		} else {
			if (isCrPageId) {
				return 'white'
			} else if (isCrModal) {
				return 'white'
			}
		}
	}, [appWidth])

	const crDateWrapperStyles = {
		display: 'flex',
		alignItems: 'center',
	}

	// console.log({ isMobile })
	// console.log({ timeAgoCreatedAt })

	return (
		<>
			{isCrPageId ? (
				<Row style={crDateWrapperStyles}>
					<Text
						className={styles.crDate}
						style={{
							color: createdAtColor,
							fontWeight,
							textDecoration: 'unset',
						}}
					>
						{timeAgoCreatedAt}
					</Text>
				</Row>
			) : null}
		</>
	)
}

export default CreationDate
