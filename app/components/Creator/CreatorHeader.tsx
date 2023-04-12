import React from 'react'
import type { FC } from 'react'
import Link from 'next/link'

import { Avatar, Typography, Button } from 'antd'

import Blockies from 'react-blockies'

import abbreviateAddress from '../../../util/abbreviateAddress'
const { Title, Text } = Typography

interface CreatorHeaderTypes {
	userId?: string
}

const CreatorHeader: FC<CreatorHeaderTypes> = ({ userId }) => {
	let displayAddress = ''
	if (typeof userId === 'string') {
		displayAddress = abbreviateAddress(userId)
	}

	return (
		<article
			className='creatorHeader'
			style={{ display: 'flex', flex: 1, justifyContent: 'space-between' }}
		>
			<span
				className='creatorProfile'
				style={{
					width: '100%',
					background: 'white',
					display: 'flex',
					flex: 2,
					flexDirection: 'column',
					alignItems: 'flex-start',
				}}
			>
				<span
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
						icon={<Blockies scale={8} seed={userId} />}
					/>
					<Title level={3} className='profileName' style={{ marginTop: 10 }}>
						{displayAddress}
					</Title>
				</span>

				<div
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
						style={{ display: 'flex', justifyContent: 'center', width: '100%' }}
					>
						<Link href='/editprofile'>
							<Button
								shape='round'
								style={{ marginRight: 20, background: 'rgba(0,0,0,0.05)' }}
							>
								<Text style={{ fontWeight: 'bold', color: 'gray' }}>
									{'Edit Profile'}
								</Text>
							</Button>
						</Link>

						<Link href='/mycollections'>
							<Button shape='round' style={{ background: 'rgba(0,0,0,0.05)' }}>
								<Text style={{ fontWeight: 'bold', color: 'gray' }}>
									{'Collections'}
								</Text>
							</Button>
						</Link>
					</div>
				</div>
			</span>
		</article>
	)
}

export default CreatorHeader
