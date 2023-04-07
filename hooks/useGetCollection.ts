import useSWR, { SWRResponse, SWRConfiguration } from 'swr'
import type CollectionResponse from '../interfaces/CollectionResponse'

const fetcher = async (url: string): Promise<CollectionResponse> => {
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
): SWRResponse<CollectionResponse, any> & {
	mutate: (
		data?:
			| CollectionResponse
			| Promise<CollectionResponse>
			| ((data: CollectionResponse) => CollectionResponse),
		shouldRevalidate?: boolean
	) => Promise<CollectionResponse | undefined>
} => {
	console.log('USE-GET-COLLECTION')

	const { data, error, mutate } = useSWR<CollectionResponse>(
		`/api/collection/${collectionId}`,
		(url: string) => {
			if (typeof collectionId !== 'undefined' && collectionId !== null) {
				return fetcher(url)
			} else {
				return null
			}
		},
		{
			revalidateOnFocus: false,
			revalidateOnReconnect: false,
		} as SWRConfiguration<CollectionResponse, any>
	)

	console.log({ data })

	let isLoading = !data && !error

	return { data, error, isLoading, mutate }
}

export default useGetCollection
