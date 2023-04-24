import React, { useContext } from 'react'
import type { FC } from 'react'
import type Creation from '../../interfaces/Creation'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import AppContext from '../../context/AppContext'

import Blockies from 'react-blockies'

import timeAgo from '../../util/timeAgo'
import abbreviateText from '../../util/abbreviateText'
import abbreviateAddress from '../../util/abbreviateAddress'
import { Modal, Typography, Col } from 'antd'

import styles from '../../styles/CreationModal.module.css'

const { Text } = Typography

interface CreationModalTypes {
	modalOpen: boolean
	setModalOpen: (open: boolean) => void
	creation: Creation
	creationIndex: number
	isMobile: boolean
}

const CreationModal: FC<CreationModalTypes> = ({
	modalOpen,
	setModalOpen,
	creation,
	creationIndex,
	isMobile,
}) => {
	const context = useContext(AppContext)
	const currentCreationIndex = context?.currentCreationIndex || 0
	const setCurrentCreationIndex =
		context?.setCurrentCreationIndex != null
			? context.setCurrentCreationIndex
			: (index: number) => {}
	const creations = context?.creations != null || []

	const router = useRouter()

	const handleModalTransition = (direction: string) => {
		// console.log(`click ${direction}`)
		// console.log(currentCreationIndex)

		if (direction === 'next') {
			setCurrentCreationIndex(currentCreationIndex + 1)
		} else if (direction === 'prev') {
			setCurrentCreationIndex(currentCreationIndex - 1)
		}
	}

	const timeAgoCreatedAt = timeAgo(Date.parse(creation.createdAt))

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

	return (
		<Modal
			className={'crModal'}
			title=''
			open={modalOpen}
			width={isMobile ? '100vw' : '90vw'}
			footer={<></>}
			onCancel={() => {
				setModalOpen(false)
				router.push('/')
			}}
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				maxWidth: 1200,
				height: isMobile ? '100%' : 'auto',
			}}
		>
			{/* <Button
				shape='circle'
				style={{ position: 'absolute', transform: 'translateX(-45px)' }}
				onClick={() => {
					handleModalTransition('prev')
				}}
			>
				{'<'}
			</Button> */}
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					borderRadius: 10,
					overflow: 'hidden',
					height: isMobile ? '100%' : 'auto',
				}}
			>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						height: isMobile ? '100%' : 'auto',
					}}
				>
					<div
						style={{
							display: 'flex',
							flexDirection: isMobile ? 'column' : 'row',
							height: isMobile ? '100%' : 'auto',
						}}
					>
						<Col
							style={{
								flex: isMobile ? 1 : '1 0 600px',
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
								src={creation.thumbnail}
								width={creation.task.config.width}
								height={creation.task.config.height}
								alt={creation.task.config.text_input}
								style={{
									width: '100%',
									height: 'auto',
									zIndex: 50,
								}}
							/>
							<Image
								src={creation.thumbnail}
								width={creation.task.config.width}
								height={creation.task.config.height}
								alt={creation.task.config.text_input}
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

						<Col
							style={{
								display: 'flex',
								flexDirection: 'column',
								padding: isMobile ? 20 : 40,
								justifyContent: 'center',
								position: isMobile ? 'absolute' : 'relative',
								bottom: isMobile ? 0 : 'unset',
								zIndex: 100,
							}}
						>
							<article
								style={{
									display: 'flex',
									alignItems: 'center',
									marginBottom: isMobile ? 20 : 50,
								}}
							>
								<div
									style={{
										display: 'flex',
										alignItems: 'center',
										marginRight: 10,
									}}
								>
									<span
										style={{
											borderRadius: '50%',
											overflow: 'hidden',
											width: '32px',
											height: '32px',
											marginRight: 10,
										}}
									>
										<Blockies seed={creation.user} />
									</span>
									<Text
										className={styles.displayAddress}
										style={{
											color: isMobile ? 'white' : 'black',
											fontWeight: isMobile ? 'bold' : 'regular',
										}}
									>
										{displayAddress}
									</Text>
								</div>
								<Text
									className={styles.crDate}
									style={{
										color: isMobile ? 'white' : 'black',
										fontWeight: isMobile ? 'bold' : 'regular',
									}}
								>
									{timeAgoCreatedAt}
								</Text>
							</article>

							<article className={styles.promptWrapper}>
								<Text
									className={styles.crPromptCommand}
									style={{
										fontSize: isMobile ? '1em' : '2rem',
										fontWeight: isMobile ? 'bold' : 'regular',
									}}
								>{`/${String(creation.task.generator.generatorName)} `}</Text>
								<Text
									className={styles.crPrompt}
									style={{
										fontSize: isMobile ? '1em' : '2rem',
										color: isMobile ? 'white' : 'black',
										fontWeight: isMobile ? 'bold' : 'regular',
									}}
								>
									{prompt}
								</Text>
							</article>

							{/* <span
								style={{
									display: 'flex',
									flexDirection: 'column',
									marginTop: 10,
									flex: 0,
									justifyContent: 'flex-end',
								}}
							>
								<Text style={{ fontFamily: 'courier' }}>{creation._id}</Text>
								<Text style={{ fontFamily: 'courier' }}>
									{currentCreationIndex === 0
										? creationIndex
										: currentCreationIndex}
								</Text>
							</span> */}
						</Col>
					</div>
				</div>
			</div>
			{/* <Button
				shape='circle'
				style={{
					position: 'absolute',
					transform: 'translateX(45px)',
					right: 0,
				}}
				onClick={() => {
					handleModalTransition('next')
				}}
			>
				{'>'}
			</Button> */}
		</Modal>
	)
}

export default CreationModal
