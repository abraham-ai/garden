'use client'

import type { FC } from 'react'
import type Creation from '../../../interfaces/Creation'
import type CreatorProfile from '../../../interfaces/CreatorProfile'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'

import Blockies from 'react-blockies'
import CreationDate from './CreationDate'
import timeAgo from '../../../util/timeAgo'
import abbreviateAddress from '../../../util/abbreviateAddress'

import styles from '../../../styles/CreationId.module.css'
import { Typography, Avatar } from 'antd'

const { Text } = Typography

interface CreationCreatorProps {
	layout: string
	page: string
	creation: Creation
	appWidth: number
	currentTheme: string
	creator: CreatorProfile
}

const CreationCreator: FC<CreationCreatorProps> = ({
	layout,
	page,
	creation,
	appWidth,
	currentTheme,
	creator,
}) => {
	const [isHovering, setIsHovering] = useState<boolean>(true)

	const timeAgoCreatedAt = timeAgo(Date.parse(creation?.createdAt))

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
	const isRelative = layout === 'relative'
	const isCrIdPage = page === 'creationId'

	const isMobile = appWidth < 768
	const isTablet = appWidth >= 768 && appWidth <= 1024

	const creatorColorStyles = useMemo(() => {
		if (isMobile) {
			if (isOverlay) {
				return isThemeLight ? styles.crCreatorBlack : styles.crcrCreatorWhite
			} else if (isRelative) {
				return isThemeLight ? styles.crCreatorBlack : styles.crCreatorWhite
			} else if (isCrIdPage) {
				return isThemeLight ? styles.crCreatorBlack : styles.crCreatorWhite
			} else {
				return isThemeLight ? styles.crCreatorBlack : styles.crCreatorBlack
			}
		} else if (isTablet) {
			if (isOverlay) {
				return isThemeLight ? styles.crCreatorWhite : styles.crCreatorWhite
			} else if (isRelative) {
				return isThemeLight ? styles.crCreatorBlack : styles.crCreatorWhite
			} else if (isCrIdPage) {
				return isThemeLight ? styles.crCreatorBlack : styles.crCreatorWhite
			} else {
				return isThemeLight ? styles.crCreatorBlack : styles.crCreatorWhite
			}
		} else {
			if (isOverlay) {
				console.log('isOverlay')
				return isThemeLight ? styles.crCreatorWhite : styles.crCreatorWhite
			} else if (isRelative) {
				return isThemeLight ? styles.crCreatorBlack : styles.crCreatorBlack
			} else if (isCrIdPage) {
				return isThemeLight ? styles.crCreatorBlack : styles.crCreatorBlack
			} else {
				return isThemeLight ? styles.crCreatorBlack : styles.crCreatorWhite
			}
		}
	}, [appWidth])

	const creatorSizeStyles = useMemo(() => {
		if (isMobile) {
			if (isOverlay) {
				return styles.crCreatorSizeDefault
			} else if (isRelative) {
				return styles.crCreatorSizeDefault
			} else {
				return styles.crCreatorSizeDefault
			}
		} else if (isTablet) {
			if (isOverlay) {
				return styles.crCreatorSizeDefault
			} else if (isRelative) {
				return styles.crCreatorSizeDefault
			} else {
				return styles.crCreatorSizeDefault
			}
		} else {
			if (isOverlay) {
				return styles.crCreatorSizeDefault
			} else if (isRelative) {
				return styles.crCreatorSizeDefault
			} else {
				return styles.crCreatorSizeDefault
			}
		}
	}, [appWidth])

	const isCreator =
		typeof creator?.user.username !== 'undefined' &&
		creator?.user?.username !== null &&
		creator?.user?.username !== ''

	const handleCreatorDisplay = (): string => {
		if (isCreator) {
			return creator?.user?.username
		} else {
			return abbreviateAddress(creation?.user ?? '')
		}
	}

	const handleCreatorAddress = (): string => {
		if (isCreator) {
			return creator?.user?.userId
		} else {
			return creation?.user ?? ''
		}
	}

	const creatorUsername = creator?.user?.username ?? ''
	const creatorDisplay = handleCreatorDisplay()
	const creatorAddress = handleCreatorAddress()

	// console.log('Creation User', creation?.user)
	// console.log({ isCreator })
	// console.log({ creation })
	// console.log({ creator })
	// console.log({ creatorDisplay })
	// console.log({ creatorAddress })
	// console.log({ creatorColorStyles })

	// console.log({ creatorSizeStyles })
	// console.log({ isMobile })
	// console.log({ isTablet })
	// console.log({ isOverlay })
	// console.log({ isRelative })

	// console.log({ isRelative })
	// console.log({ isCrIdPage })
	// console.log({ isThemeLight })
	// console.log({ layout })

	return (
		<section
			style={{
				display: 'flex',
				flexDirection: 'row',
				justifyContent: 'space-between',
			}}
		>
			<Link
				href={{
					pathname: `/creator/${String(creation?.user)}`,
					// query: { user: creation?.user },
				}}
				// as={`/creator/${String(creation?._id)}`}
				className={styles.crCreatorLink}
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
						className={`${creatorColorStyles} ${creatorSizeStyles}`}
						style={{
							textDecoration: isHovering ? 'underline' : 'unset',
							fontWeight: isMobile ? 'bold' : 'regular',
						}}
					>
						{isCreator ? creatorUsername : creatorDisplay}
					</Text>
				</div>
			</Link>

			<CreationDate
				timeAgoCreatedAt={timeAgoCreatedAt}
				appWidth={appWidth}
				page={page}
				layout={layout}
			/>
		</section>
	)
}

export default CreationCreator
