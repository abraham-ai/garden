import type { FC } from 'react'

import React from 'react'
import EthereumAuth from '../../Ethereum/EthereumAuth'

import styles from '../../../../styles/Header.module.css'

import { Typography, Col, Divider, Button } from 'antd'
const { Text } = Typography

interface MannaMenuPopOverTypes {
	isWalletConnected: boolean
	userId: string
	displayAddress: string
	isSignedIn: boolean
	authToken: string
	displayAuthToken: string
	appWidth: number
}

const MannaMenuPopOver: FC<MannaMenuPopOverTypes> = ({
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
	const mannaCount = 99
	return (
		<Col>
			<Col>
				<Text>{`You have ${mannaCount} Manna`}</Text>
				<Text>{'Learn how you can earn Manna.'}</Text>
			</Col>

			<Divider />

			<Col>
				<Text>{'Buy Manna'}</Text>
				<Button type='text'>{'1,000 Manna for 0.01 ETH'}</Button>
				<Button type='text'>{'10,000 Manna for 0.1 ETH'}</Button>
				<Button type='text'>{'100,000 Manna for 1.0 ETH'}</Button>
			</Col>

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

export default MannaMenuPopOver
