import type { FC } from 'react'
import type Creation from '../../../interfaces/Creation'

import React, { useMemo } from 'react'
import { Typography, Col } from 'antd'

import styles from '../../../styles/CreationModal.module.css'

const { Text } = Typography

interface CreationPromptProps {
	layout: string
	creation: Creation
	prompt: string
	GeneratorName: string
	isMobile: boolean
	appWidth: number
	currentTheme: string
}

const CreationPrompt: FC<CreationPromptProps> = ({
	layout,
	creation,
	prompt,
	GeneratorName,
	appWidth,
	currentTheme,
}) => {
	const isThemeLight = currentTheme === 'light'

	const isOverlay = layout === 'overlay'
	const isModal = layout === 'modal'

	// console.log({ isOverlay })
	// console.log({ isModal })

	const isMobile = appWidth < 768
	const isTablet = appWidth >= 768 && appWidth <= 1024

	// console.log({ isMobile })
	// console.log({ isTablet })

	const handlePromptSize = useMemo(() => {
		if (isMobile) {
			if (isOverlay) {
				return '12px'
			} else if (isModal) {
				return '1rem'
			}
		} else if (isTablet) {
			if (isOverlay) {
				return '.9rem'
			} else if (isModal) {
				return '.9rem'
			}
		} else {
			if (isOverlay) {
				return '1rem'
			} else if (isModal) {
				return '1.5rem'
			}
		}
		return '12px'
	}, [appWidth])

	const handlePromptColor = useMemo(() => {
		if (isMobile) {
			if (isOverlay) {
				return isThemeLight ? styles.crPrompt : styles.crPrompt
			} else if (isModal) {
				return isThemeLight ? styles.crPrompt : styles.crPrompt
			} else {
				return isThemeLight ? styles.crPrompt : styles.crPrompt
			}
		} else if (isTablet) {
			return isThemeLight ? styles.crPrompt : styles.crPrompt
		} else {
			if (isOverlay) {
				return isThemeLight ? styles.crPrompt : styles.crPrompt
			} else if (isModal) {
				return isThemeLight ? styles.crPrompt : styles.crPrompt
			}
		}
	}, [appWidth])

	console.log({ handlePromptColor })
	// console.log({ prompt })

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
				className={handlePromptColor}
				style={{
					fontSize: handlePromptSize,
					fontWeight: isMobile ? 'bold' : 'regular',
				}}
			>
				{prompt}
			</Text>
		</Col>
	)
}

export default CreationPrompt
