import useSWR from 'swr';
import ReactionsResponse from '../interfaces/ReactionResponse';

const fetcher = async (url: string, postData: any) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(postData),
  });
  const data = await response.json();
  return data;
};

export const useReactions = (creationId: string) => {
  const { data, error, isLoading, mutate } = useSWR<ReactionsResponse>(
    `/api/reactions/${creationId}`,
    (url: string, creationId: string) =>
      fetcher(url, {
        creationId: creationId,
      })
  );

  return {
    praises: data?.praises || 0,
    burns: data?.burns || 0,
    praised: data?.praised || false,
    burned: data?.burned || false,
    isLoading,
    error,
    mutate,
  };
};

export default useReactions;
