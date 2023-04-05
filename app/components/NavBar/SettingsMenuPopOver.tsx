import React from 'react'
import EthereumAuth from '../EthereumAuth'

import styles from '../../../styles/Header.module.css'

import { Typography } from 'antd'
const { Paragraph } = Typography

const SettingsMenuPopOver = ({ 
	isWalletConnected,
	userId,
	displayAddress,
	isSignedIn,
	authToken
}: { userId: string, displayAddress: string, isSignIn: boolean, authToken: string }): JSX.Element => {
	return (
		<>
			{isWalletConnected === true ? <EthereumAuth /> : null }
	
			{ isWalletConnected === true && typeof userId !== 'undefined'
			? (
				<Paragraph>
					<strong>{'Logged-In as: '}</strong> {displayAddress}
				</Paragraph>
				)
			: (
				<Paragraph>
					<strong>{'Logged-In as: '}</strong>
					{'Not logged in'}
				</Paragraph>
				)
			}
	
			<div className={styles.signedInStyle}>
				{ isSignedIn === true
				? (
					<Paragraph>
					<strong>{'Signed-In as: '}</strong> {displayAddress}
					</Paragraph>
					)
				: ( 
					<Paragraph>
						<strong>{'Signed-In as: '}</strong>
						{'Not Signed-In'}
					</Paragraph>
					)
				}
			</div>
	
			<div className={styles.authStyle}>
			{ typeof authToken === 'undefined' && isSignedIn === true
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
