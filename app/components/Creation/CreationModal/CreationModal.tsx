import type { FC, CSSProperties } from 'react'
import type Creation from '../../../../interfaces/Creation'

import React, { useContext, useMemo } from 'react'
import { useRouter } from 'next/router'
import AppContext from '../../../../context/AppContext'

import styles from '../../../../styles/CreationModal.module.css'

import emptyCreation from '../../../../constants/emptyCreation'
import emptyCreatorProfile from '../../../../constants/emptyCreatorProfile'

import CrModalImage from './CrModalImage'
import CrModalHeader from './CrModalHeader'
import CreationPrompt from '../CreationPrompt'
import TransitionCreationModalButton from './TransitionCreationModalButton'
// import CrModalDebug from './CrModalDebug'

import abbreviateText from '../../../../util/abbreviateText'
import { Modal, Col } from 'antd'

interface ReactionCountList {
	praises: number
	praised: boolean
	burns: number
	burned: boolean
}

interface CreationModalProps {
	modalOpen: boolean
	setModalOpen: (open: boolean) => void
	creation: Creation
	creationIndex: number
	appWidth: number
	reactionCountList: ReactionCountList
	page: string
	layout: string
}

const CreationModal: FC<CreationModalProps> = ({
	modalOpen,
	setModalOpen,
	creation,
	creationIndex,
	appWidth,
	reactionCountList,
	page,
	layout,
}) => {
	const router = useRouter()

	const context = useContext(AppContext)
	const currentCreationIndex = context?.currentCreationIndex ?? 0
	const setCurrentCreationIndex = context?.setCurrentCreationIndex ?? (() => {})

	// const currentCreationModalCreation =
	// 	context?.currentCreationModalCreation ?? {}
	const creationsData = context?.creationsData ?? []
	const currentCreationModalCreation =
		context?.currentCreationModalCreation ?? emptyCreation
	const setCurrentCreationModalCreation =
		context?.setCurrentCreationModalCreation ?? (() => {})

	const currentTheme = context?.currentTheme ?? 'light'

	const isCreationsPage = page === 'creations'
	const isCrIdPage = page === 'creationId'
	const isCrModal = page === 'modal'
	const isOverlay = layout === 'overlay'
	const isRelative = layout === 'relative'

	// const creations = context?.creations != null || []

	const handleModalCancel = (): void => {
		window.history.replaceState(null, '', `/`)
		setModalOpen(false)
		setCurrentCreationIndex(0)
		setCurrentCreationModalCreation(emptyCreation)
	}

	const isMobile = appWidth < 768
	const isTablet = appWidth >= 768 && appWidth <= 1024

	const handleDirection = useMemo(() => {
		if (isMobile) {
			return 'column'
		} else if (isTablet) {
			return 'column'
		} else {
			return 'row'
		}
	}, [appWidth])

	const handleModalMaxWidth = useMemo(() => {
		if (isMobile) {
			return 600
		} else if (isTablet) {
			return 1000
		} else {
			return 1800
		}
	}, [appWidth])

	const handleModalWidth = useMemo(() => {
		if (isMobile) {
			return '100vw'
		} else if (isTablet) {
			return '90vw'
		} else {
			return '1200px'
		}
	}, [appWidth])

	// console.log({ appWidth })
	// console.log(handleDirection)

	const modalStyles: CSSProperties = {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		maxWidth: handleModalMaxWidth,
		height: '100vh',
		padding: isMobile ? 0 : 20,
	}

	const modalWrapperStyles: CSSProperties = {
		display: 'flex',
		alignItems: 'center',
		borderRadius: 10,
		overflow: 'hidden',
		height: isMobile ? '100%' : 'auto',
	}

	const innerModalWrapperStyles: CSSProperties = {
		display: 'flex',
		flexDirection: 'column',
		height: isMobile ? '100%' : 'auto',
	}

	const imageHeaderPromptWrapperStyles: CSSProperties = {
		display: 'flex',
		flexDirection: handleDirection,
		height: isMobile ? '100%' : 'auto',
	}

	const crTextDataWrapperPadding: string = useMemo(() => {
		if (isCrIdPage) {
			if (isOverlay) {
				return styles.overlayPadding
			} else if (isRelative) {
				return styles.relativePadding
			}
		} else if (isCrModal) {
			if (isOverlay) {
				return styles.overlayPadding
			} else if (isRelative) {
				return styles.relativePaddingMobile
			}
		} else if (isCreationsPage) {
			if (isOverlay) {
				return styles.overlayPadding
			} else if (isRelative) {
				return styles.relativePadding
			}
		} else {
			if (isOverlay) {
				return styles.overlayPadding
			} else if (isRelative) {
				return styles.relativePadding
			}
		}
	}, [appWidth])

	const headerPromptWrapperStyles: CSSProperties = {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		position: isMobile ? 'absolute' : 'relative',
		bottom: isMobile ? 0 : 'unset',
		zIndex: 100,
	}

	const footerStyles = { margin: 0 }

	// console.log({ layout })
	// console.log({ page })
	// console.log(crTextDataWrapperPadding)
	// console.log({ currentCreationIndex })
	// console.log({ currentCreationModalCreation })
	// console.log(currentCreationIndex)
	// console.log(creation)
	// console.log({ praises, praised, burns, burned })

	return (
		<Modal
			className={'crModal'}
			open={modalOpen}
			width={handleModalWidth}
			footer={<span style={footerStyles}></span>}
			onCancel={() => {
				handleModalCancel()
			}}
			style={modalStyles}
		>
			<TransitionCreationModalButton direction='prev' />

			<section style={modalWrapperStyles}>
				<article style={innerModalWrapperStyles}>
					<div style={imageHeaderPromptWrapperStyles}>
						<CrModalImage
							appWidth={appWidth}
							creation={creation}
							creationIndex={creationIndex}
							currentCreationIndex={currentCreationIndex}
						/>

						<Col
							className={`${crTextDataWrapperPadding}`}
							style={headerPromptWrapperStyles}
						>
							<span>{`Creations Data Length: ${creationsData.length}`}</span>
							<span>{`Creation Index: ${creationIndex}`}</span>
							<span>{`Creation ID: ${creation?._id}`}</span>
							<span>{`Creation Prompt: ${creation?.task.config.text_input}`}</span>

							<CrModalHeader
								layout={isMobile ? layout : 'relative'}
								creation={creation}
								appWidth={appWidth}
								reactionCountList={reactionCountList}
								page={page}
								currentTheme={currentTheme}
								creator={emptyCreatorProfile}
							/>

							<CreationPrompt
								layout={isMobile ? layout : 'relative'}
								creation={creation}
								appWidth={appWidth}
								currentTheme={currentTheme}
								page={page}
							/>

							{/* <CrModalDebug
								creation={creation}
								creationIndex={creationIndex}
								currentCreationIndex={currentCreationIndex}
							/> */}
						</Col>
					</div>
				</article>
			</section>

			<TransitionCreationModalButton direction='next' />
			{/* <CrModalDebug /> */}
		</Modal>
	)
}

export default CreationModal
