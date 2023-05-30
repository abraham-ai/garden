import type { FC } from 'react'

import React from 'react'
import EthereumAuth from '../../Ethereum/EthereumAuth'
import ThemeSelect from './ThemeSelect'

import styles from '../../../../styles/SettingsPopover.module.css'

import { Typography, Col } from 'antd'
const { Text } = Typography

interface SettingsMenuPopOverTypes {
	isWalletConnected: boolean
	userId: string
	displayAddress: string
	isSignedIn: boolean
	authToken: string
	displayAuthToken: string
	appWidth: number
}

const SettingsMenuPopOver: FC<SettingsMenuPopOverTypes> = ({
	isWalletConnected,
	userId,
	displayAddress,
	isSignedIn,
	authToken,
	displayAuthToken,
	appWidth,
}) => {
	console.log({
		userId,
		displayAddress,
		authToken,
		isSignedIn,
		displayAuthToken,
		isWalletConnected,
	})

	return (
		<Col className={styles.settingsPopOver}>
			<ThemeSelect />

			{isWalletConnected ? <EthereumAuth appWidth={appWidth} /> : null}

			{isWalletConnected && typeof userId !== 'undefined' ? (
				<Text>
					<strong>{'Logged-In as: '}</strong> {displayAddress}
				</Text>
			) : (
				<Text>
					<strong>{'Logged-In as: '}</strong>
					{'Not logged in'}
				</Text>
			)}

			<div className={styles.signedInStyle}>
				{isSignedIn && typeof userId !== 'undefined' ? (
					<Text>
						<strong>{'Signed-In as: '}</strong> {userId}
					</Text>
				) : (
					<Text>
						<strong>{'Signed-In as: '}</strong>
						{'Not Signed-In'}
					</Text>
				)}
			</div>

			<div className={styles.authStyle}>
				{typeof authToken !== 'undefined' && isSignedIn ? (
					<span className={styles.tokenWrapperStyle}>
						<strong>{'AuthToken: '}</strong>
						<span className={styles.authToken}>{displayAuthToken}</span>
					</span>
				) : (
					<span>
						<strong>{'AuthToken: '}</strong>
						{'No AuthToken'}
					</span>
				)}
			</div>
		</Col>
	)
}

export default SettingsMenuPopOver
