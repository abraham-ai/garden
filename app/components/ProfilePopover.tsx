import React from 'react'
import { Button, Popover, Typography } from 'antd'

import CreatorProfileAddress from './Creator/CreatorProfileAddress'
const { Text } = Typography

const ProfilePopOver = ({ profileAddress }: { profileAddress: string }) => {
	return (
		<>
			<Button>Avatar</Button>
			<CreatorProfileAddress profileAddress={profileAddress} />

			<Popover>
				<Text>profileAddress</Text>
			</Popover>
		</>
	)
}

export default ProfilePopOver
