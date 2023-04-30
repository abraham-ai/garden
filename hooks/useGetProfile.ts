import { useState, useEffect, useCallback } from 'react'
import type Creator from '../interfaces/Creator'

import axios from 'axios'

const useGetProfile = (creatorId: string): Creator | null => {
	const [creator, setCreator] = useState<Creator | null>(null)

	const handleGetProfile = useCallback(async (creatorId: string) => {
		console.log(`useGetProfile: creatorId: ${creatorId}`)
		try {
			const response = await axios.post(`/api/profile/get`, {
				creatorId,
			})

			console.log(response.data)

			setCreator(response.data)
		} catch (error) {
			console.error('Error fetching creator:', error)
		}
	}, [])

	useEffect(() => {
		const fetchProfile = async (): Promise<void> => {
			try {
				await handleGetProfile(creatorId)
			} catch (error) {
				console.error('Error fetching creator:', error)
			}
		}

		if (
			typeof creatorId !== 'undefined' &&
			creatorId !== null &&
			creatorId !== ''
		) {
			void fetchProfile()
		}
	}, [creatorId, handleGetProfile])

	console.log({ creatorId })
	console.log({ creator })

	return typeof creator !== 'undefined' ? creator : null
}

export default useGetProfile
