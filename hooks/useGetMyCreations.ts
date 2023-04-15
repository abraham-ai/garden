import { useState, useEffect, useCallback } from 'react'
import type Creator from '../interfaces/Creator'
import type Creations from '../interfaces/Creations'

import axios from 'axios'

const useGetMyCreations = (userId: string): Creations | null => {
	const [myCreations, setMyCreations] = useState<Creations | null>(null)

	const handleGetMyCreations = useCallback(async (userId: string) => {
		console.log(`useGetMyCreations: myCreations: ${userId}`)
		await axios
			.post('/api/mycreations')
			.then((response) => {
				console.log(response.data)
				setMyCreations({ creations: response.data })
			})
			.catch((error) => {
				console.error('Error fetching my creations:', error)
			})
	}, [])

	useEffect(() => {
		if (typeof userId !== 'undefined' && userId !== null && userId !== '') {
			handleGetMyCreations(userId)
		}
	}, [userId, handleGetMyCreations])

	console.log({ myCreations })

	return typeof myCreations !== 'undefined' ? myCreations : null
}

export default useGetMyCreations
