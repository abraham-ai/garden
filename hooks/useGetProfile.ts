import { useState, useEffect, useCallback } from 'react'
import type CreatorProfile from '../interfaces/CreatorProfile'

import axios from 'axios'

const emptyCreatorProfile: CreatorProfile = {
	creatorProfile: {
		user: {
			username: '',
			userId: '',
			_id: '',
		},
	},
}

const useGetProfile = (creatorId: string): CreatorProfile => {
	const [creator, setCreator] = useState<CreatorProfile>(emptyCreatorProfile)

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

	return typeof creator !== 'undefined' ? creator : emptyCreatorProfile
}

export default useGetProfile
