import { useState, useCallback, useEffect, useContext, useMemo } from 'react'

import AppContext from '../../context/AppContext'

import { useAccount, useDisconnect, useNetwork, useSignMessage } from 'wagmi'

import { SiweMessage } from 'siwe'

import axios from 'axios'

import styles from '../../styles/EthereumAuth.module.css'

import { Button, Typography, Row } from 'antd'
const { Text } = Typography

interface EthereumAccountTypes {
	handleSiwe: (message: SiweMessage) => Promise<void>
	state: {
		address?: string
		error?: Error
		loading?: boolean
		authToken?: string
	}
}

const EthereumAccount: FC<EthereumAccountTypes> = ({ handleSiwe, state }) => {
	const context = useContext(AppContext)

	const isWalletConnected = context?.isWalletConnected || false

	const setIsWalletConnected = useMemo(() => {
		return context?.setIsWalletConnected || (() => {})
	}, [context?.setIsWalletConnected])

	const authToken = context?.authToken || ''

	const setAuthToken = useMemo(() => {
		return context?.setAuthToken || (() => {})
	}, [context?.setAuthToken])

	const userId = context?.userId || ''

	const setUserId = useMemo(() => {
		return context?.setUserId || (() => {})
	}, [context?.setUserId])

	const isSignedIn = context?.isSignedIn || false

	const setIsSignedIn = useMemo(() => {
		return context?.setIsSignedIn || (() => {})
	}, [context?.setIsSignedIn])

	const { disconnect } = useDisconnect()

	if (isWalletConnected) {
		return (
			<>
				<section className={styles.ethereumAuthWrapper}>
					{/* Account content goes here */}

					<Text
						level={2}
						style={{
							fontWeight: 'bold',
							fontSize: '1rem',
							marginBottom: 10,
							color: 'gray',
						}}
					>
						{'Settings'}
					</Text>

					<Row style={{ display: 'flex', marginBottom: 20 }}>
						{typeof userId === 'string' && isSignedIn ? (
							<div>
								<Button
									onClick={async () => {
										disconnect()
									}}
								>
									{'Disconnect Wallet'}
								</Button>
							</div>
						) : (
							<Button
								type='primary'
								shape='round'
								disabled={state.loading}
								onClick={handleSiwe}
							>
								{'Sign-In with Ethereum'}
							</Button>
						)}

						{typeof userId === 'string' && isSignedIn ? (
							<Button
								onClick={async () => {
									await fetch('/api/auth/logout')
									setAuthToken('')
									setIsSignedIn(false)
								}}
								style={{ marginLeft: 10 }}
							>
								{'Sign-out of Eden'}
							</Button>
						) : null}
					</Row>
				</section>
			</>
		)
	}

	return <div>{/* Connect wallet content goes here */}</div>
}

export default EthereumAccount
