import useSWR from 'swr'
import type CollectionsResponse from '../interfaces/CollectionsResponse'
import type Collection from '../interfaces/Collection'

const fetcher = async (url: string): Promise<void> => {
	const response = await fetch(url, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
	})
	const data = await response.json()
	return data
}

export const useGetCollections = (): CollectionResponse => {
	const { data, error } = useSWR<CollectionsResponse>(
		`/api/collections/get`,
		fetcher
	)

	const isLoading = data == null && error !== false
	const collectionsData = (data?.result != null || null) as Collection[] | null

	// console.log('USE GET-COLLECTIONS')
	// console.log(data)

	return {
		collectionsData,
		error,
		isLoading,
	}
}

export default useGetCollections
