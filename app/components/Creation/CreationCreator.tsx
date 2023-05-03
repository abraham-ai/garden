'use client'

import type { FC } from 'react'
import type Creation, from '../../interfaces/Creation'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'

import Blockies from 'react-blockies'
import CreationDate from './CreationDate'
import abbreviateAddress from '../../../util/abbreviateAddress'

import styles from '../../../styles/CreationId.module.css'
import modalStyles from '../../../../styles/CreationModal.module.css'
import { Typography, Avatar, Row } from 'antd'

const { Title, Text } = Typography

interface CreationCreatorProps {
	layout: string
	creationData: Creation
	displayAddress: string
	timeAgoCreatedAt: string
	appWidth: number
	user: string
}

const CreationCreator: FC<CreationCreatorProps> = ({
	layout,
	creationData,
	displayAddress,
	appWidth,
	timeAgoCreatedAt,
	user,
	currentTheme,
}) => {
	const [isHovering, setIsHovering] = useState<boolean>(false)

	const handleMouseOver = (): void => {
		setIsHovering(true)
	}

	const handleMouseOut = (): void => {
		setIsHovering(false)
	}

	console.log({ currentTheme })
	console.log({ layout})

	const isThemeLight = currentTheme === 'light'

	const isOverlay= layout === 'overlay'
	const isModal = layout === 'modal'

	const isMobile = appWidth <= 768
	const isTablet = appWidth >= 768 && appWidth <= 1024

	console.log({ isMobile })
	console.log({ isTablet })

	const handleUsernameColor = useMemo(() => {
		if (isMobile) {
			if (isOverlay) {
				return isThemeLight ? 'black' : 'white'
			} else if (isModal) {
				return isThemeLight ? 'black' : 'white'
			} else {
				return isThemeLight ? 'black' : 'white'
			}
		} else if (isTablet) {
			if (isOverlay) {
				return isThemeLight ? 'black' : 'white'
			} else if (isModal) {
				return isThemeLight ? 'black' : 'white'
			} else {
				return isThemeLight ? 'white' : 'white'
			}
		} else {
			if (isOverlay) {
				return isThemeLight ? 'white' : 'white'
			} else if (isModal) {
				return isThemeLight ? 'black' : 'black'
			} else {
				return isThemeLight ? 'white' : 'white'
			}
		}
	}, [appWidth])

	const handleUsernameSize = useMemo(() => {
		if (appWidth <= 768) {
			return '1rem'
		} else if (appWidth >= 768 && appWidth <= 1024) {
			return '1rem'
		} else {
			return '1.5rem'
		}
	}, [appWidth])

	console.log({ creationData })
	console.log(creationData?.user)

	console.log({ handleUsernameColor })

	return (
		<Link
			href={{
				pathname: `/creator/${String(creationData?.user)}`,
				query: { user },
			}}
			className={styles.crCreator}
			onMouseEnter={handleMouseOver}
			onMouseOut={handleMouseOut}
			style={{
				textDecoration: isHovering ? 'underline' : 'unset',
			}}
		>
			<Avatar
				size={50}
				icon={<Blockies scale={6} seed={creationData?.user} />}
			/>
			<div
				className={styles.crCreatorNameWrapper}
				onMouseOver={handleMouseOver}
				onMouseOut={handleMouseOut}
			>
				<Text
					style={{
						textDecoration: isHovering ? 'underline' : 'unset',
						fontSize: handleUsernameSize,
						color: handleUsernameColor,
						fontWeight: isMobile ? 'bold' : 'regular',
						margin: 0,
					}}
				>
					{abbreviateAddress(creationData?.user ?? '')}
				</Text>
			</div>

			<CreationDate
				timeAgoCreatedAt={timeAgoCreatedAt}
				isMobile={isMobile}
				appWidth={appWidth}
			/>
		</Link>
	)
}

export default CreationCreator
