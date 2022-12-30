import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { BASE_URI, Response, Survey } from '../utils';

export const useFetchSurveys = () => {
  const { isLoading, error, data } = useQuery<any, unknown, Response<Survey[]>>(
    {
      queryKey: ['surveys'],
      queryFn: () => fetch(`${BASE_URI}/surveys`).then((res) => res.json()),
    }
  );

  return {
    isLoading,
    error,
    data,
  };
};

export const useFetchSurveyById = (id: number | string) => {
  const { isLoading, error, data } = useQuery<any, unknown, Response<Survey>>({
    queryKey: [`surveyById-${id}`],
    queryFn: () => fetch(`${BASE_URI}/surveys/${id}`).then((res) => res.json()),
  });

  return {
    isLoading,
    error,
    data,
  };
};

export const useUpdateSurveyById = (id: number | string) => {
  const queryClient = useQueryClient();
  const { isLoading, error, data, mutate } = useMutation<
    Response<Survey>,
    any,
    any,
    Survey
  >({
    mutationKey: [`SurveyUpdateId-${id}`],
    mutationFn: (survey: Survey) =>
      fetch(`${BASE_URI}/surveys/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(survey),
      }).then((res) => res.json()),
    onSuccess: async () => {
      const cache = queryClient.getQueryCache();
      await queryClient.invalidateQueries({
        queryKey: [`Survey ${id}`],
      })
      console.log('cache', cache)
    },
  });
  return {
    mutate: mutate,
    isLoading,
    error,
    data,
  };
};
