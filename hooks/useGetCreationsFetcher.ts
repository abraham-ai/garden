const useGetCreationsFetcher = async (url: string) => {
	const res = await fetch(url)
	const data = await res.json()
	return data
}

export default useGetCreationsFetcher
