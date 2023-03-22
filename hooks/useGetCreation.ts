import useSWR from 'swr';
import CreationResponse from '../interfaces/CreationResponse';

const fetcher = async (url: string, postData: any) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(postData),
  });
  const data = await response.json();
  return data;
};

export const useCollections = () => {
  const { data, error, isLoading, mutate } = useSWR<CreationResponse>(
    `/api/creation`,
    (url: string) => fetcher(url)
  );

  //   console.log(data);

  return {
    creationData: data,
  };
};

export default useCollections;
