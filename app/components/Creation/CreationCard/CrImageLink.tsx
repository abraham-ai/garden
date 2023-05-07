import type { FC } from 'react'
import type Creation from '../../../../interfaces/Creation'

import React, { useContext } from 'react'
import AppContext from '../../../../context/AppContext'
import Image from 'next/image'
import Link from 'next/link'

import styles from '../../../../styles/CreationCard.module.css'

import { Skeleton } from 'antd'

interface CrImageLinkProps {
	creation: Creation
	crBgColor: string
	appWidth: number
	isCreationHovering: boolean
	showModal: () => void
	creationIndex: number
}

const CrImageLink: FC<CrImageLinkProps> = ({
	creation,
	crBgColor,
	appWidth,
	isCreationHovering,
	showModal,
	creationIndex,
}) => {
	const context = useContext(AppContext)

	const currentCreationIndex = context?.currentCreationIndex ?? 0
	const setCurrentCreationIndex = context?.setCurrentCreationIndex ?? (() => {})
	const currentCreationModalCreation =
		context.currentCreationModalCreation ?? {}
	const setCurrentCreationModalCreation =
		context.setCurrentCreationModalCreation ?? (() => {})

	const isMobile = appWidth < 768

	console.log({ currentCreationIndex })
	console.log({ currentCreationModalCreation })

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
				marginLeft: 0,
				borderRadius: isMobile ? 10 : 'unset',
				overflow: 'hidden',
			}}
			onClick={() => {
				showModal()
				setCurrentCreationModalCreation(creation)
				setCurrentCreationIndex(creationIndex)
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
