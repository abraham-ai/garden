import { useState, useEffect, useCallback } from 'react'
import type CreatorProfile from '../interfaces/CreatorProfile'

import axios from 'axios'

const useGetCreator = (userId: string): CreatorProfile | null => {
	const [creator, setCreator] = useState<CreatorProfile | null>(null)

	const handleGetCreator = useCallback(async (userId: string) => {
		console.log(`useGetCreator: creatorId: ${userId}`)
		try {
			const response = await axios.post(`/api/creator/get`, {
				userId,
				username,
			})

			// console.log(response.data)

			setCreator(response.data)
		} catch (error) {
			console.error('Error fetching creator:', error)
		}
	}, [])

	useEffect(() => {
		const fetchCreator = async (): Promise<void> => {
			try {
				await handleGetCreator(userId)
			} catch (error) {
				console.error('Error fetching creator:', error)
			}
		}

		if (typeof userId !== 'undefined' && userId !== null && userId !== '') {
			void fetchCreator()
		}
	}, [creatorId, handleGetCreator])

	console.log({ userId })
	console.log({ creator })

	return typeof creator !== 'undefined' ? creator : null
}

export default useGetCreator
