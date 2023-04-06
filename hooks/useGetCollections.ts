import useSWR from 'swr'
import CollectionsResponse from '../interfaces/CollectionsResponse'

const fetcher = async (url: string) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  })
  const data = await response.json()
  return data
}

export const useGetCollections = (): JSX.Element => {
  const { data, error, isLoading, mutate } = useSWR<CollectionsResponse>(
    `/api/collections/get`,
    (url: string) => fetcher(url)
  )

  let collectionsData
  if (typeof data !== 'undefined' && data !== null) {
    collectionsData = data.result
  }
  
  // console.log('USE GET-COLLECTIONS')
  // console.log(data)

  return collectionsData
}

export default useGetCollections
