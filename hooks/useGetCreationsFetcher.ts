import type Creation from '../interfaces/Creation'

const useGetCreationsFetcher = async (url: string): Creation[] => {
	console.log({ url })
	const res = await fetch(url)

	const data = await res.json()
	console.log({ data })

	return data
}

export default useGetCreationsFetcher
