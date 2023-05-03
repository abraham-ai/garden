import type { FC } from 'react'
import type Creation from '../../../../interfaces/Creation'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import styles from '../../../../styles/CreationCard.module.css'

import { Skeleton } from 'antd'

interface CrImageLinkProps {
	creation: Creation
	crBgColor: string
	appWidth: number
	isMobile: boolean
	isCreationHovering: boolean
	showModal: () => void
}

const CrImageLink: FC<CrImageLinkProps> = ({
	creation,
	crBgColor,
	appWidth,
	isMobile,
	isCreationHovering,
	showModal,
}) => {
	return (
		<Link
			className={styles.crLink}
			href={`/?creationId=${String(creation._id)}`}
			as={`/creation/${String(creation._id)}`}
			scroll={false}
			style={{
				color: 'black',
				flexDirection: 'column',
				// background: crBgColor,
				border: 20,
				marginLeft: isMobile ? 60 : 0,
				position: isMobile ? 'relative' : 'absolute',
				borderRadius: isMobile ? 10 : 'unset',
				overflow: 'hidden',
				top: isMobile ? 'unset' : 0,
				width: isMobile ? 'unset' : '100%',
			}}
			onClick={() => {
				showModal()
			}}
		>
			<div
				className={styles.crImageHoverMask}
				style={{
					display: isCreationHovering ? undefined : 'none',
				}}
			/>
			<Image
				className={styles.crImageBlurMask}
				src={creation?.thumbnail}
				height={creation?.task?.config?.height}
				width={creation?.task?.config?.width}
				alt={creation?.task?.config?.text_input}
				style={{
					backdropFilter: isCreationHovering ? undefined : 'unset',
				}}
			/>

			<Image
				className={styles.crImageMain}
				src={creation?.thumbnail}
				height={creation?.task?.config?.height}
				width={creation?.task?.config?.width}
				alt={creation?.task?.config?.text_input}
				// style={{ background: crBgColor }}
			/>
		</Link>
	)
}

export default CrImageLink
