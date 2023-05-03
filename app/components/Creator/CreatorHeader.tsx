import type { FC, CSSProperties } from 'react'
import type CreatorProfile from '../../../interfaces/CreatorProfile'
import React from 'react'
import Link from 'next/link'

import styles from '../../../styles/CreatorHeader.module.css'

import { Avatar, Typography, Col, Row, Skeleton } from 'antd'

import Blockies from 'react-blockies'

import abbreviateAddress from '../../../util/abbreviateAddress'
const { Title } = Typography

interface CreatorHeaderProps {
	collectionId?: string
	userName?: string
	userAddress?: string
	isMyCreationsRoute?: boolean
	isMyCollectionsRoute?: boolean
	queryCreatorId?: string
	creator?: CreatorProfile
}

const CreatorHeader: FC<CreatorHeaderProps> = ({
	collectionId,
	userAddress,
	userName,
	isMyCreationsRoute = false,
	isMyCollectionsRoute = false,
	queryCreatorId = '',
	creator,
}) => {
	const isCreator = typeof creator !== 'undefined'

	const isUserName = typeof userName === 'string'
	const isUserAddress =
		typeof userAddress === 'string' && typeof userAddress !== 'undefined'

	const isQueryCreatorId =
		typeof queryCreatorId !== 'undefined' && queryCreatorId !== ''

	const isCollectionRoute = typeof collectionId !== 'undefined'

	const handleCreatorDisplayName = (): string => {
		if (isCreator) {
			if (typeof creator?.profile?.creatorProfile?.user !== 'undefined') {
				return creator?.profile?.creatorProfile?.user?.username
			}
		}

		if (isUserName) {
			return userName
		}

		if (isUserAddress) {
			return abbreviateAddress(userAddress)
		}
		return ''
	}

	const displayAddress = handleCreatorDisplayName()

	console.log({ creator })
	console.log({ displayAddress })
	console.log({ isUserAddress })

	// const isCreationRoute = typeof creatorId !== 'undefined'
	// console.log({ collectionId })
	// console.log({ isCollectionRoute })

	return (
		<article className={styles.creatorHeaderWrapperStyles}>
			<span className={styles.creatorProfileStyles}>
				<Col className={styles.profileWrapperStyles}>
					<Skeleton.Avatar loading={isUserAddress} active size={50}>
						<Avatar
							className={styles.profileAvatarWrapperStyles}
							size={64}
							icon={
								<Blockies
									scale={8}
									seed={String(isUserAddress ? userAddress : displayAddress)}
								/>
							}
						/>
					</Skeleton.Avatar>

					<Skeleton
						loading={isUserAddress}
						active
						paragraph={{ rows: 0 }}
						style={{
							display: 'flex',
							justifyContent: 'center',
							textAlign: 'center',
						}}
					>
						<Link href={`/creator/${String(userAddress)}`}>
							<Title level={3} className={styles.profileName}>
								{displayAddress}
							</Title>
						</Link>
					</Skeleton>
				</Col>

				{isQueryCreatorId ? (
					<Row
						className='creator-profile-info'
						style={{
							display: 'flex',
							flex: 1,
							flexDirection: 'column',
							alignItems: 'flex-start',
							width: '100%',
						}}
					>
						<div
							className='profile-actions'
							style={{
								display: 'flex',
								justifyContent: 'center',
								width: '100%',
							}}
						>
							{/* <Link href='/editprofile'>
								<Button
									shape='round'
									style={{ marginRight: 20, background: 'rgba(0,0,0,0.05)' }}
								>
									<Text style={{ fontWeight: 'bold', color: 'gray' }}>
										{'Edit Profile'}
									</Text>
								</Button>
							</Link> */}

							{/* <Link href='/mycreations'>
								<Button
									shape='round'
									type={isMyCreationsRoute ? 'primary' : 'default'}
									style={{ marginRight: 10 }}
								>
									<Text
										style={{
											fontWeight: 'bold',
											color: isMyCreationsRoute ? 'white' : 'gray',
										}}
									>
										{'Creations'}
									</Text>
								</Button>
							</Link>

							<Link href='/mycollections'>
								<Button
									shape='round'
									type={isMyCollectionsRoute ? 'primary' : 'default'}
									// style={{ background: 'rgba(0,0,0,0.05)' }}
								>
									<Text
										style={{
											fontWeight: 'bold',
											color: isMyCollectionsRoute ? 'white' : 'gray',
										}}
									>
										{'Collections'}
									</Text>
								</Button>
							</Link> */}
						</div>
					</Row>
				) : null}
			</span>
		</article>
	)
}

export default CreatorHeader
