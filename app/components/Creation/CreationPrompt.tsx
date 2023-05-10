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
	const isRelative = layout === 'relative'
	const isCrIdPage = page === 'creationId'

	// console.log({ isOverlay })
	// console.log({ isRelative })

	const isMobile = appWidth < 768
	const isTablet = appWidth >= 768 && appWidth <= 1024

	// console.log({ isMobile })
	// console.log({ isTablet })
	console.log({ isCrIdPage })

	const GeneratorName = creation?.task?.generator?.generatorName ?? 'create'

	let prompt = ''

	const creationTextInput = creation?.task?.config?.text_input
	if (creationTextInput !== '' && typeof creationTextInput !== 'undefined') {
		if (isMobile) {
			prompt = abbreviateText(creationTextInput, 100)
		} else if (isTablet) {
			prompt = abbreviateText(creationTextInput, 100)
		} else {
			if (isCrIdPage) {
				prompt = creationTextInput
			} else {
				if (creation.task.config.height > 550) {
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
		}
	}

	const promptSize = useMemo(() => {
		if (isMobile) {
			if (isOverlay) {
				return styles.crPromptSizeSm
			} else if (isRelative) {
				return styles.crPromptSizeMd
			}
		} else if (isTablet) {
			if (isOverlay) {
				return styles.crPromptSizeSm
			} else if (isRelative) {
				return styles.crPromptSizeSm
			}
		} else {
			if (isOverlay) {
				return styles.crPromptSizeMd
			} else if (isRelative) {
				return styles.crPromptSizeLg
			}
		}
		return '12px'
	}, [appWidth])

	const promptColor = useMemo(() => {
		if (isMobile) {
			if (isOverlay) {
				return isThemeLight ? styles.crPromptWhite : styles.crPromptWhite
			} else if (isRelative) {
				return isThemeLight ? styles.crPromptBlack : styles.crPromptWhite
			} else {
				return isThemeLight ? styles.crPromptBlack : styles.crPromptWhite
			}
		} else if (isTablet) {
			if (isOverlay) {
				return isThemeLight ? styles.crPromptWhite : styles.crPromptWhite
			} else if (isRelative) {
				return isThemeLight ? styles.crPromptBlack : styles.crPromptWhite
			} else {
				return isThemeLight ? styles.crPromptBlack : styles.crPromptWhite
			}
		} else {
			if (isOverlay) {
				return isThemeLight ? styles.crPromptWhite : styles.crPromptWhite
			} else if (isRelative) {
				console.log('isRelative:', isThemeLight)
				return isThemeLight ? styles.crPromptBlack : styles.crPromptWhite
			} else {
				return isThemeLight ? styles.crPromptBlack : styles.crPromptWhite
			}
		}
	}, [appWidth, currentTheme])

	const promptWrapper = useMemo(() => {
		if (isCrIdPage) {
			return styles.crPromptText
		} else {
			return styles.crPromptWrapper
		}
	}, [appWidth])

	const promptWeight = useMemo(() => {
		if (isCrIdPage) {
			return styles.crPromptReg
		} else {
			return styles.crPromptBold
		}
	}, [appWidth])

	console.log({ isThemeLight })
	console.log({ isMobile, isTablet })
	console.log({ isRelative })
	console.log({ promptColor })
	console.log({ prompt })
	console.log({ creationTextInput })
	console.log({ layout })
	console.log({ creation })
	console.log(styles.crPromptText)

	return (
		<Col
			className={promptWrapper}
			style={{
				order: isMobile ? 2 : 2,
			}}
		>
			<Text
				className={`${styles.crPromptCommand} ${promptSize}`}
				style={{
					fontWeight: isMobile ? 'bold' : 'regular',
				}}
			>{`/${String(GeneratorName)} `}</Text>
			<Text
				className={`${promptColor} ${promptSize} ${promptWeight}`}
				style={{
					fontWeight: isMobile ? 'bold' : 'regular',
				}}
			>
				{prompt}
			</Text>
		</Col>
	)
}

export default CreationPrompt
