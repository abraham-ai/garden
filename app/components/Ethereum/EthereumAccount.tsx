import type { FC, MouseEvent } from 'react'

import React, { useEffect, useContext, useMemo } from 'react'
import AppContext from '../../../context/AppContext'

import { useDisconnect } from 'wagmi'

import styles from '../../../styles/EthereumAuth.module.css'

import { Button, Row } from 'antd'

interface EthereumAccountProps {
	handleSiwe: (event: MouseEvent) => Promise<void>
	state: {
		address?: string
		error?: Error
		loading?: boolean
		authToken?: string
	}
	isMobile: boolean
}

const EthereumAccount: FC<EthereumAccountProps> = ({
	handleSiwe,
	state,
	isMobile,
}) => {
	const context = useContext(AppContext)

	const isWalletConnected = context?.isWalletConnected ?? false
	const setIsSignInModalOpen = context?.setIsSignInModalOpen ?? (() => {})

	const setAuthToken = useMemo(() => {
		return context?.setAuthToken != null ? context.setAuthToken : () => {}
	}, [context?.setAuthToken])

	const userId = context?.userId ?? ''

	const isSignedIn = context?.isSignedIn ?? false

	const setIsSignedIn = useMemo(() => {
		return context?.setIsSignedIn != null ? context.setIsSignedIn : () => {}
	}, [context?.setIsSignedIn])

	const { disconnect } = useDisconnect()

	const handleDisconnect = (): void => {
		const disconnectResult = disconnect()

		if (typeof disconnectResult !== 'undefined') {
			console.log('disconnectResult', disconnectResult)
		}
	}

	const handleSignIn = (e: MouseEvent): void => {
		handleSiwe(e)
			.then((handleSiweResult) => {
				if (typeof handleSiweResult !== 'undefined') {
					console.log('handleSiweResult', handleSiweResult)
				}
			})
			.catch((error) => {
				console.error(error)
			})
	}

	useEffect(() => {
		if (isSignedIn) {
			setIsSignInModalOpen(false)
		}
	}, [isSignedIn])

	if (isWalletConnected) {
		return (
			<>
				<section className={styles.ethereumAuthWrapper}>
					{/* <Text
						style={{
							fontWeight: 'bold',
							fontSize: '1rem',
							marginBottom: 10,
							color: 'gray',
							textAlign: 'center',
						}}
					>
						{'Auth Settings'}
					</Text> */}

					<Row
						style={{
							display: 'flex',
							marginBottom: 20,
							justifyContent: isMobile ? 'center' : 'center',
						}}
					>
						{typeof userId === 'string' && isSignedIn ? (
							<div>
								<Button
									size='large'
									shape='round'
									onClick={() => {
										handleDisconnect()
									}}
								>
									{'Disconnect Wallet'}
								</Button>
							</div>
						) : (
							<Button
								type='primary'
								shape='round'
								size='large'
								disabled={state.loading}
								onClick={(e) => {
									handleSignIn(e)
								}}
							>
								{'Sign-In with Ethereum'}
							</Button>
						)}

						{typeof userId === 'string' && isSignedIn ? (
							<Button
								size='large'
								shape='round'
								onClick={() => {
									fetch('/api/auth/logout')
										.then((response) => {
											if (!response.ok) {
												throw new Error('Logout failed')
											}
											setAuthToken('')
											setIsSignedIn(false)
										})
										.catch((error) => {
											console.error(error)
										})
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
