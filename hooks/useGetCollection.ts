import useSWR from 'swr'
import type { SWRResponse, SWRConfiguration, KeyedMutator } from 'swr'
import type CollectionResponse from '../interfaces/CollectionResponse'

const fetcher = async (url: string): Promise<CollectionResponse | null> => {
	if (typeof url === 'undefined' || url === '') return null

	const response = await fetch(url, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
	})
	const data = await response.json()

	console.log({ data })
	return data
}

const useGetCollection = (
	collectionId: string
): SWRResponse<CollectionResponse | null, any> & {
	mutate: KeyedMutator<CollectionResponse | null>
} => {
	console.log('USE-GET-COLLECTION')

	const { data, error, mutate } = useSWR<CollectionResponse | null>(
		`/api/collection/${collectionId}`,
		fetcher,
		{
			revalidateOnFocus: false,
			revalidateOnReconnect: false,
		} as const
	)

	console.log({ data })

	const isLoading = data == null && error === false

	return {
		data,
		error,
		isLoading,
		mutate,
		isValidating: !isLoading && error === false,
	}
}

export default useGetCollection
