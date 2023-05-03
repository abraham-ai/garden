import type { FC } from 'react'
import type Creation from '../../../../interfaces/Creation'
import React from 'react'
import Image from 'next/image'
import { Col } from 'antd'

interface CrModalImageProps {
	creation: Creation
	creationIndex: number
	currentCreationIndex: number
	appWidth: number
	isMobile: boolean
}
const CrModalImage: FC<CrModalImageProps> = ({
	creation,
	creationIndex,
	currentCreationIndex,
	appWidth,
	isMobile,
}) => {
	return (
		<Col
			style={{
				flex: isMobile ? 1 : '1 0 1000px',
				justifyContent: 'center',
				maxWidth: '100%',
				background: 'rgb(0, 0, 0)',
				position: 'relative',
				overflow: 'hidden',
				maxHeight: 800,
				alignItems: 'center',
				display: 'flex',
				// padding: '0px 80px'
			}}
		>
			<Image
				src={creation?.thumbnail}
				width={creation?.task?.config?.width}
				height={creation?.task?.config?.height}
				alt={creation?.task?.config?.text_input}
				style={{
					width: '100%',
					height: 'auto',
					zIndex: 50,
				}}
			/>
			<Image
				src={creation.thumbnail}
				width={creation?.task.config?.width}
				height={creation?.task.config?.height}
				alt={creation?.task?.config?.text_input}
				style={{
					position: 'absolute',
					width: 'auto',
					height: '100%',
					zIndex: 0,
					filter: 'blur(16px)',
					background: 'black',
				}}
			/>
		</Col>
	)
}

export default CrModalImage
