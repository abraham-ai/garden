import { Button, Popover, Typography } from 'antd'
const { Text } = Typography

import CreatorProfileAddress from './Creator/CreatorProfileAddress'

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
