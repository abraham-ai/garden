'use client'

import type { FC } from 'react'
import type Creation from '../../interfaces/Creation'
import type CreatorProfile from '../../interfaces/CreatorProfile'

import React, { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'

import timeAgo from '../../../util/timeAgo'

import Blockies from 'react-blockies'
import CreationDate from './CreationDate'
import abbreviateAddress from '../../../util/abbreviateAddress'

import styles from '../../../styles/CreationId.module.css'
import { Typography, Avatar } from 'antd'

const { Text } = Typography

interface CreationCreatorProps {
	layout: string
	page: string
	creationData: Creation
	appWidth: number
	currentTheme: string
	creator: CreatorProfile
}

const CreationCreator: FC<CreationCreatorProps> = ({
	layout,
	page,
	creationData,
	appWidth,
	currentTheme,
	creator,
}) => {
	const [isMounted, setIsMounted] = useState<boolean>(false)
	const [isHovering, setIsHovering] = useState<boolean>(true)

	const timeAgoCreatedAt = timeAgo(Date.parse(creationData?.createdAt))

	const handleMouseOver = (): void => {
		setIsHovering(true)
	}

	const handleMouseOut = (): void => {
		setIsHovering(false)
	}

	// console.log({ currentTheme })
	// console.log({ layout})

	const isThemeLight = currentTheme === 'light'

	const isOverlay = layout === 'overlay'
	const isModal = layout === 'modal'
	const isRelative = layout === 'relative'
	const isCrIdPage = page === 'creationId'

	const isMobile = appWidth < 768
	const isTablet = appWidth >= 768 && appWidth <= 1024

	// console.log({ isMobile })
	// console.log({ isTablet })
	// console.log({ isOverlay })
	// console.log({ isModal })

	// console.log({ isRelative })
	// console.log({ isCrIdPage })
	// console.log({ isThemeLight })

	useEffect(() => {
		setIsMounted(true)
		return () => {
			setIsMounted(false)
		}
	}, [])

	const usernameColor = useMemo(() => {
		if (isMounted) {
			if (isMobile) {
				if (isOverlay) {
					return isThemeLight ? 'black' : 'white'
				} else if (isModal) {
					return isThemeLight ? 'black' : 'white'
				} else if (isCrIdPage) {
					return isThemeLight ? 'black' : 'white'
				} else {
					return isThemeLight ? 'black' : 'black'
				}
			} else if (isTablet) {
				if (isOverlay) {
					return isThemeLight ? 'black' : 'white'
				} else if (isModal) {
					return isThemeLight ? 'black' : 'white'
				} else if (isCrIdPage) {
					return isThemeLight ? 'black' : 'white'
				} else {
					return isThemeLight ? 'black' : 'white'
				}
			} else {
				if (isOverlay) {
					return isThemeLight ? 'black' : 'white'
				} else if (isModal) {
					return isThemeLight ? 'black' : 'black'
				} else if (isCrIdPage) {
					return isThemeLight ? 'black' : 'black'
				} else {
					return isThemeLight ? 'black' : 'white'
				}
			}
		}
	}, [appWidth])

	// console.log({ usernameColor })

	const usernameSize = useMemo(() => {
		if (isMobile) {
			if (isOverlay) {
				return '1rem'
			} else if (isModal) {
				return '1rem'
			} else {
				return '1rem'
			}
		} else if (isTablet) {
			if (isOverlay) {
				return '1rem'
			} else if (isModal) {
				return '1rem'
			} else {
				return '1rem'
			}
		} else {
			if (isOverlay) {
				return '1rem'
			} else if (isModal) {
				return '1rem'
			} else {
				return '1rem'
			}
		}
	}, [appWidth])

	// console.log({ creationData })
	// console.log(creationData?.user)
	// console.log({ handleUsernameColor })

	const handleCreatorDisplay = (): string => {
		if (isCreator) {
			return creator?.user?.username
		} else {
			return abbreviateAddress(creationData?.user ?? '')
		}
	}

	const handleCreatorAddress = (): string => {
		if (isCreator) {
			return creator?.user?.userId
		} else {
			return creationData?.user ?? ''
		}
	}

	const isCreator =
		typeof creator?.user !== 'undefined' && creator?.user !== null

	const creatorDisplay = handleCreatorDisplay()
	const creatorAddress = handleCreatorAddress()

	return (
		<>
			<Link
				href={{
					pathname: `/creator/${String(creationData?.creation?.user)}`,
					// query: { user: creationData?.user },
				}}
				className={styles.crCreator}
				onMouseOver={handleMouseOver}
				onMouseOut={handleMouseOut}
				style={{
					textDecoration: isHovering ? 'underline' : 'unset',
				}}
			>
				<Avatar size={50} icon={<Blockies scale={6} seed={creatorAddress} />} />
				<div
					className={styles.crCreatorNameWrapper}
					onMouseOver={handleMouseOver}
					onMouseOut={handleMouseOut}
				>
					<Text
						style={{
							textDecoration: isHovering ? 'underline' : 'unset',
							fontSize: usernameSize,
							color: usernameColor,
							fontWeight: isMobile ? 'bold' : 'regular',
							margin: 0,
						}}
					>
						{creatorDisplay}
					</Text>
				</div>
			</Link>
			<CreationDate
				timeAgoCreatedAt={timeAgoCreatedAt}
				appWidth={appWidth}
				page={page}
				layout={layout}
			/>
		</>
	)
}

export default CreationCreator
