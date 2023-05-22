import { useState, useEffect, useCallback } from 'react'
import type CreatorCreations from '../interfaces/CreatorCreations'
import emptyCreatorProfile from '../constants/emptyCreatorProfile'

import axios from 'axios'

const emptyCreatorCreations = {
	creations: [],
	creatorProfile: emptyCreatorProfile,
}

const useGetMyProfile = (userId: string): CreatorCreations => {
	const [myProfile, setMyProfile] = useState<CreatorCreations>(
		emptyCreatorCreations
	)

	const handleGetMyProfile = useCallback(async (userId: string) => {
		console.log(`useGetMyProfile: myProfile: ${userId}`)
		await axios
			.post('/api/myprofile')
			.then((response) => {
				console.log(response.data)
				setMyProfile(response.data) // Add creatorId and creatorUsername
			})
			.catch((error) => {
				console.error('Error fetching my creations:', error)
			})
	}, [])

	const isUserId =
		typeof userId !== 'undefined' && userId !== null && userId !== ''

	useEffect(() => {
		if (isUserId) {
			handleGetMyProfile(userId)
		}
	}, [userId, handleGetMyProfile])

	console.log({ myProfile })

	return typeof myProfile !== 'undefined' ? myProfile : emptyCreatorCreations
}

export default useGetMyProfile
