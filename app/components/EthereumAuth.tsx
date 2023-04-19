'use client'

import React, { useState, useEffect, useContext, useMemo } from 'react'
import type { FC, MouseEvent } from 'react'
import AppContext from '../../context/AppContext'
import { useAccount, useNetwork, useSignMessage } from 'wagmi'
import { SiweMessage } from 'siwe'
import axios from 'axios'

import EthereumAccount from './EthereumAccount'

const EthereumAuth: FC = () => {
	const context = useContext(AppContext)

	const isWalletConnected = context?.isWalletConnected ?? false

	const setIsWalletConnected = useMemo(() => {
		return context?.setIsWalletConnected != null
			? context.setIsWalletConnected
			: () => {}
	}, [context?.setIsWalletConnected])

	const setAuthToken = useMemo(() => {
		return context?.setAuthToken != null ? context?.setAuthToken : () => {}
	}, [context?.setAuthToken])

	const setUserId = useMemo(() => {
		return context?.setUserId != null ? context?.setUserId : () => {}
	}, [context?.setUserId])

	const setIsSignedIn = useMemo(() => {
		return context?.setIsSignedIn != null ? context?.setIsSignedIn : () => {}
	}, [context?.setIsSignedIn])

	const [state, setState] = useState<{
		address?: string
		error?: Error
		loading?: boolean
		authToken?: string
	}>({})

	const { address, isConnected } = useAccount()
	const { chain } = useNetwork()

	const { signMessage } = useSignMessage({
		onSuccess: async (data, variables) => {
			// console.log({ address })
			try {
				console.log('TEST TEST TEST')
				console.info('/api/login !')
				console.info({
					message: variables.message,
					signature: data,
					userAddress: address,
				})
				const resp = await axios.post('/api/auth/verify', {
					message: variables.message,
					signature: data,
					userAddress: address,
				})
				console.info(resp.data)
				const { token } = resp.data
				if (typeof token === 'string') {
					console.info('got token', token)
					setIsSignedIn(true)
					setAuthToken(token)
					setIsSignedIn(true)
				}
			} catch (error: unknown) {
				console.info('error!', error)
				// setEthMessage('Error authenticating')
			}
		},
	})

	const handleSiwe = async (event: MouseEvent): Promise<void> => {
		if (!isConnected) {
			await Promise.resolve()
			return
		}

		try {
			const nonceRes = await fetch('/api/auth/nonce')
			const message = new SiweMessage({
				domain: window.location.host,
				address,
				statement: 'Sign in with Ethereum to the app.',
				uri: window.location.origin,
				version: '1',
				chainId: chain?.id,
				nonce: await nonceRes.text(),
			})
			// console.log(message)
			const preparedMessage = message.prepareMessage()
			console.info('sign message 1')
			try {
				await signMessage({
					message: preparedMessage,
				})
			} catch (error) {
				console.error('Error signing message:', error)
			}
			console.info('sign message 2')
		} catch (error: unknown) {
			console.log(error)
			// setEthMessage('Error authenticating')
		}
	}

	// Fetch user when:
	useEffect(() => {
		if (!isWalletConnected && isConnected) {
			setIsWalletConnected(true)
			setUserId(typeof address === 'string' ? `${String(address)}` : '')
		}

		const handler = async (): Promise<void> => {
			try {
				const res = await fetch('/api/auth/me')
				const json = await res.json()

				const { token, userId } = json

				console.log('EthereumAuth.tsx')
				console.log({ token, userId })

				if (typeof token !== 'undefined' && typeof userId !== 'undefined') {
					setIsSignedIn(true)
					setAuthToken(token)
					setUserId(`${String(userId)}`)
				}
			} catch (_error) {}
		}
		// 1. page loads
		handler()
			.then(() => {
				console.log('Handler function completed successfully')
			})
			.catch((error) => {
				console.error('An error occurred in the handler function:', error)
			})

		// 2. window is focused (in case user logs out of another window)
		const handleFocus = (): void => {
			handler()
				.then(() => {
					console.log('Handler function completed successfully')
				})
				.catch((error) => {
					console.error('An error occurred in the handler function:', error)
				})
		}

		window.addEventListener('focus', handleFocus)
		return () => {
			window.removeEventListener('focus', handleFocus)
		}
	}, [
		isWalletConnected,
		setIsWalletConnected,
		isConnected,
		address,
		setAuthToken,
		setUserId,
		setIsSignedIn,
	])

	return <EthereumAccount state={state} handleSiwe={handleSiwe} />
}

export default EthereumAuth
