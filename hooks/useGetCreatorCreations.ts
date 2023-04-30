import { useState, useEffect, useCallback } from 'react'
import type Creator from '../interfaces/Creator'

import axios from 'axios'

const useGetCreatorCreations = (creatorId: string): Creator | null => {
	const [creatorCreations, setCreatorCreations] = useState<Creator | null>(null)

	const handleGetCreatorCreations = useCallback(async (creatorId: string) => {
		console.log(`useGetCreatorCreations: creatorId: ${creatorId}`)
		try {
			const response = await axios.post(`/api/creator/${creatorId}`, {
				creatorId,
			})

			console.log(response)

			setCreatorCreations(response.data)
		} catch (error) {
			console.error('Error fetching creator creations:', error)
		}
	}, [])

	useEffect(() => {
		const fetchCreatorCreations = async (): Promise<void> => {
			try {
				await handleGetCreatorCreations(creatorId)
			} catch (error) {
				console.error('Error fetching creator creations:', error)
			}
		}

		if (
			typeof creatorId !== 'undefined' &&
			creatorId !== null &&
			creatorId !== ''
		) {
			void fetchCreatorCreations()
		}
	}, [creatorId, handleGetCreatorCreations])

	console.log({ creatorId })
	console.log({ creatorCreations })

	return typeof creatorCreations !== 'undefined' ? creatorCreations : null
}

export default useGetCreatorCreations
