import type { FC } from 'react'
import type Creation from '../../../../interfaces/Creation'

import React, { useMemo } from 'react'
import { Typography, Col } from 'antd'

import styles from '../../../../styles/CreationModal.module.css'

const { Text } = Typography

interface CrModalPromptProps {
	creation: Creation
	appWidth: number
	isMobile: boolean
	prompt: string
}

const CrModalPrompt: FC<CrModalPromptProps> = ({
	creation,
	isMobile,
	appWidth,
	prompt,
}) => {
	const handlePromptSize = useMemo(() => {
		if (appWidth <= 768) {
			return '1rem'
		} else if (appWidth >= 768 && appWidth <= 1024) {
			return '1.5rem'
		} else {
			return '1.5rem'
		}
	}, [appWidth])

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
			>{`/${String(creation?.task?.generator?.generatorName)} `}</Text>
			<Text className={styles.crPromptCommand}>{`/${String(
				GeneratorName
			)} `}</Text>
			<Text
				className={styles.crPrompt}
				style={{
					fontSize: handlePromptSize,
					fontWeight: isMobile ? 'bold' : 'regular',
					color: currentTheme === 'light' ? 'black' : 'white',
				}}
			>
				{prompt}
			</Text>
		</Col>
	)
}

export default CrModalPrompt
