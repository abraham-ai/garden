import type { FC } from 'react'
import type Creation from '../../../../interfaces/Creation'

import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import AppContext from '../../../../context/AppContext'
import Image from 'next/image'

import styles from '../../../../styles/CreationCard.module.css'

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
	const router = useRouter()

	const currentCreationIndex = context?.currentCreationIndex ?? 0
	const setCurrentCreationIndex = context?.setCurrentCreationIndex ?? (() => {})
	const currentCreationModalCreation =
		context?.currentCreationModalCreation ?? {}
	const setCurrentCreationModalCreation =
		context?.setCurrentCreationModalCreation ?? (() => {})

	const isMobile = appWidth < 768

	const handleCrLinkClick = (e): void => {
		e.preventDefault()
		showModal()
		setCurrentCreationModalCreation(creation)
		setCurrentCreationIndex(creationIndex)
		window.history.replaceState(null, '', `/creation/${String(creation._id)}`)
		// router
		// 	.push(`/creation/${String(creation._id)}`, undefined, {
		// 		shallow: true,
		// 	})
		// 	.catch((err) => {
		// 		console.error('Error while updateing URL: ', err)
		// 	})
	}

	console.log({ currentCreationIndex })
	console.log({ currentCreationModalCreation })
	// console.log(currentCreationModalCreation.task.config.text_input)

	return (
		<section
			className={styles.crLink}
			style={{
				color: 'black',
				flexDirection: 'column',
				// background: crBgColor,
				border: 20,
				marginLeft: 0,
				borderRadius: isMobile ? 10 : 'unset',
				overflow: 'hidden',
			}}
			onClick={(e) => {
				handleCrLinkClick(e)
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
		</section>
	)
}

export default CrImageLink
