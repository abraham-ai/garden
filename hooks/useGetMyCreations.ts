import { useState, useEffect, useCallback } from 'react'
import type Creator from '../interfaces/Creator'

import axios from 'axios'

const useGetMyCreations = (userId: string) => {
	const [myCreations, setMyCreations] = useState<Creator | null>(null)

	const handleGetMyCreations = useCallback(async (userId: string) => {
		console.log(`useGetMyCreations: myCreations: ${userId}`)
		const response = await axios.post('/api/mycreations')

		console.log(response.data)

		setMyCreations(response.data)
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
