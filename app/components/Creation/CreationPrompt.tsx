import type { FC } from 'react'
import type Creation from '../../../interfaces/Creation'

import React, { useMemo } from 'react'
import { Typography, Col } from 'antd'

import styles from '../../../styles/CreationModal.module.css'

const { Text } = Typography

interface CreationPromptProps {
	creation: Creation
	prompt: string
	GeneratorName: string
	isMobile: boolean
	appWidth: number
	currentTheme: string
}

const CreationPrompt: FC<CreationPromptProps> = ({
	creation,
	prompt,
	GeneratorName,
	isMobile,
	appWidth,
	currentTheme,
}) => {
	const isThemeLight = currentTheme === 'light'

	const handlePromptSize = useMemo(() => {
		if (appWidth <= 768) {
			return '1rem'
		} else if (appWidth >= 768 && appWidth <= 1024) {
			return '1.5rem'
		} else {
			return '1.5rem'
		}
	}, [appWidth])

	const handlePromptColor = useMemo(() => {
		if (appWidth <= 768) {
			return isThemeLight ? 'white' : 'white'
		} else if (appWidth >= 768 && appWidth <= 1024) {
			return isThemeLight ? 'white' : 'white'
		} else {
			return isThemeLight ? 'white' : 'white'
		}
	}, [appWidth])

	console.log({ prompt })

	return (
		<Col
			className={styles.promptWrapper}
			style={{
				order: isMobile ? 2 : 'unset',
			}}
		>
			<Text
				className={styles.crPromptCommand}
				style={{
					fontSize: handlePromptSize,
					fontWeight: isMobile ? 'bold' : 'regular',
				}}
			>{`/${String(GeneratorName)} `}</Text>
			<Text
				className={styles.crPrompt}
				style={{
					fontSize: handlePromptSize,
					fontWeight: isMobile ? 'bold' : 'regular',
					color: handlePromptColor,
				}}
			>
				{prompt}
			</Text>
		</Col>
	)
}

export default CreationPrompt
