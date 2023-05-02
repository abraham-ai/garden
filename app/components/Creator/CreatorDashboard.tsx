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

			<Text>{profileAddress}</Text>
		</Row>
	)
}

export default CreatorDashboard
