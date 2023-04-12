'use client'

import { useState, useEffect, useContext, useMemo } from 'react'
import AppContext from '../../context/AppContext'
import { useAccount, useNetwork, useSignMessage } from 'wagmi'
import axios from 'axios'

const EthereumVerify = () => {
	const context = useContext(AppContext)

	const isWalletConnected = context?.isWalletConnected || false

	const setIsWalletConnected = useMemo(() => {
		return context?.setIsWalletConnected != null || (() => {})
	}, [context?.setIsWalletConnected])

	const setAuthToken = useMemo(() => {
		return context?.setAuthToken != null || (() => {})
	}, [context?.setAuthToken])

	const setUserId = useMemo(() => {
		return context?.setUserId != null || (() => {})
	}, [context?.setUserId])

	const setIsSignedIn = useMemo(() => {
		return context?.setIsSignedIn != null || (() => {})
	}, [context?.setIsSignedIn])

	const { address, isConnected } = useAccount()

	// Fetch user when:
	useEffect(() => {
		if (isWalletConnected && isConnected) {
			setIsWalletConnected(true)
			setUserId(typeof address === 'string' ? `${String(address)}` : '')
		}

		const handler = async () => {
			try {
				const res = await fetch('/api/auth/me')
				const json = await res.json()

				const { token, userId } = json

				if (typeof token !== 'undefined' && typeof userId !== 'undefined') {
					setIsSignedIn(true)
					setAuthToken(token)
					setUserId(`${String(userId)}`)
				}
			} catch (_error) {}
		}
		// 1. page loads
		handler()

		// 2. window is focused (in case user logs out of another window)
		window.addEventListener('focus', handler)
		return () => {
			window.removeEventListener('focus', handler)
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
}

export default EthereumVerify
