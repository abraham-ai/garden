'use client'

import type { FC } from 'react'
import type Creation from '../../../interfaces/Creation'
import type CreatorProfile from '../../../interfaces/CreatorProfile'

import React, { useState, useEffect, useMemo } from 'react'
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

	// console.log({ isMobile })
	// console.log({ isTablet })
	// console.log({ isOverlay })
	// console.log({ isRelative })

	// console.log({ isRelative })
	// console.log({ isCrIdPage })
	// console.log({ isThemeLight })

	const handleCreatorColorStyles = useMemo(() => {
		if (isMobile) {
			if (isOverlay) {
				return isThemeLight ? styles.crCreator : styles.crCreatorDark
			} else if (isRelative) {
				return isThemeLight ? styles.crCreator : styles.crCreatorDark
			} else {
				return isThemeLight ? styles.crCreator : styles.crCreatorDark
			}
		} else if (isTablet) {
			return isThemeLight ? styles.crCreator : styles.crCreatorDark
		} else {
			if (isOverlay) {
				return isThemeLight ? styles.crCreator : styles.crCreatorDark
			} else if (isRelative) {
				return isThemeLight ? styles.crCreator : styles.crCreatorDark
			}
		}
	}, [appWidth])

	const usernameColor = useMemo(() => {
		if (isMobile) {
			if (isOverlay) {
				return isThemeLight ? 'black' : 'white'
			} else if (isRelative) {
				return isThemeLight ? 'black' : 'white'
			} else if (isCrIdPage) {
				return isThemeLight ? 'black' : 'white'
			} else {
				return isThemeLight ? 'black' : 'black'
			}
		} else if (isTablet) {
			if (isOverlay) {
				return isThemeLight ? 'black' : 'white'
			} else if (isRelative) {
				return isThemeLight ? 'black' : 'white'
			} else if (isCrIdPage) {
				return isThemeLight ? 'black' : 'white'
			} else {
				return isThemeLight ? 'black' : 'white'
			}
		} else {
			if (isOverlay) {
				return isThemeLight ? 'white' : 'white'
			} else if (isRelative) {
				return isThemeLight ? 'black' : 'black'
			} else if (isCrIdPage) {
				return isThemeLight ? 'black' : 'black'
			} else {
				return isThemeLight ? 'black' : 'white'
			}
		}
	}, [appWidth])

	// console.log({ usernameColor })

	const usernameSize = useMemo(() => {
		if (isMobile) {
			if (isOverlay) {
				return '1rem'
			} else if (isRelative) {
				return '1rem'
			} else {
				return '1rem'
			}
		} else if (isTablet) {
			if (isOverlay) {
				return '1rem'
			} else if (isRelative) {
				return '1rem'
			} else {
				return '1rem'
			}
		} else {
			if (isOverlay) {
				return '1rem'
			} else if (isRelative) {
				return '1rem'
			} else {
				return '1rem'
			}
		}
	}, [appWidth])

	// console.log({ creation })
	// console.log(creation?.user)
	// console.log({ handleUsernameColor })

	const isCreator =
		typeof creator?.user.username !== 'undefined' &&
		creator?.user.username !== null &&
		creator?.user.username !== ''

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

	const creatorDisplay = handleCreatorDisplay()
	const creatorAddress = handleCreatorAddress()

	console.log('Creation User', creation?.user)
	console.log({ isCreator })
	console.log({ creation })
	console.log({ creator })
	console.log({ creatorDisplay })
	console.log({ creatorAddress })
	console.log({ usernameColor })
	console.log({ layout })

	return (
		<>
			<Link
				href={{
					pathname: `/creator/${String(creation?.user)}`,
					// query: { user: creation?.user },
				}}
				as={`/creation/${String(creation?._id)}`}
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
						className={handleCreatorColorStyles}
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
