import type { FC } from 'react'
import type Creator from '../../../interfaces/Creator'
import React from 'react'
import Link from 'next/link'

import { Avatar, Typography, Col, Row } from 'antd'

import Blockies from 'react-blockies'

import abbreviateAddress from '../../../util/abbreviateAddress'
const { Title } = Typography

interface CreatorHeaderProps {
	collectionId?: string
	userAddress?: string
	isMyCreationsRoute?: boolean
	isMyCollectionsRoute?: boolean
	queryCreatorId?: string
	creator?: Creator
}

const CreatorHeader: FC<CreatorHeaderProps> = ({
	collectionId,
	userAddress,
	isMyCreationsRoute = false,
	isMyCollectionsRoute = false,
	queryCreatorId = '',
	creator,
}) => {
	const handleCreatorDisplayName = (): string => {
		if (typeof creator !== 'undefined') {
			if (typeof creator?.creatorProfile?.user !== 'undefined') {
				return creator?.creatorProfile?.user?.username
			}
		}

		if (typeof userAddress === 'string') {
			return abbreviateAddress(userAddress)
		}
	}

	const displayAddress = handleCreatorDisplayName()

	console.log({ creator })
	console.log({ displayAddress })

	const isCollectionRoute = typeof collectionId !== 'undefined'

	// const isCreationRoute = typeof creatorId !== 'undefined'
	// console.log({ collectionId })
	// console.log({ isCollectionRoute })

	const isQueryCreatorId =
		typeof queryCreatorId !== 'undefined' && queryCreatorId !== ''

	const creatorHeaderWrapperStyles = {
		display: 'flex',
		flex: 1,
		justifyContent: 'space-between',
	}

	const profileWrapperStyles = {
		zIndex: 150,
		position: 'relative',
		margin: '150px 0 20px 0',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		width: '100%',
	}

	const creatorProfileStyles = {
		width: '100%',
		display: 'flex',
		flex: 2,
		flexDirection: 'column',
		alignItems: 'flex-start',
	}

	return (
		<article className='creatorHeader' style={creatorHeaderWrapperStyles}>
			<span className='creatorProfile' style={creatorProfileStyles}>
				<Col style={profileWrapperStyles}>
					<Avatar
						className='profileAvatarWrapper'
						style={{ display: 'flex', flex: 1 }}
						size={64}
						icon={<Blockies scale={8} seed={String(userAddress)} />}
					/>

					<Link href={`/creator/${String(userAddress)}`}>
						<Title level={3} className='profileName' style={{ marginTop: 10 }}>
							{displayAddress}
						</Title>
					</Link>
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
