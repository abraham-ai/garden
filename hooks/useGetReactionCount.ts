import useSWR from 'swr'

interface ReactionsResponse {
	praises: number
	burns: number
	praised: boolean
	burned: boolean
}

const fetcher = async (url: string): Promise<ReactionsResponse> =>
	await fetch(url).then(async (res) => await res.json())

const useGetReactionCount = (
	creationId: string
): ReactionsResponse | undefined => {
	const isCreationId = creationId !== ''

	console.log({ isCreationId })
	console.log({ creationId })

	const { data } = useSWR<ReactionsResponse>(
		isCreationId ? `/api/reaction/${creationId}` : null,
		fetcher,
		{ revalidateOnFocus: false, revalidateOnReconnect: false }
	)

	return data
}

export default useGetReactionCount
