import type { FC } from 'react'
import type Creation from '../../../interfaces/Creation'

import React, { useMemo } from 'react'
import { Typography, Col } from 'antd'

import abbreviateText from '../../../util/abbreviateText'

import styles from '../../../styles/CreationModal.module.css'

const { Text } = Typography

interface CreationPromptProps {
	creation: Creation
	layout: string
	appWidth: number
	currentTheme: string
	page: string
}

const CreationPrompt: FC<CreationPromptProps> = ({
	creation,
	layout,
	appWidth,
	currentTheme,
	page,
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

	const GeneratorName = creation?.task?.generator?.generatorName

	let prompt = ''

	const creationTextInput = creation?.task?.config?.text_input
	if (creationTextInput !== '' && typeof creationTextInput !== 'undefined') {
		if (isMobile) {
			prompt = abbreviateText(creationTextInput, 100)
		} else if (creation.task.config.height > 550) {
			prompt = abbreviateText(creationTextInput, 80) // 100
		} else if (creation.task.config.height > 500) {
			prompt = abbreviateText(creationTextInput, 40) // 100
		} else if (creation.task.config.height > 450) {
			prompt = abbreviateText(creationTextInput, 30) // 100
		} else if (creation.task.config.height > 400) {
			prompt = abbreviateText(creationTextInput, 25) // 100
		} else {
			prompt = abbreviateText(creationTextInput, 20) // 100
		}
	}

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

	// console.log({ handlePromptColor })
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
