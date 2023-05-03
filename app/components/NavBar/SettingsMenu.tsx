import type { FC } from 'react'
import React from 'react'
import SettingsMenuPopOver from './SettingsMenuPopOver'

import abbreviateText from '../../../util/abbreviateText'

import { Button, Badge, Popover, Tooltip, Typography } from 'antd'
import { BsGear } from 'react-icons/bs'
const { Text } = Typography

interface SettingsMenuProps {
	appWidth: number
	isWalletConnected: boolean
	userId: string
	displayAddress: string
	isSignedIn: boolean
	authToken: string
	isMounted: boolean
}

const SettingsMenu: FC<SettingsMenuProps> = ({
	appWidth,
	isWalletConnected,
	userId,
	displayAddress,
	isSignedIn,
	authToken,
	isMounted,
}) => {
	const isMobile = appWidth <= 768

	let displayAuthToken = ''
	if (typeof authToken === 'string') {
		displayAuthToken = abbreviateText(authToken, 80)
	}

	const handleBadgeCount = (): number => {
		if (isWalletConnected && !isSignedIn) {
			return 1
		} else if (isWalletConnected && isSignedIn) {
			return 0
		} else {
			return 0
		}
	}

	return (
		<span
			style={{
				display: `${isMobile && isMounted ? 'none' : 'flex'}`,
				alignItems: 'center',
			}}
		>
			<Popover
				content={
					<SettingsMenuPopOver
						isWalletConnected={isWalletConnected}
						userId={userId}
						displayAddress={displayAddress}
						isSignedIn={isSignedIn}
						authToken={authToken}
						displayAuthToken={displayAuthToken}
						isMobile={isMobile}
					/>
				}
				trigger='click'
				placement='bottom'
			>
				<Tooltip placement='bottom' title={<Text>{'Settings'}</Text>}>
					<Button type='link' shape='circle' style={{ marginRight: 10 }}>
						<Badge count={handleBadgeCount()}>
							<BsGear style={{ fontSize: '1.5rem' }} />
						</Badge>
					</Button>
				</Tooltip>
			</Popover>
		</span>
	)
}

export default SettingsMenu
