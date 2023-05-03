import type { FC, CSSProperties } from 'react'
import type Creation from '../../../../interfaces/Creation'

import React, { useContext, useMemo } from 'react'
import { useRouter } from 'next/router'
import AppContext from '../../../../context/AppContext'

import CrModalImage from './CrModalImage'
import CrModalHeader from './CrModalHeader'
import CreationPrompt from '../CreationPrompt'
// import CrModalDebug from './CrModalDebug'
// import TransitionCreationModalButton from './TransitionCreationModalButton'

import abbreviateText from '../../../../util/abbreviateText'
import abbreviateAddress from '../../../../util/abbreviateAddress'
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
	isMobile: boolean
	appWidth: number
	reactionCountList: ReactionCountList
}

const CreationModal: FC<CreationModalProps> = ({
	modalOpen,
	setModalOpen,
	creation,
	creationIndex,
	isMobile,
	appWidth,
	reactionCountList,
}) => {
	const context = useContext(AppContext)
	const currentCreationIndex = context?.currentCreationIndex ?? 0
	const currentTheme = context?.currentTheme ?? 'light'

	const creations = context?.creations != null || []

	const GeneratorName = creation?.task?.generator?.generatorName

	const router = useRouter()

	// console.log(currentCreationIndex)
	// console.log(creation)

	let displayAddress = ''
	if (typeof creation.user === 'string') {
		displayAddress = abbreviateAddress(creation.user)
	}

	let prompt = ''
	// console.log({ textInput })
	const creationTextInput = creation.task.config.text_input
	if (creationTextInput !== '' && typeof creationTextInput !== 'undefined') {
		prompt = abbreviateText(creationTextInput, 200) // 100
	}

	// console.log({ praises, praised, burns, burned })

	const handleModalCancel = (): void => {
		router.push('/', undefined, { scroll: false })
		setModalOpen(false)
	}

	const handleDirection = useMemo(() => {
		if (appWidth <= 768) {
			return 'column'
		} else if (appWidth >= 768 && appWidth <= 1024) {
			return 'column'
		} else {
			return 'row'
		}
	}, [appWidth])

	const handleModalMaxWidth = useMemo(() => {
		if (appWidth <= 768) {
			return 600
		} else if (appWidth >= 768 && appWidth <= 1024) {
			return 1000
		} else {
			return 1800
		}
	}, [appWidth])

	const handleModalWidth = useMemo(() => {
		if (appWidth <= 768) {
			return '100vw'
		} else if (appWidth >= 768 && appWidth <= 1024) {
			return '90vw'
		} else {
			return '90vw'
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

	const headerPromptWrapperStyles: CSSProperties = {
		display: 'flex',
		flexDirection: 'column',
		padding: isMobile ? 20 : 40,
		justifyContent: 'center',
		position: isMobile ? 'absolute' : 'relative',
		bottom: isMobile ? 0 : 'unset',
		zIndex: 100,
	}

	const footerStyles = { margin: 0 }

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
			{/* <TransitionCreationModalButton direction='prev' /> */}

			<section style={modalWrapperStyles}>
				<article style={innerModalWrapperStyles}>
					<div style={imageHeaderPromptWrapperStyles}>
						<CrModalImage
							appWidth={appWidth}
							creation={creation}
							creationIndex={creationIndex}
							currentCreationIndex={currentCreationIndex}
							isMobile={isMobile}
						/>

						<Col style={headerPromptWrapperStyles}>
							<CrModalHeader
								layout='modal'
								creation={creation}
								appWidth={appWidth}
								isMobile={isMobile}
								displayAddress={displayAddress}
								reactionCountList={reactionCountList}
							/>

							<CreationPrompt
								layout='modal'
								creationData={creation}
								appWidth={appWidth}
								isMobile={isMobile}
								prompt={prompt}
								GeneratorName={GeneratorName}
								currentTheme={currentTheme}
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

			{/* <TransitionCreationModalButton direction='next' /> */}
			{/* <CrModalDebug /> */}
		</Modal>
	)
}

export default CreationModal
