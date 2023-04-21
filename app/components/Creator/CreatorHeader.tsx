import React from 'react'
import type { FC } from 'react'
import Link from 'next/link'

import { Avatar, Typography, Col, Row, Button } from 'antd'

import Blockies from 'react-blockies'

import abbreviateAddress from '../../../util/abbreviateAddress'
const { Title, Text } = Typography

interface CreatorHeaderProps {
	collectionId?: string
	userId?: string
	isMyCreationsRoute?: boolean
	isMyCollectionsRoute?: boolean
	queryCreatorId?: string
}

const CreatorHeader: FC<CreatorHeaderProps> = ({
	collectionId,
	userId,
	isMyCreationsRoute = false,
	isMyCollectionsRoute = false,
	queryCreatorId = '',
}) => {
	let displayAddress = ''
	if (typeof userId === 'string') {
		displayAddress = abbreviateAddress(userId)
	}

	const isCollectionRoute = typeof collectionId !== 'undefined'
	// const isCreationRoute = typeof creatorId !== 'undefined'

	console.log({ collectionId })
	console.log({ isCollectionRoute })

	const isQueryCreatorId =
		typeof queryCreatorId !== 'undefined' && queryCreatorId !== ''

	return (
		<article
			className='creatorHeader'
			style={{ display: 'flex', flex: 1, justifyContent: 'space-between' }}
		>
			<span
				className='creatorProfile'
				style={{
					width: '100%',
					// background: 'white',
					display: 'flex',
					flex: 2,
					flexDirection: 'column',
					alignItems: 'flex-start',
				}}
			>
				<Col
					style={{
						zIndex: 150,
						position: 'relative',
						margin: '150px 0 20px 0',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						width: '100%',
					}}
				>
					<Avatar
						className='profileAvatarWrapper'
						style={{ display: 'flex', flex: 1 }}
						size={64}
						icon={<Blockies scale={8} seed={String(userId)} />}
					/>
					<Title level={3} className='profileName' style={{ marginTop: 10 }}>
						{displayAddress}
					</Title>
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
