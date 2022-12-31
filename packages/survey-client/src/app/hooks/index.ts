import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
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
  const { isLoading, error, data, mutate, reset } = useMutation<
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
      }).then((res) => res.json())
  });
  return {
    mutate: mutate,
    reset,
    isLoading,
    error,
    data,
  };
};


export const useDeleteSurveyById = (id: number | string) => {
  const { isLoading, error, data, mutate, reset } = useMutation<
    Response<Survey>,
    any,
    any,
    Survey
  >({
    mutationKey: [`SurveyDeleteId-${id}`],
    mutationFn: () =>
      fetch(`${BASE_URI}/surveys/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      }).then((res) => res.json())
  });
  return {
    mutate: mutate,
    reset,
    isLoading,
    error,
    data,
  };
};

export const useAddSurvey = () => {
  // const client = useQueryClient();
  const navigate = useNavigate();
  const { isLoading, error, data, mutate, reset } = useMutation<
    Response<Survey>,
    any,
    any,
    Survey
  >({
    mutationKey: [`SurveyAdd`],
    mutationFn: (survey: Survey) =>
      fetch(`${BASE_URI}/surveys`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(survey),
      }).then((res) => res.json()),
      onSuccess: () => {
        // client.invalidateQueries(['surveys'])
        navigate('/');
      }
  });
  return {
    mutate: mutate,
    reset,
    isLoading,
    error,
    data,
  };
};
