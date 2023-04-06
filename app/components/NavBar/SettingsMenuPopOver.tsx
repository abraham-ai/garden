import React from 'react'
import EthereumAuth from '../EthereumAuth'

import styles from '../../../styles/Header.module.css'

import { Typography } from 'antd'
const { Text } = Typography

const SettingsMenuPopOver = ({
	isWalletConnected,
	userId,
	displayAddress,
	isSignedIn,
	authToken,
	displayAuthToken
}: { userId: string, displayAddress: string, isSignIn: boolean, authToken: string, displayAuthToken: string }): JSX.Element => {
	// console.log({ authToken })
	return (
		<>
			{ isWalletConnected === true ? <EthereumAuth /> : null }
	
			{ isWalletConnected === true && typeof userId !== 'undefined'
			? (
				<Text>
					<strong>{'Logged-In as: '}</strong> {displayAddress}
				</Text>
				)
			: (
				<Text>
					<strong>{'Logged-In as: '}</strong>
					{'Not logged in'}
				</Text>
				)
			}
	
			<div className={styles.signedInStyle}>
				{ isSignedIn === true
				? (
					<Text>
					<strong>{'Signed-In as: '}</strong> {displayAddress}
					</Text>
					)
				: (
					<Text>
						<strong>{'Signed-In as: '}</strong>
						{'Not Signed-In'}
					</Text>
					)
				}
			</div>
	
			<div className={styles.authStyle}>
			{ typeof authToken !== 'undefined' && isSignedIn === true
				? (
				<span className={styles.tokenWrapperStyle}>
					<strong>{'AuthToken: '}</strong>
					<span className={styles.authToken}>{displayAuthToken}</span>
				</span>
				)
				: (
				<span>
					<strong>{'AuthToken: '}</strong>
					{'No AuthToken'}
				</span>
				)
			}
			</div>
		</>
	)
}

export default SettingsMenuPopOver
