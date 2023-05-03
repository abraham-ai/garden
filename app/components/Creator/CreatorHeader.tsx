import type { FC } from 'react'
import type CreatorProfile from '../../../interfaces/CreatorProfile'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'

import styles from '../../../styles/CreatorHeader.module.css'

import { Avatar, Typography, Col, Row, Skeleton } from 'antd'

import Blockies from 'react-blockies'
import abbreviateAddress from '../../../util/abbreviateAddress'

const { Title } = Typography

type CreatorRoute = 'creations' | 'collections' | 'editprofile'

interface CreatorHeaderProps {
	creator: CreatorProfile
	creatorRoute: CreatorRoute
}

const CreatorHeader: FC<CreatorHeaderProps> = ({
	creator,
	creatorRoute = 'creations',
}) => {
	const [userAddress, setUserAddress] = useState<string>('')
	const [userName, setUserName] = useState<string>('')

	const isCreator = typeof creator !== 'undefined' && creator !== null
	const isCreatorUser =
		typeof creator?.creatorProfile?.user?.userId !== 'undefined' &&
		creator?.creatorProfile?.user?.userId !== null

	// console.log(creator?.creatorProfile?.user?.userId)

	useEffect(() => {
		if (isCreator && isCreatorUser) {
			setUserAddress(creator?.creatorProfile?.user?.userId ?? '')
			setUserName(creator?.creatorProfile?.user?.username ?? '')
		}
	}, [creator])

	const isCollectionsRoute = creatorRoute === 'collections'
	const isCreationsRoute = creatorRoute === 'creations'

	const handleCreatorDisplayName = (): string => {
		if (isCreator && isCreatorUser) {
			return userName
		}

		// if (isUserAddress) {
		// 	return abbreviateAddress(userAddress)
		// }
	}

	const displayAddress = handleCreatorDisplayName()

	// console.log({ isCreator })
	// console.log({ isCreatorUser })
	// console.log({ creator })
	// console.log({ userAddress })
	// console.log({ userName })
	// console.log({ displayAddress })

	return (
		<article className={styles.creatorHeaderWrapperStyles}>
			<span className={styles.creatorProfileStyles}>
				<Col className={styles.profileWrapperStyles}>
					<Skeleton loading={!isCreator} active size={50}>
						<Avatar
							className={styles.profileAvatarWrapperStyles}
							size={64}
							icon={
								<Blockies
									scale={8}
									seed={String(isCreator && isCreatorUser ? userAddress : '')}
								/>
							}
						/>
					</Skeleton>

					<Skeleton
						loading={!isCreator}
						active
						paragraph={{ rows: 0 }}
						style={{
							display: 'flex',
							justifyContent: 'center',
							textAlign: 'center',
						}}
					>
						<Link href={`/creator/${String(userName)}`}>
							<Title level={3} className={styles.profileName}>
								{displayAddress}
							</Title>
						</Link>
					</Skeleton>
				</Col>
			</span>
		</article>
	)
}

export default CreatorHeader
