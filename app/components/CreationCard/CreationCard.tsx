import React, {
	useState,
	useEffect,
	useCallback,
	useContext,
	useMemo,
} from 'react'
import type { FC } from 'react'

import type Creation from '../../../interfaces/Creation'

import AppContext from '../../../context/AppContext'

import Image from 'next/image'
import Link from 'next/link'

import timeAgo from '../../../util/timeAgo'
import abbreviateText from '../../../util/abbreviateText'
import abbreviateAddress from '../../../util/abbreviateAddress'

import useGetReactionCount from '../../../hooks/useGetReactionCount'
import { useReaction } from '../../../context/ReactionContext'

import CreationModal from './CreationModal'
import styles from '../../../styles/CreationCard.module.css'
import CreationSocial from './CreationSocial'

import Blockies from 'react-blockies'

import { Skeleton, Typography, Col } from 'antd'
const { Text } = Typography

interface CreationCardProps {
	creation: Creation
	index: number
	isMobile: boolean
	appWidth: number
}

const CreationCard: FC<CreationCardProps> = ({
	creation,
	index,
	isMobile,
	appWidth,
}) => {
	// console.log(creation)

	const context = useContext(AppContext)
	const currentCreationIndex = context?.currentCreationIndex ?? 0
	const creationsData = useMemo(
		() => context?.creationsData != null || [],
		[context?.creationsData]
	)
	const currentTheme = context?.currentTheme ?? 'light'

	const [modalOpen, setModalOpen] = useState<boolean>(false)
	const [currentCreation, setCurrentCreation] = useState<Creation>(
		creationsData[currentCreationIndex] as Creation
	)

	const [_id, setId] = useState<string>('')
	const [user, setUser] = useState<string>('')
	const [textInput, setTextInput] = useState<string>('')
	const [thumbnail, setThumbnail] = useState<string>('')
	const [uri, setUri] = useState<string>('')
	const [createdAt, setCreatedAt] = useState<string>('')
	const [generatorName, setGeneratorName] = useState<string>('')
	const [width, setWidth] = useState<number>(0)
	const [height, setHeight] = useState<number>(0)

	const [isCreationHovering, setIsCreationHovering] = useState<boolean>(false)

	const [praises, setPraises] = useState<number>(0)
	const [praised, setPraised] = useState<boolean>(false)
	const [burns, setBurns] = useState<number>(0)
	const [burned, setBurned] = useState<boolean>(false)

	const [status, setStatus] = useState<string>('')

	const reactionCountList = useGetReactionCount(creation._id)
	const { reactionState, updateReactionState } = useReaction()
	// console.log(reactionCountList)

	const timeAgoCreatedAt = timeAgo(Date.parse(creation?.createdAt))

	const isReactionCountListState =
		reactionCountList != null &&
		typeof reactionState[creation._id] === 'undefined'

	const showModal = (): void => {
		setModalOpen(true)
	}

	useEffect(() => {
		if (isReactionCountListState) {
			const {
				praises: praisesData,
				praised: praisedData,
				burns: burnsData,
				burned: burnedData,
			} = reactionCountList

			updateReactionState(creation._id, {
				praises: praisesData,
				praised: praisedData,
				burns: burnsData,
				burned: burnedData,
			})
		}
	}, [reactionCountList, reactionState, updateReactionState, creation._id])

	const handleCreationUpdate = useCallback(
		(currentCreation, currentCreationIndex) => {
			if (
				typeof currentCreation !== 'undefined' &&
				currentCreationIndex !== 0
			) {
				setUri(currentCreation.uri)
				setCreatedAt(currentCreation.createdAt)
				setGeneratorName(currentCreation.task.generator.generatorName)
				setWidth(currentCreation.task.config.width)
				setHeight(currentCreation.task.config.height)
				setTextInput(currentCreation.task.config.text_input)
				setUser(currentCreation.user)
				setThumbnail(currentCreation.thumbnail)
				setId(currentCreation._id)
				setStatus(currentCreation.task.status)
			}
		},
		[]
	)

	useEffect(() => {
		setCurrentCreation(creation)
		handleCreationUpdate(
			creationsData[currentCreationIndex],
			currentCreationIndex
		)
	}, [
		creation,
		creationsData,
		handleCreationUpdate,
		currentCreation,
		currentCreationIndex,
	])

	const handleMouseOver = (): void => {
		setIsCreationHovering(true)
		if (
			reactionCountList != null &&
			typeof reactionState[creation._id] === 'undefined'
		) {
			const {
				praises: praisesData,
				praised: praisedData,
				burns: burnsData,
				burned: burnedData,
			} = reactionCountList

			updateReactionState(creation._id, {
				praises: praisesData,
				praised: praisedData,
				burns: burnsData,
				burned: burnedData,
			})
		}
	}

	const handleMouseOut = (): void => {
		setIsCreationHovering(false)
	}

	let displayAddress = ''
	if (typeof user === 'string') {
		displayAddress = abbreviateAddress(creation.user)
	}

	let prompt = ''
	// console.log({ textInput })
	// console.log({ creation })

	const creationTextInput = creation.task.config.text_input
	if (creationTextInput !== '' && typeof creationTextInput !== 'undefined') {
		if (isMobile) {
			prompt = abbreviateText(creationTextInput, 100)
		} else if (creation.task.config.height > 550) {
			prompt = abbreviateText(creationTextInput, 80) // 100
		} else if (creation.task.config.height > 500) {
			prompt = abbreviateText(creationTextInput, 40) // 100
		} else if (creation.task.config.height > 450) {
			prompt = abbreviateText(creationTextInput, 30) // 100
		} else if (creation.task.config.height > 400) {
			prompt = abbreviateText(creationTextInput, 25) // 100
		} else {
			prompt = abbreviateText(creationTextInput, 20) // 100
		}
	}

	// console.log({ praises, praised, burns, burned })
	// console.log({ isCreationHovering })

	const hoverStyles = isCreationHovering
		? styles.crCardHoverWrapper
		: styles.crCardWrapper

	const GeneratorName = creation?.task?.generator?.generatorName

	// console.log({ creation })
	// console.log({ currentTheme })
	// console.log({ isMobile })

	return (
		<>
			<section
				className={hoverStyles}
				onMouseOver={handleMouseOver}
				onMouseOut={handleMouseOut}
			>
				<article
					id={`creationCard${isMobile ? ' isMobile' : ''}`}
					className={styles.crCard}
				>
					<div className={styles.crTopWrapper}>
						<div className={styles.crImageWrapper}>
							{typeof creation === 'undefined' ? (
								<Skeleton />
							) : (
								<section>
									{isCreationHovering || isMobile ? (
										<>
											<div
												className={
													isMobile
														? styles.crContentMainMobile
														: styles.crContentMain
												}
											>
												{isMobile ? (
													<div className={styles.crPromptMainWrapper}>
														<Link
															href={{
																pathname: `/creator/${String(creation.user)}`,
																query: { user },
															}}
															style={{
																display: 'flex',
																alignItems: isMobile ? 'flex-start' : 'center',
																marginRight: 10,
															}}
														>
															<span
																style={{
																	borderRadius: '50%',
																	overflow: 'hidden',
																	width: isMobile ? '48px' : '32px',
																	height: isMobile ? '48px' : '32px',
																	marginRight: isMobile ? 0 : 10,
																	background: 'white',
																}}
															>
																<Blockies seed={creation.user} size={12} />
															</span>
														</Link>
														<article className={styles.promptWrapper}>
															<Col
																style={{
																	order: isMobile ? 2 : 'unset',
																}}
															>
																<Text
																	className={styles.crPromptCommand}
																>{`/${String(GeneratorName)} `}</Text>
																<Text
																	className={styles.crPrompt}
																	style={{
																		color:
																			currentTheme === 'light'
																				? 'black'
																				: 'white',
																	}}
																>
																	{prompt}
																</Text>
															</Col>
															<div
																style={{
																	display: 'flex',
																	order: isMobile ? 1 : 'unset',
																	alignItems: 'center',
																	marginTop: isMobile ? 0 : 10,
																}}
															>
																<Text className={styles.displayAddress}>
																	{displayAddress}
																</Text>
																<Text className={styles.crDate}>
																	{timeAgoCreatedAt}
																</Text>
															</div>
														</article>
													</div>
												) : (
													<div className={styles.crPromptMainWrapper}>
														<article className={styles.promptWrapper}>
															<Col
																style={{
																	order: isMobile ? 2 : 'unset',
																}}
															>
																<Text
																	className={styles.crPromptCommand}
																>{`/${String(GeneratorName)} `}</Text>
																<Text
																	className={styles.crPrompt}
																	style={{
																		color:
																			currentTheme === 'ligiht'
																				? 'black'
																				: 'white',
																	}}
																>
																	{prompt}
																</Text>
															</Col>
															<div
																style={{
																	display: 'flex',
																	order: isMobile ? 1 : 'unset',
																	alignItems: 'center',
																	marginTop: 10,
																}}
															>
																<Link
																	href={{
																		pathname: `/creator/${String(
																			creation.user
																		)}`,
																		query: { user },
																	}}
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
																			background: 'orange',
																		}}
																	>
																		<Blockies seed={creation.user} />
																	</span>

																	<Text className={styles.displayAddress}>
																		{displayAddress}
																	</Text>
																</Link>
																<Text className={styles.crDate}>
																	{timeAgoCreatedAt}
																</Text>
															</div>
														</article>
													</div>
												)}
											</div>

											<div
												className={styles.crContentHoverBgWrapper}
												style={{ marginLeft: isMobile ? 60 : 0 }}
											/>
										</>
									) : null}

									<Link
										className={styles.crLink}
										href={`/?creationId=${creation._id}`}
										as={`/creation/${creation._id}`}
										scroll={false}
										style={{
											color: 'black',
											flexDirection: 'column',
											background: 'black',
											border: 20,
											marginLeft: isMobile ? 60 : 0,
											position: isMobile ? 'relative' : 'relative',
											borderRadius: isMobile ? 10 : 'unset',
											overflow: 'hidden',
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
											src={creation.thumbnail}
											height={creation.task.config.height}
											width={creation.task.config.width}
											alt={creation.task.config.text_input}
											style={{
												backdropFilter: isCreationHovering
													? undefined
													: 'unset',
											}}
										/>
										<Image
											className={styles.crImageMain}
											src={creation.thumbnail}
											height={creation.task.config.height}
											width={creation.task.config.width}
											alt={creation.task.config.text_input}
										/>
									</Link>

									{isCreationHovering || isMobile ? (
										<>
											<CreationSocial
												isMobile={isMobile}
												creation={creation}
												creationId={creation._id}
												reactionCountList={{
													praises: reactionState[creation._id]?.praises ?? 0,
													praised:
														reactionState[creation._id]?.praised ?? false,
													burns: reactionState[creation._id]?.burns ?? 0,
													burned: reactionState[creation._id]?.burned ?? false,
												}}
												isCrModal={false}
												isCrIdPage={false}
												appWidth={appWidth}
											/>
										</>
									) : null}
								</section>
							)}
						</div>
					</div>
				</article>
			</section>
			<CreationModal
				creation={
					typeof creationsData[currentCreationIndex] === 'undefined' ||
					typeof (creationsData[currentCreationIndex] as Creation)._id ===
						'undefined'
						? creation
						: creationsData[currentCreationIndex]
				}
				setModalOpen={setModalOpen}
				modalOpen={modalOpen}
				creationIndex={index}
				isMobile={isMobile}
				appWidth={appWidth}
				reactionCountList={{
					praises: reactionState[creation._id]?.praises ?? 0,
					praised: reactionState[creation._id]?.praised ?? false,
					burns: reactionState[creation._id]?.burns ?? 0,
					burned: reactionState[creation._id]?.burned ?? false,
				}}
			/>
		</>
	)
}

export default CreationCard
