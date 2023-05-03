'use client'

import type { FC } from 'react'
import type Creation from '../../interfaces/Creation'

import React, { useState } from 'react'
import Link from 'next/link'

import Blockies from 'react-blockies'
import abbreviateAddress from '../../../util/abbreviateAddress'

import styles from '../../../styles/CreationId.module.css'
import modalStyles from '../../../../styles/CreationModal.module.css'
import { Typography, Avatar, Row } from 'antd'

const { Title, Text } = Typography

interface CreationCreatorProps {
	creationData: Creation
	displayAddress: string
	isMobile: boolean
	timeAgoCreatedAt: string
	appWidth: number
	user: string
}

const CreationCreator: FC<CreationCreatorProps> = ({
	creationData,
	displayAddress,
	appWidth,
	isMobile,
	timeAgoCreatedAt,
	user,
}) => {
	console.log({ creationData })
	const [isHovering, setIsHovering] = useState<boolean>(false)

	const handleMouseOver = (): void => {
		setIsHovering(true)
	}

	const handleMouseOut = (): void => {
		setIsHovering(false)
	}

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
				<Title
					level={3}
					style={{
						textDecoration: isHovering ? 'underline' : 'unset',
						color: isMobile ? 'white' : 'black',
						fontWeight: isMobile ? 'bold' : 'regular',
						margin: 0,
					}}
				>
					{abbreviateAddress(creationData?.user ?? '')}
				</Title>
			</div>

			<Row
				style={{
					display: 'flex',
					alignItems: 'center',
					marginBottom: isMobile ? 20 : 50,
				}}
			>
				<Text
					className={styles.crDate}
					style={{
						color: isMobile ? 'white' : 'black',
						fontWeight: isMobile ? 'bold' : 'regular',
					}}
				>
					{timeAgoCreatedAt}
				</Text>
			</Row>
		</Link>
	)
}

export default CreationCreator
