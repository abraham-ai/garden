import { useState, useEffect, useCallback } from 'react'
import type CreatorCreations from '../interfaces/CreatorCreations'
import type Creations from '../interfaces/Creations'

import axios from 'axios'

const emptyCreatorCreations = {
	creations: [],
	creatorId: '',
	creatorUsername: '',
}

const useGetMyCreations = (userId: string): CreatorCreations => {
	const [myCreations, setMyCreations] = useState<CreatorCreations>(
		emptyCreatorCreations
	)

	const handleGetMyCreations = useCallback(async (userId: string) => {
		console.log(`useGetMyCreations: myCreations: ${userId}`)
		await axios
			.post('/api/mycreations')
			.then((response) => {
				console.log(response.data)
				setMyCreations({
					creations: response.data,
					creatorId: userId,
					creatorUsername: '',
				}) // Add creatorId and creatorUsername
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

	return typeof myCreations !== 'undefined'
		? myCreations
		: emptyCreatorCreations
}

export default useGetMyCreations
