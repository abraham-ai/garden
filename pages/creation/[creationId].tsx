'use client'

import type { FC, CSSProperties } from 'react'

import Creation from '../../interfaces/Creation'

import React, { useEffect, useState, useContext, useMemo } from 'react'
import AppContext from '../../context/AppContext'
import { useRouter } from 'next/router'

import emptyCreation from '../../constants/emptyCreation'
import emptyCreatorProfile from '../../constants/emptyCreatorProfile'

import styles from '../../styles/CreationId.module.css'

import Header from '../../app/components/NavBar/Header'
import CreationSocial from '../../app/components/Creation/CreationSocial'
import CreationSaveModal from '../../app/components/Creation/CreationSaveModal/CreationSaveModal'
import CreationCreator from '../../app/components/Creation/CreationCreator'
import CreationIdImage from '../../app/components/Creation/CreationId/CreationIdImage'
import CreationProperties from '../../app/components/Creation/CreationId/CreationProperties'
import timeAgo from '../../util/timeAgo'

import useGetCreation from '../../hooks/useGetCreation'
import useGetReactionCount from '../../hooks/useGetReactionCount'
import useWindowDimensions from '../../hooks/useWindowDimensions'
import { useReaction } from '../../context/ReactionContext'

import { Col, Row, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

interface CreationPageProps {
	params: { id: string }
	creation: Creation
	size?: string
}

const Creation: FC<CreationPageProps> = ({
	params,
	creation = emptyCreation,
	size = 'regular',
}) => {
	const router = useRouter()
	const context = useContext(AppContext)

	const currentTheme = context?.currentTheme ?? 'light'

	// const [isMounted, setIsMounted] = useState<boolean>(false)

	const isCrIdPage = true
	// const [isMounted, setIsMounted] = useState(false)

	// useEffect(() => {
	// 	setIsMounted(true)
	// 	return () => {
	// 		setIsMounted(false)
	// 	}
	// }, [])

	const queryCreationId = Array.isArray(router.query.creationId)
		? router.query.creationId[0]
		: router.query.creationId ?? ''

	// console.log(creationId)
	// console.log(router.query)

	const creationData = useGetCreation(queryCreationId)
	console.log({ creationData })

	const { width: appWidth } = useWindowDimensions()

	const reactionCountList = useGetReactionCount(String(creation?._id))
	const { reactionState, updateReactionState } = useReaction()

	const isMobile: boolean = appWidth < 768
	const isTablet: boolean = appWidth >= 768 && appWidth < 1024

	const isCreationData =
		typeof creationData !== 'undefined' &&
		creationData !== null &&
		typeof creationData.creation._id !== 'undefined'

	const isReactionStateNotInitialized =
		creationData != null &&
		(reactionState[creationData.creation._id]?.praises === undefined ||
			reactionState[creationData.creation._id]?.praised === undefined ||
			reactionState[creationData.creation._id]?.burns === undefined ||
			reactionState[creationData.creation._id]?.burned === undefined)

	// console.log({ isReactionStateNotInitialized })

	useEffect(() => {
		if (isCreationData && isReactionStateNotInitialized) {
			const praisesData = reactionCountList?.praises ?? 0
			const praisedData = reactionCountList?.praised ?? false
			const burnsData = reactionCountList?.burns ?? 0
			const burnedData = reactionCountList?.burned ?? false

			updateReactionState(creationData?.creation?._id, {
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

	const isCrDataCreation =
		typeof creationData !== 'undefined' &&
		typeof creationData?.creation !== 'undefined'

	const isCrDataCreationId = typeof creationData?.creation?._id !== 'undefined'

	const isCrDataCreationIdReactionState =
		isCrDataCreationId && !(creationData.creation._id in reactionState)

	const isCrDataCreationTask = creationData.creation.task

	const isCrDataCreationTaskConfig = creationData.creation.task.config

	const isCrDataCreationTaskConfigTextInput =
		typeof creationData.creation.task.config.text_input !== 'undefined'

	// console.log({ isCrDataCreation })
	// console.log({ isCrDataCreationId })
	// console.log({ isCrDataCreationIdReactionState })
	// console.log({ isCrDataCreationTask })
	// console.log({ isCrDataCreationTaskConfig })
	// console.log({ isCrDataCreationTaskConfigTextInput })
	// console.log({ creationData })

	let timeAgoCreatedAt = '0'
	if (isCrDataCreation) {
		// console.log(creationData)
		// console.log(creationData.task.config.text_input)
		// console.log(creationData.createdAt)
		timeAgoCreatedAt = timeAgo(creationData?.creation?.createdAt)
		// console.log(timeAgoCreatedAt)
	}

	// console.log('[creationId]: CreationId: ' + queryCreationId)

	const crIdWrapperStyles: CSSProperties = {
		display: 'flex',
		justifyContent: 'center',
	}

	const crCreatorSocialWrapperStyles: CSSProperties = useMemo(() => {
		return {
			display: 'flex',
			flexDirection: isMobile ? 'column' : 'column',
			justifyContent: 'space-between',
			margin: '0 0 20px 0',
		}
	}, [isMobile])

	let displayAddress
	if (isCreationData) {
		// console.log(creationData)
		// displayAddress = creationData?.creator?.user?.userId ?? ''
		displayAddress = creationData?.creation?.user ?? ''
	}

	return (
		<>
			<Header />

			<CreationSaveModal />

			<section style={crIdWrapperStyles}>
				{isCreationData ? (
					<Col className={styles.crId}>
						<CreationIdImage creationData={creationData} appWidth={appWidth} />

						<section className={styles.crContent}>
							<Row style={crCreatorSocialWrapperStyles}>
								<article className={styles.crHeader}>
									<CreationCreator
										creationData={creationData.creation}
										creator={creationData?.creator ?? emptyCreatorProfile}
										layout='relative'
										page='creationId'
										displayAddress={displayAddress}
										timeAgoCreatedAt={timeAgoCreatedAt}
										appWidth={appWidth}
										currentTheme={currentTheme}
									/>
								</article>

								<Row className={styles.crIdSocialWrapper}>
									<CreationSocial
										layout='relative'
										creation={creationData}
										creationId={queryCreationId}
										reactionCountList={{
											praises: reactionState[queryCreationId]?.praises ?? 0,
											praised: reactionState[queryCreationId]?.praised ?? false,
											burns: reactionState[queryCreationId]?.burns ?? 0,
											burned: reactionState[queryCreationId]?.burned ?? false,
										}}
										appWidth={appWidth}
									/>
								</Row>
							</Row>

							<Col className={styles.crPromptProperties}>
								<CreationProperties
									creationData={creationData}
									timeAgoCreatedAt={timeAgoCreatedAt}
								/>
							</Col>
						</section>
					</Col>
				) : (
					<Row style={{ display: 'flex', justifyContent: 'center' }}>
						<Spin indicator={antIcon} />
					</Row>
				)}
			</section>
		</>
	)
}

export default Creation
