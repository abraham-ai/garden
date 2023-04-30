import React from 'react'
import type { FC } from 'react'

import { Row, Button, Typography } from 'antd'
const { Text } = Typography

interface CreatorDashboardTypes {
	profileAddress: string
}

const CreatorDashboard: FC<CreatorDashboardTypes> = ({ profileAddress }) => {
	const [isFollowing, setIsFollowing] = React.useState<boolean>(false)

	const handleFollow = (): void => {
		setIsFollowing(!isFollowing)
	}

	return (
		<Row
			style={{
				display: 'flex',
				width: '100%',
				justifyContent: 'center',
			}}
		>
			<Row style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
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
			</Row>

			<Text>{profileAddress}</Text>
		</Row>
	)
}

export default CreatorDashboard
