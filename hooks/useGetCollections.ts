import type CollectionsResponse from '../interfaces/CollectionsResponse'
import type Collection from '../interfaces/Collection'

import useSWR from 'swr'
import { useCallback } from 'react'

const fetcher = async (url: string): Promise<Collection[]> => {
	const response = await fetch(url, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
	})
	const data = await response.json()
	return data.result
}

const useGetCollections = (
	isSignedIn,
	userId,
	authToken,
	isWalletConnected
): CollectionsResponse => {
	console.log({ isSignedIn, userId, authToken, isWalletConnected })

	const getKey = useCallback(() => {
		if (isSignedIn && isWalletConnected) {
			return `/api/collections/get`
		}
		return null
	}, [])

	const { data, error } = useSWR<Collection[]>(getKey, fetcher)

	const isLoading = data == null && error !== false
	const collectionsData: Collection[] = data ?? []

	return {
		collections: collectionsData,
		error,
		isLoading,
		isValidating: !isLoading && error !== false,
	}
}

export default useGetCollections
