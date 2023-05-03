import React, { useState } from 'react'
import type { FC } from 'react'

import { Row, Typography } from 'antd' // Button,
const { Text } = Typography

interface CreatorDashboardProps {
	profileAddress: string
}

const CreatorDashboard: FC<CreatorDashboardProps> = ({ profileAddress }) => {
	// const [isFollowing, setIsFollowing] = useState<boolean>(false)

	// const handleFollow = (): void => {
	// 	setIsFollowing(!isFollowing)
	// }

	return (
		<Row
			style={{
				display: 'flex',
				width: '100%',
				justifyContent: 'center',
			}}
		>
			{/* <Row style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
				<Button
					size='large'
					type={isFollowing ? 'default' : 'primary'}
					shape='round'
					onClick={() => {
						handleFollow()
					}}
				>
					{isFollowing ? 'Following' : 'Follow'}
				</Button>
			</Row> */}

			{isCreator ? (
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

			<Text>{profileAddress}</Text>
		</Row>
	)
}

export default CreatorDashboard
