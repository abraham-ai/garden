'use client'

import { useEffect, useContext, useMemo } from 'react'
import AppContext from '../../../context/AppContext'
import { useAccount } from 'wagmi'

const EthereumVerify = (): JSX.Element | null => {
	const context = useContext(AppContext)

	const isWalletConnected = context?.isWalletConnected ?? false

	const setIsWalletConnected = useMemo(
		() => context?.setIsWalletConnected ?? (() => {}),
		[context?.setIsWalletConnected]
	)

	const setAuthToken = useMemo(
		() => context?.setAuthToken ?? (() => {}),
		[context?.setAuthToken]
	)

	const setUserId = useMemo(
		() => context?.setUserId ?? (() => {}),
		[context?.setUserId]
	)

	const setUserAddress = useMemo(
		() => context?.setUserAddress ?? (() => {}),
		[context?.setUserAddress]
	)

	const setIsSignedIn = useMemo(
		() => context?.setIsSignedIn ?? (() => {}),
		[context?.setIsSignedIn]
	)

	const { address, isConnected } = useAccount()

	// Fetch user when:
	useEffect(() => {
		if (isWalletConnected && isConnected) {
			setIsWalletConnected(true)
			setUserAddress(typeof address === 'string' ? `${String(address)}` : '')
			// setUserId(typeof address === 'string' ? `${String(address)}` : '')
		}

		const handler = async (): Promise<void> => {
			try {
				const res = await fetch('/api/auth/me')
				const json = await res.json()

				const { token, userProfile } = json

				// console.log('EthereumVerify.tsx')
				// console.log(json)
				// console.log(res)
				// console.log({ token, userId })

				if (
					typeof token !== 'undefined' &&
					typeof userProfile !== 'undefined'
				) {
					setIsSignedIn(true)
					setAuthToken(token)
					setUserAddress(`${String(userProfile.user.userId)}`)
				}
			} catch (_error) {}
		}

		// 2. window is focused (in case user logs out of another window)
		const handleFocus = (): void => {
			handler().catch((error) => {
				console.error('Error in handleFocus:', error)
			})
		}

		// 1. page loads
		handleFocus()

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

	return null
}

export default EthereumVerify
