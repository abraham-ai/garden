import type CreationCreator from '../interfaces/CreationCreator'
import type Creation from '../interfaces/Creation'
import type CreatorProfile from '../interfaces/CreatorProfile'

import emptyCreatorProfile from '../constants/emptyCreatorProfile'
import emptyCreation from '../constants/emptyCreation'

import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'

const useGetCreation = (creationId: string): CreationCreator => {
	const [creation, setCreation] = useState<Creation>(emptyCreation)
	const [creatorProfile, setCreatorProfile] =
		useState<CreatorProfile>(emptyCreatorProfile)

	const isCreationId =
		typeof creationId !== 'undefined' &&
		creationId !== null &&
		creationId !== ''

	const handleGetCreation = useCallback(async (creationId) => {
		console.log(`useGetCreation: creationId: ${String(creationId)}`)
		const response = await axios.post('/api/creation', {
			creationId,
		})

		const { creation, creatorProfile } = response.data
		console.log(response.data)

		console.log('useGetCreation: response.data:')

		setCreation(creation)
		setCreatorProfile(creatorProfile)
	}, [])

	useEffect(() => {
		if (isCreationId) {
			handleGetCreation(creationId).catch((error) => {
				console.error('Error fetching creation:', error)
			})
		}
	}, [creationId, handleGetCreation])

	// console.log(creation);

	const isCreationCreator =
		typeof creation !== 'undefined' && typeof creation !== 'undefined'
	console.log({ isCreationCreator })

	return isCreationCreator
		? { creation, creatorProfile }
		: { creation: emptyCreation, creatorProfile: emptyCreatorProfile }
}

export default useGetCreation
