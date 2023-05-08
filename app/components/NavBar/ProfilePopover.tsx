import type { FC } from 'react'
import React from 'react'
import { Button, Popover, Typography } from 'antd'

import CreatorProfileAddress from '../Creator/CreatorProfileAddress'
const { Text } = Typography

interface ProfilePopOverProps {
	profileAddress: string
}

const ProfilePopOver: FC<ProfilePopOverProps> = ({ profileAddress }) => {
	return (
		<>
			<Button>{'Avatar'}</Button>
			<CreatorProfileAddress profileAddress={profileAddress} />

			<Popover>
				<Text>{'Profile Address'}</Text>
			</Popover>
		</>
	)
}

export default ProfilePopOver
