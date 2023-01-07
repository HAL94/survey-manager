import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URI, QType, QTypeDisplay, QTYPES_ICONS, Response, Survey } from '../utils';

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
      }).then((res) => res.json()),
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
        },
      }).then((res) => res.json()),
  });
  return {
    mutate: mutate,
    reset,
    isLoading,
    error,
    data,
  };
};

export const useAddSurvey = ({
  onSuccessFn,
}: {
  onSuccessFn?: () => Promise<void> | void;
}) => {
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
    onSuccess: async () => {
      if (onSuccessFn) {
        await onSuccessFn();
      }
      // client.invalidateQueries(['surveys'])
      navigate('/');
    },
  });
  return {
    mutate: mutate,
    reset,
    isLoading,
    error,
    data,
  };
};

export const useAllQuestionTypes = () => {
  const [types, setTypes] = useState<QTypeDisplay[]>([]);

  const { isLoading, error } = useQuery<any, unknown, Response<QType[]>>({
    queryKey: ['AllQuestionTypes'],
    queryFn: () =>
      fetch(`${BASE_URI}/types`, {
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => res.json()),
    onSuccess: (data) => {
      if (data.success) {
        setTypes(data.result.map((type: QType) => {
          return {
            ...type,
            Icon: QTYPES_ICONS[type.type]
          } as QTypeDisplay;
        }))
      }
    }
  });

  return {
    isLoading,
    data: types,
    error,
  };
};
