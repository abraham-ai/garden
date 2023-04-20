import useSWR from 'swr'
import type CollectionsResponse from '../interfaces/CollectionsResponse'
import type Collection from '../interfaces/Collection'

const fetcher = async (url: string): Promise<Collection[]> => {
	const response = await fetch(url, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
	})
	const data = await response.json()
	return data.result
}

export const useGetCollections = (): CollectionsResponse => {
	const { data, error } = useSWR<Collection[]>(`/api/collections/get`, fetcher)

	const isLoading = data == null && error !== false
	const collectionsData: Collection[] = data ?? []

	// console.log('USE GET-COLLECTIONS')
	// console.log(data)

	return {
		collections: collectionsData,
		error,
		isLoading,
		isValidating: !isLoading && error !== false,
	}
}

export default useGetCollections
