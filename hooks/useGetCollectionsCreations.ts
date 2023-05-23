import type CollectionsCreations from '../interfaces/CollectionsCreations'
import { useState, useEffect } from 'react'
import axios from 'axios'

const emptyCollectionsCreations = {
	collections: [],
	collectionsCreations: [],
}

const fetcher = async (url: string): Promise<CollectionsCreations> => {
	const response = await fetch(url, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
	})
	const data = await response.json()
	return data
}

export const useGetCollectionsCreations = (
	refetchTrigger: number
): {
	collectionsCreationsData: CollectionsCreations
	isLoading: boolean
	error: any
} => {
	const [collectionsCreationsData, setCollectionsCreationsData] =
		useState<CollectionsCreations>(emptyCollectionsCreations)
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState(null)

	const fetchData = async (): Promise<void> => {
		setIsLoading(true)
		try {
			const response = await axios.post('/api/collections/getwithcreations')
			setCollectionsCreationsData(response.data)
		} catch (err) {
			setError(err)
		} finally {
			setIsLoading(false)
		}
	}

	console.log({ refetchTrigger })

	useEffect(() => {
		fetchData().catch((err) => {
			console.error(err)
		})
	}, [refetchTrigger])

	return { collectionsCreationsData, isLoading, error }
}

export default useGetCollectionsCreations
