import { useState, useEffect, useCallback } from 'react'
import type Creation from '../interfaces/Creation'

import axios from 'axios'

const useGetCreation = (creationId: string): Creation | null => {
	const [creation, setCreation] = useState<Creation | null>(null)

	const handleGetCreation = useCallback(async (creationId) => {
		console.log(`useGetCreation: creationId: ${String(creationId)}`)
		const response = await axios.post('/api/creation', {
			creationId,
		})

		// console.log(response.data);
		console.log('useGetCreation: response.data:')
		console.log(response)
		setCreation(response.data)
	}, [])

	useEffect(() => {
		if (typeof creationId !== 'undefined' && creationId !== null) {
			handleGetCreation(creationId).catch((error) => {
				console.error('Error fetching creation:', error)
			})
		}
	}, [creationId, handleGetCreation])

	// console.log(creation);

	return typeof creation !== 'undefined' ? creation : null
}

export default useGetCreation
