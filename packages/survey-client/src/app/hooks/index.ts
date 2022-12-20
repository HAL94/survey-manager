import { useQuery } from '@tanstack/react-query';
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
