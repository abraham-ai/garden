import { useState, useEffect, useCallback } from 'react'
import type Creator from '../interfaces/Creator'

import axios from 'axios'

const useGetCreator = (creatorId: string): Creator | null => {
	const [creator, setCreator] = useState<Creator | null>(null)

	const handleGetCreator = useCallback(async (creatorId: string) => {
		console.log(`useGetCreator: creatorId: ${creatorId}`)
		try {
			const response = await axios.post(`/api/creator/${creatorId}`, {
				creatorId,
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
				await handleGetCreator(creatorId)
			} catch (error) {
				console.error('Error fetching creator:', error)
			}
		}

		if (
			typeof creatorId !== 'undefined' &&
			creatorId !== null &&
			creatorId !== ''
		) {
			void fetchCreator()
		}
	}, [creatorId, handleGetCreator])

	console.log({ creatorId })
	console.log({ creator })

	return typeof creator !== 'undefined' ? creator : null
}

export default useGetCreator
