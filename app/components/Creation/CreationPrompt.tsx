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

	const isCrModal = page === 'modal'
	const isCreationsPage = page === 'creations'
	const isCrIdPage = page === 'creationId'

	const isMobile = appWidth < 768
	const isTablet = appWidth >= 768 && appWidth <= 1024

	const GeneratorName = creation?.task?.generator?.generatorName ?? 'create'

	let prompt = ''

	const creationTextInput = creation?.task?.config?.text_input
	if (creationTextInput !== '' && typeof creationTextInput !== 'undefined') {
		if (isMobile) {
			prompt = abbreviateText(creationTextInput, 100)
		} else if (isTablet) {
			if (isCrModal) {
				prompt = creationTextInput
			} else {
				prompt = abbreviateText(creationTextInput, 100)
			}
		} else {
			if (isCrIdPage) {
				prompt = creationTextInput
			} else if (isCrModal) {
				prompt = creationTextInput
			} else {
				if (creation.task.config.height > 550) {
					prompt = abbreviateText(creationTextInput, 80) // 100
				} else if (creation.task.config.height > 500) {
					prompt = abbreviateText(creationTextInput, 40) // 100
				} else if (creation.task.config.height > 450) {
					prompt = abbreviateText(creationTextInput, 30) // 100
				} else if (creation.task.config.height > 400) {
					prompt = abbreviateText(creationTextInput, 30) // 100
				} else {
					prompt = abbreviateText(creationTextInput, 30) // 100
				}
			}
		}
	}

	const promptSize: string | undefined = useMemo(() => {
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

	const promptColor: string | undefined = useMemo(() => {
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
				return isThemeLight ? styles.crPromptBlack : styles.crPromptWhite
			} else {
				return isThemeLight ? styles.crPromptBlack : styles.crPromptWhite
			}
		}
	}, [appWidth, currentTheme])

	const promptWrapper: string | undefined = useMemo(() => {
		if (isCrIdPage) {
			return styles.crPromptText
		} else {
			return styles.crPromptWrapper
		}
	}, [appWidth])

	const promptWeight: string | undefined = useMemo(() => {
		if (isMobile) {
			if (isCrIdPage) {
				if (isOverlay) {
					return styles.crPromptReg
				} else if (isRelative) {
					return styles.crPromptReg
				}
			} else if (isCrModal) {
				if (isOverlay) {
					return styles.crPromptReg
				} else if (isRelative) {
					return styles.crPromptReg
				}
			} else if (isCreationsPage) {
				if (isOverlay) {
					return styles.crPromptBold
				} else if (isRelative) {
					return styles.crPromptReg
				}
			}
		} else if (isTablet) {
			if (isCrIdPage) {
				if (isOverlay) {
					return styles.crPromptReg
				} else if (isRelative) {
					return styles.crPromptReg
				}
			} else if (isCrModal) {
				if (isOverlay) {
					return styles.crPromptReg
				} else if (isRelative) {
					return styles.crPromptReg
				}
			} else if (isCreationsPage) {
				if (isOverlay) {
					return styles.weightBold
				} else if (isRelative) {
					return styles.crPromptReg
				}
			}
		} else {
			if (isCrIdPage) {
				if (isOverlay) {
					return styles.crPromptReg
				} else if (isRelative) {
					return styles.crPromptReg
				}
			} else if (isCrModal) {
				if (isOverlay) {
					return styles.crPromptReg
				} else if (isRelative) {
					return styles.crPromptReg
				}
			} else if (isCreationsPage) {
				if (isOverlay) {
					return styles.weightBold
				} else if (isRelative) {
					return styles.crPromptReg
				}
			}
		}
	}, [appWidth])

	// console.log({ isThemeLight })
	// console.log({ isMobile, isTablet })
	// console.log({ isOverlay })
	// console.log({ isRelative })
	// console.log({ isCrIdPage })

	// console.log({ promptColor })
	// console.log({ prompt })
	// console.log({ creationTextInput })
	// console.log({ layout })
	// console.log({ creation })
	// console.log(styles.crPromptText)

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
			<Text className={`${promptColor} ${promptSize} ${promptWeight}`}>
				{prompt}
			</Text>
		</Col>
	)
}

export default CreationPrompt
