import type { FC } from 'react'
import type Creation from '../../../../interfaces/Creation'
import React, { useMemo } from 'react'
import Image from 'next/image'
import { Col } from 'antd'
import styles from '../../../../styles/CreationModal.module.css'

interface CrModalImageProps {
	creation: Creation
	creationIndex: number
	currentCreationIndex: number
	appWidth: number
}
const CrModalImage: FC<CrModalImageProps> = ({
	creation,
	creationIndex,
	currentCreationIndex,
	appWidth,
}) => {
	const isMobile = appWidth < 768
	const isTablet = appWidth >= 768 && appWidth < 992
	const isDesktop = appWidth >= 992 && appWidth < 1200
	const DesktopLg = appWidth >= 1200

	const isLandscape =
		creation?.task?.config?.width > creation?.task?.config?.height
	const isPortrait =
		creation?.task?.config?.width < creation?.task?.config?.height
	const isSquare =
		creation?.task?.config?.width === creation?.task?.config?.height

	const imageStyles = useMemo(() => {
		if (isLandscape) {
			return styles.crImageLandscape
		} else if (isPortrait) {
			return styles.crImagePortrait
		} else if (isSquare) {
			return styles.crImageSquare
		}
	}, [creation])

	const flexSizeStyles = useMemo(() => {
		if (isMobile) {
			return styles.crModalImageWrapperMobile
		} else if (isTablet) {
			return styles.crModalImageWrapperTablet
		} else if (isDesktop) {
			return styles.crModalImageWrapperDesktop
		} else if (DesktopLg) {
			return styles.crModalImageWrapperDesktopLg
		} else {
			return styles.crModalImageWrapperDesktopLg
		}
	}, [creation])

	return (
		<Col
			id='crModalImageWrapper'
			className={`${styles.crModalImageWrapper} ${flexSizeStyles}`}
			style={{
				background: 'rgb(0, 0, 0)',
			}}
		>
			<Image
				id={'crImage'}
				className={imageStyles}
				src={creation?.thumbnail}
				width={creation?.task?.config?.width}
				height={creation?.task?.config?.height}
				alt={creation?.task?.config?.text_input}
				style={{
					zIndex: 50,
				}}
			/>
			<Image
				id={'crImageBlur'}
				src={creation.thumbnail}
				width={creation?.task.config?.width}
				height={creation?.task.config?.height}
				alt={creation?.task?.config?.text_input}
				style={{
					position: 'absolute',
					width: '105%',
					height: '105%',
					zIndex: 0,
					filter: 'blur(16px)',
					background: 'black',
				}}
			/>
		</Col>
	)
}

export default CrModalImage
