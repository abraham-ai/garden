import type { FC } from 'react'
import type Creation from '../../../../interfaces/Creation'
import type CreatorProfile from '../../../../interfaces/CreatorProfile'

import React, {
	useState,
	useEffect,
	useCallback,
	useContext,
	useMemo,
} from 'react'
import AppContext from '../../../../context/AppContext'

import { ColorExtractor } from 'react-color-extractor'

import useGetReactionCount from '../../../../hooks/useGetReactionCount'
import { useReaction } from '../../../../context/ReactionContext'

import CreationModal from '../CreationModal/CreationModal'
import CreationSocial from '../CreationSocial'

import CrImageLink from './CrImageLink'
import CrCardMobile from './CrCardMobile'
import CrCardDesktop from './CrCardDesktop'

import styles from '../../../../styles/CreationCard.module.css'

import { Skeleton } from 'antd'

interface CreationCardProps {
	creation: Creation
	layout?: string
	index: number
	appWidth: number
	currentTheme: string
	creator: CreatorProfile
	page: string
}

const CreationCard: FC<CreationCardProps> = ({
	layout = 'overlay',
	creation,
	index,
	appWidth,
	currentTheme,
	creator,
	page,
}) => {
	const context = useContext(AppContext)
	const currentCreationIndex = context?.currentCreationIndex ?? 0
	const creationsData = useMemo(
		() => context?.creationsData ?? [],
		[context?.creationsData]
	)

	const [modalOpen, setModalOpen] = useState<boolean>(false)
	const [currentCreation, setCurrentCreation] = useState<Creation>(
		creationsData[currentCreationIndex]
	)

	const [crColor, setCrColor] = useState<string[]>([])
	const [isCrImageLinkLoading, setIsCrImageLinkLoading] =
		useState<boolean>(true)

	const [_id, setId] = useState<string>('')
	const [user, setUser] = useState<string>('')
	const [textInput, setTextInput] = useState<string>('')
	const [thumbnail, setThumbnail] = useState<string>('')
	const [uri, setUri] = useState<string>('')
	const [createdAt, setCreatedAt] = useState<string>('')
	const [generatorName, setGeneratorName] = useState<string>('')
	const [width, setWidth] = useState<number>(0)
	const [height, setHeight] = useState<number>(0)

	const [isCreationHovering, setIsCreationHovering] = useState<boolean>(true)

	const [status, setStatus] = useState<string>('')

	const reactionCountList = useGetReactionCount(creation._id)
	const { reactionState, updateReactionState } = useReaction()
	// console.log(reactionCountList)

	const isReactionCountListState =
		reactionCountList != null &&
		typeof reactionState[creation._id] === 'undefined'

	const isMobile = appWidth < 768

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
		[
			setCurrentCreation,
			setId,
			setUser,
			setTextInput,
			setThumbnail,
			setUri,
			setCreatedAt,
			setGeneratorName,
			setWidth,
			setHeight,
		]
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

	const isCrThumbnail = typeof creation?.thumbnail === 'undefined'

	// useEffect(() => {
	// 	if (isCrThumbnail) {
	// 		;
	// 	}
	// }, [creation.thumbnail])

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

	const hoverStyles = isCreationHovering
		? styles.crCardHoverWrapper
		: styles.crCardWrapper

	const getColors = (colors): void => {
		setCrColor(colors)
		setTimeout(() => {
			setIsCrImageLinkLoading(false)
		}, 500)
	}

	const isCreationDataCreationIndex =
		typeof creationsData[currentCreationIndex] === 'undefined' ||
		typeof creationsData[currentCreationIndex]._id === 'undefined'

	// console.log({ prompt })
	// console.log({ crColor })
	// console.log({ index })

	const aspectRatio =
		creation?.task?.config?.height / creation?.task?.config?.width

	return (
		<>
			<section
				className={hoverStyles}
				onMouseOver={handleMouseOver}
				onMouseOut={handleMouseOut}
				// style={{ backgroundColor: crColor[0] }}
			>
				<article
					id={`creationCard${isMobile ? ' isMobile' : ''}`}
					className={styles.crCard}
					// style={{ backgroundColor: crColor[0] }}
				>
					<span style={{ display: 'none' }}>
						<ColorExtractor getColors={getColors}>
							<img src={creation.thumbnail} />
						</ColorExtractor>
					</span>

					<div className={styles.crTopWrapper}>
						<div className={styles.crImageWrapper}>
							<Skeleton loading={typeof creation === 'undefined'} active>
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
													<CrCardMobile
														creation={creation}
														creator={creator}
														appWidth={appWidth}
														currentTheme={currentTheme}
														page={page}
													/>
												) : (
													<CrCardDesktop
														creation={creation}
														creator={creator}
														appWidth={appWidth}
														currentTheme={currentTheme}
														page={page}
													/>
												)}
											</div>

											<div className={styles.crContentHoverBgWrapper} />
										</>
									) : null}

									<section
										className={styles.crImageLinkWrapper}
										style={{
											paddingTop: `${aspectRatio * 100}%`,
											// '--aspect-ratio': aspectRatio,
											background: crColor[0],
										}}
									>
										{!isCrImageLinkLoading && (
											<CrImageLink
												creation={creation}
												appWidth={appWidth}
												isCreationHovering={isCreationHovering}
												showModal={showModal}
												crBgColor={crColor[0]}
												creationIndex={index}
											/>
										)}
									</section>

									{isCreationHovering || isMobile ? (
										<div
											className={
												isMobile
													? styles.crContentMainMobile
													: styles.crContentHoverSocialWrapper
											}
										>
											<CreationSocial
												layout='relative'
												creation={creation}
												creationId={creation._id}
												reactionCountList={{
													praises: reactionState[creation._id]?.praises ?? 0,
													praised:
														reactionState[creation._id]?.praised ?? false,
													burns: reactionState[creation._id]?.burns ?? 0,
													burned: reactionState[creation._id]?.burned ?? false,
												}}
												appWidth={appWidth}
											/>
										</div>
									) : null}
								</section>
							</Skeleton>
						</div>
					</div>
				</article>
			</section>

			<CreationModal
				creation={
					isCreationDataCreationIndex
						? creation
						: creationsData[currentCreationIndex]
				}
				setModalOpen={setModalOpen}
				modalOpen={modalOpen}
				creationIndex={index}
				appWidth={appWidth}
				reactionCountList={{
					praises: reactionState[creation._id]?.praises ?? 0,
					praised: reactionState[creation._id]?.praised ?? false,
					burns: reactionState[creation._id]?.burns ?? 0,
					burned: reactionState[creation._id]?.burned ?? false,
				}}
				page={page}
			/>
		</>
	)
}

export default CreationCard
