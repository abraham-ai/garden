import { useState, useEffect } from 'react'
import type CollectionResponse from '../interfaces/CollectionResponse'

const useGetCollection = (
	collectionId: string | null
): CollectionResponse | null => {
	const [collectionData, setCollectionData] =
		useState<CollectionResponse | null>(null)

	const isCollectionId = typeof collectionId === 'string'

	useEffect(() => {
		if (collectionId === null) return
		if (isCollectionId) {
			const fetchData = async () => {
				// Call your API fetch logic here
				// For example:
				const response = await fetch(`/api/collection/${collectionId}`)
				const data = await response.json()
				setCollectionData(data)
			}
			fetchData()
		}
	}, [collectionId, isCollectionId])

	return collectionData
}

export default useGetCollection
