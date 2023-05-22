import type { FC } from 'react'
import type CreatorProfile from '../../../interfaces/CreatorProfile'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import styles from '../../../styles/CreatorHeader.module.css'

import { Avatar, Typography, Col, Skeleton, Button, Row } from 'antd'

import Blockies from 'react-blockies'
import { AiFillEdit } from 'react-icons/ai'

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
	const router = useRouter()

	const [userAddress, setUserAddress] = useState<string>('')
	const [userName, setUserName] = useState<string>('')
	const [isHovering, setIsHovering] = useState<boolean>(false)

	const isCreator = typeof creator !== 'undefined' && creator !== null
	const isCreatorUser =
		typeof creator?.username !== 'undefined' && creator?.username !== null

	// console.log(creator?.user?.userId)

	useEffect(() => {
		if (isCreator && isCreatorUser) {
			setUserAddress(creator?.username ?? '')
			setUserName(creator?.username ?? '')
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
		return ''
	}

	const displayAddress = handleCreatorDisplayName()

	// console.log({ isCreator })
	// console.log({ isCreatorUser })
	// console.log({ creator })
	// console.log({ userAddress })
	// console.log({ userName })
	// console.log({ displayAddress })

	const handleMouse = (type: 'mouseover' | 'mouseout') => (): void => {
		if (type === 'mouseover') {
			setIsHovering(true)
		} else if (type === 'mouseout') {
			setIsHovering(false)
		}
	}

	const handleEditClick = (): void => {
		router.push('/editprofile')
	}

	return (
		<article className={styles.creatorHeaderWrapperStyles}>
			<span className={styles.creatorProfileStyles}>
				<Col className={styles.profileWrapperStyles}>
					<Skeleton loading={!isCreator} active>
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
						<Row
							style={{
								display: 'flex',
								alignItems: 'center',
								paddingLeft: 30,
							}}
							onMouseOver={handleMouse('mouseover')}
							onMouseOut={handleMouse('mouseout')}
						>
							<Link href={`/creator/${String(userName)}`}>
								<Title level={3} className={styles.profileName}>
									{displayAddress}
								</Title>
							</Link>
							<Button
								style={{
									fontSize: '1.4rem',
									opacity: isHovering ? 1 : 0,
									width: 30,
									marginTop: 10,
									marginLeft: 10,
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
								}}
								type='text'
								icon={<AiFillEdit />}
								onClick={() => {
									handleEditClick()
								}}
							/>
						</Row>
					</Skeleton>
				</Col>
			</span>
		</article>
	)
}

export default CreatorHeader
