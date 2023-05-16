const useGetCreationsFetcher = async (url: string) => {
	console.log({ url })
	const res = await fetch(url)

	const data = await res.json()
	console.log({ data })

	return data
}

export default useGetCreationsFetcher
