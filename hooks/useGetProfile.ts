import { useState, useEffect, useCallback } from 'react'
import type CreatorProfile from '../interfaces/CreatorProfile'

import axios from 'axios'

import emptyCreatorProfile from '../constants/emptyCreatorProfile'

const useGetProfile = (
	userId: string,
	refetchTrigger: number
): CreatorProfile => {
	const [creator, setCreator] = useState<CreatorProfile>(emptyCreatorProfile)

	const handleGetProfile = useCallback(async (userId: string) => {
		console.log(`useGetProfile: userId: ${userId}`)
		try {
			const response = await axios.post(`/api/profile/get`, {
				userId,
			})

			console.log(response.data.creatorProfile)

			setCreator(response.data.creatorProfile)
		} catch (error) {
			console.error('Error fetching creator:', error)
		}
	}, [])

	useEffect(() => {
		const fetchProfile = async (): Promise<void> => {
			try {
				await handleGetProfile(userId)
			} catch (error) {
				console.error('Error fetching creator:', error)
			}
		}

		if (typeof userId === 'string' && userId !== '') {
			void fetchProfile()
		}
	}, [userId, handleGetProfile, refetchTrigger])

	console.log({ userId })
	console.log({ creator })

	return typeof creator !== 'undefined' ? creator : emptyCreatorProfile
}

export default useGetProfile
