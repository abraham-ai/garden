import useSWR from 'swr';

interface ReactionsResponse {
  praises: number;
  burns: number;
  praised: boolean;
  burned: boolean;
}

// const fetcher = async (url: string, postData: any) => {
//   const response = await fetch(url, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(postData),
//   });
//   const data = await response.json();
//   return data;
// };

const fetcher = (url) => fetch(url).then((res) => res.json());

const useGetReactionCount = (creationId: string) => {
  console.log(creationId);
  //   const { data, error, isLoading, mutate } = useSWR<ReactionsResponse>(
  //     `/api/reactions/${creationId}`,
  //     (url: string, creationId: string) =>
  //       fetcher(url, {
  //         creationId: creationId,
  //       })
  //   );

  const { data, error, isLoading, mutate } = useSWR<ReactionsResponse>(
    `/api/reaction/${creationId}`,
    fetcher
  );

  console.log(data);

  //   return {
  //     praises: data?.praises || 0,
  //     burns: data?.burns || 0,
  //     praised: data?.praised || false,
  //     burned: data?.burned || false,
  //     isLoading,
  //     error,
  //     mutate,
  //   };

  return data;
};

export default useGetReactionCount;
