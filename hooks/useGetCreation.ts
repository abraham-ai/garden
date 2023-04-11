import { useState, useEffect, useCallback } from 'react'
import type { FC } from 'react'
import type Creation from '../interfaces/Creation'

import axios from 'axios'

interface GetCreationTypes {
	creationId: string
}

const useGetCreation: FC<GetCreationTypes> = (creationId) => {
	const [creation, setCreation] = useState<Creation | null>(null)

	const handleGetCreation = useCallback(async (creationId) => {
		console.log(`useGetCreation: creationId: ${String(creationId)}`)
		const response = await axios.post('/api/creation', {
			creationId,
		})

		// console.log(response.data);

		setCreation(response.data)
	}, [])

	useEffect(() => {
		if (typeof creationId !== 'undefined' && creationId !== null) {
			handleGetCreation(creationId)
		}
	}, [creationId, handleGetCreation])

	// console.log(creation);

	return typeof creation !== 'undefined' ? creation : null
}

export default useGetCreation
