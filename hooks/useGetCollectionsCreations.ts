import useSWR from 'swr'
import type CollectionsCreations from '../interfaces/CollectionsCreations'

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

export const useGetCollectionsCreations = (): {
	collectionsCreationsData: CollectionsCreations | null
	isLoading: boolean
	error: any
	isValidating: boolean
} => {
	const { data, error } = useSWR<CollectionsCreations>(
		`/api/collections/getwithcreations`,
		fetcher
	)

	const isLoading = data == null && error !== false
	const collectionsCreationsData: CollectionsCreations =
		data ?? emptyCollectionsCreations

	// console.log('USE GET-COLLECTIONS')
	// console.log(data)

	return {
		collectionsCreationsData,
		error,
		isLoading,
		isValidating: !isLoading && error !== false,
	}
}

export default useGetCollectionsCreations
