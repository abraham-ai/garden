'use client'

import React, { useEffect, useState } from 'react'
import type { FC, CSSProperties } from 'react'

import { useRouter } from 'next/router'
import Image from 'next/image'

import type CreationTypes from '../../interfaces/Creation'

import emptyCreation from '../../constants/emptyCreation'

import styles from '../../styles/CreationId.module.css'

import Blockies from 'react-blockies'
import Header from '../../app/components/NavBar/Header'
import CreationSocial from '../../app/components/CreationSocial'
import CreationSaveModal from '../../app/components/CreationSaveModal'

import abbreviateAddress from '../../util/abbreviateAddress'
import timeAgo from '../../util/timeAgo'

import useGetCreation from '../../hooks/useGetCreation'
import useGetReactionCount from '../../hooks/useGetReactionCount'
import useWindowDimensions from '../../hooks/useWindowDimensions'
import { useReaction } from '../../context/ReactionContext'

import { Col, Row, Typography, Avatar, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

import { SlSizeFullscreen } from 'react-icons/sl'
import { MdOutlineDateRange } from 'react-icons/md'
import { BsAspectRatio } from 'react-icons/bs'

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

const { Title, Text } = Typography

// type CrSocialStyleContext = (
// 	isMobile: boolean,
// 	isCrModal: boolean,
// 	appWidth: number
// ) => 'column' | 'row'

interface CreationCreatorProps {
	creationData: CreationTypes
}

const CreationCreator: FC<CreationCreatorProps> = ({ creationData }) => {
	return (
		<div className={styles.crCreator}>
			<Avatar
				className='profileAvatarWrapper'
				// style={{ display: 'flex', flex: 1 }}
				size={50}
				icon={<Blockies scale={6} seed={creationData?.user} />}
			/>
			<div className={styles.crCreatorNameWrapper}>
				<Title level={3} className='profileName' style={{ marginTop: 10 }}>
					{abbreviateAddress(creationData?.user ?? '')}
				</Title>
				{/* <Text style={{ marginLeft: 10 }}>
													{timeAgoCreatedAt}
												</Text> */}
			</div>
		</div>
	)
}

interface CreationImageProps {
	creationData: CreationTypes
	size: string
}

const CreationImage: FC<CreationImageProps> = ({ size, creationData }) => {
	return (
		<Col className={styles.creation}>
			<Row className={styles.crPost}>
				<article className={`${styles.crCard} ${size}`}>
					<div className={styles.crImgWrapper}>
						<div className={styles.crImgWrapperMain}>
							<Image
								className={styles.crImg}
								style={{ width: '100%' }}
								width={creationData?.task?.config?.width ?? 0}
								height={creationData?.task?.config?.height ?? 0}
								alt={creationData?.task?.config?.text_input ?? ''}
								src={creationData?.thumbnail ?? ''}
							/>
						</div>

						<div className={styles.crImgWrapperBackground}>
							<Image
								className={styles.crImg}
								style={{ width: '100%' }}
								width={creationData?.task?.config?.width ?? 0}
								height={creationData?.task?.config?.height ?? 0}
								alt={creationData?.task?.config?.text_input ?? ''}
								src={creationData?.thumbnail ?? ''}
							/>
						</div>
					</div>
				</article>
			</Row>
		</Col>
	)
}

interface CreationPageProps {
	params: { id: string }
	creation: CreationTypes
	size?: string
}

const Creation: FC<CreationPageProps> = ({
	params,
	creation = emptyCreation,
	size = 'regular',
}) => {
	const router = useRouter()

	const [isMounted, setIsMounted] = useState<boolean>(false)

	// const [isMounted, setIsMounted] = useState(false)

	useEffect(() => {
		setIsMounted(true)
	}, [])

	const queryCreationId = Array.isArray(router.query.creationId)
		? router.query.creationId[0]
		: router.query.creationId ?? ''

	// console.log(creationId)
	// console.log(router.query)

	const creationData = useGetCreation(queryCreationId)
	// console.log({ creationData })

	const { width: appWidth } = useWindowDimensions()

	const reactionCountList = useGetReactionCount(String(creation?._id))
	const { reactionState, updateReactionState } = useReaction()

	const isMobile = appWidth < 768

	const isCreationData =
		typeof creationData !== 'undefined' &&
		creationData !== null &&
		typeof creationData._id !== 'undefined'

	const isReactionStateNotInitialized =
		creationData != null &&
		(reactionState[creationData._id]?.praises === undefined ||
			reactionState[creationData._id]?.praised === undefined ||
			reactionState[creationData._id]?.burns === undefined ||
			reactionState[creationData._id]?.burned === undefined)

	useEffect(() => {
		if (isCreationData && isReactionStateNotInitialized) {
			const praisesData = reactionCountList?.praises ?? 0
			const praisedData = reactionCountList?.praised ?? false
			const burnsData = reactionCountList?.burns ?? 0
			const burnedData = reactionCountList?.burned ?? false

			updateReactionState(creation._id, {
				praises: praisesData,
				praised: praisedData,
				burns: burnsData,
				burned: burnedData,
			})
		}
	}, [
		reactionCountList,
		updateReactionState,
		creationData,
		isReactionStateNotInitialized,
	])

	const isCreationDataTaskConfig =
		typeof creationData !== 'undefined' &&
		creationData !== null &&
		creation?._id !== undefined &&
		!(creationData._id in reactionState) &&
		typeof creationData?.task?.config?.text_input !== 'undefined'

	// console.log({ isCreationDataTaskConfig })

	let timeAgoCreatedAt = '0'
	if (isCreationDataTaskConfig) {
		// console.log(creationData)
		// console.log(creationData.task.config.text_input)
		// console.log(creationData.createdAt)
		timeAgoCreatedAt = timeAgo(creationData.createdAt)

		// console.log(timeAgoCreatedAt)
	}

	// console.log('[creationId]: CreationId: ' + queryCreationId)

	const styleContext: boolean = isMobile

	const handleCrWrapSocialFlex = (
		styleContext
	): CSSProperties['flexDirection'] => {
		if (styleContext === true) {
			return 'column'
		} else {
			return 'row'
		}
	}

	const crWrapSocialFlex = handleCrWrapSocialFlex(styleContext)

	console.log(handleCrWrapSocialFlex)

	return (
		<>
			<Header />

			<CreationSaveModal />

			<section style={{ display: 'flex', justifyContent: 'center' }}>
				<Col
					className={styles.creationIdWrapper}
					style={{
						flexDirection: isMounted ? crWrapSocialFlex : undefined,
						margin: isMobile ? '80px 10px' : '150px 50px 0 50px;',
						justifyContent: isMobile ? 'center' : 'center',
						width: '100%',
						maxWidth: 1000,
					}}
				>
					{isCreationData ? (
						<>
							<CreationImage creationData={creationData} size={size} />

							<article className={styles.creationText}>
								<div
									className={styles.crPostText}
									style={{ maxWidth: isMobile ? 'unset' : 'unset' }}
								>
									{/* <Text>{creationId}</Text> */}
									{/* <Text>{'Server:'} {creationData.creation._id}</Text> */}
									{/* <pre>{JSON.stringify(creationData, null, 2)}</pre> */}

									<section className={styles.crMain}>
										<Row
											style={{
												display: 'flex',
												flexDirection: 'row',
												justifyContent: 'space-between',
											}}
										>
											<article className={styles.crMainHeader}>
												<CreationCreator creationData={creationData} />
											</article>

											<Row
												style={{
													position: 'relative',
													display: 'block',
													height: 'auto',
													padding: 0,
													margin: '10px 0 0 0',
												}}
											>
												<CreationSocial
													layout={'minimal'}
													creation={creationData}
													creationId={queryCreationId}
													reactionCountList={{
														praises:
															reactionState[queryCreationId]?.praises ?? 0,
														praised:
															reactionState[queryCreationId]?.praised ?? false,
														burns: reactionState[queryCreationId]?.burns ?? 0,
														burned:
															reactionState[queryCreationId]?.burned ?? false,
													}}
													appWidth={appWidth}
													isMobile={isMobile}
													isCrModal={false}
													isCrIdPage={true}
												/>
											</Row>
										</Row>

										<div style={{ display: 'flex', flexDirection: 'column' }}>
											<Text style={{ color: 'purple', fontWeight: 600 }}>
												{'/dream'}
											</Text>
											<Text style={{ fontSize: '1.1rem', lineHeight: 1.3 }}>
												{creationData?.task?.config?.text_input ?? 'No text'}
											</Text>

											<ul className={styles.crPropertiesWrapper}>
												<li className={styles.crProperty}>
													<span className={styles.crPropertyType}>
														<MdOutlineDateRange className='icon' />
														<Text>{'Date'}</Text>
													</span>
													<Text>{timeAgoCreatedAt}</Text>
												</li>
												<li className={styles.crProperty}>
													<span className={styles.crPropertyType}>
														<SlSizeFullscreen className='icon' />
														<Text>{'Size'}</Text>
													</span>
													<Text>{'512 x 512'}</Text>
												</li>
												<li className={styles.crProperty}>
													<span className={styles.crPropertyType}>
														<BsAspectRatio className='icon' />
														<Text>{'Command'}</Text>
													</span>
													<Text>{'/dream'}</Text>
												</li>
												<li className={styles.crProperty}>
													<span className={styles.crPropertyType}>
														<BsAspectRatio className={styles.icon} />
														<Text>{'Shape'}</Text>
													</span>
													<Text>{'square'}</Text>
												</li>
											</ul>
										</div>
									</section>
								</div>
							</article>
						</>
					) : (
						<Row style={{ display: 'flex', justifyContent: 'center' }}>
							<Spin indicator={antIcon} />
						</Row>
					)}
				</Col>
			</section>
		</>
	)
}

export default Creation
