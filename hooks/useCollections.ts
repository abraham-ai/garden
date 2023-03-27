import useSWR from 'swr';
import CollectionsResponse from '../interfaces/CollectionsResponse';

const fetcher = async (url: string, postData?: any) => {
  if (!postData) {
    throw new Error("An argument for 'postData' was not provided.");
  }
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(postData),
  });
  const data = await response.json();
  return data;
};

export const useCollections = () => {
  const { data, error, isLoading, mutate } = useSWR<CollectionsResponse>(
    `/api/collections`,
    (url: string) => fetcher(url)
  );

  //   console.log(data);

  return {
    collectionsData: data,
  };
};

export default useCollections;
