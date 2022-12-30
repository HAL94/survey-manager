import { QueryClient } from "@tanstack/react-query";
import { defer, Params } from "react-router-dom";

export const BASE_URI = 'http://localhost:5000/api/v1';
export interface Survey {
  id: number;
  title: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface Response<T = unknown> {
  success: boolean;
  result: T;
  message?: string;
  error?: string;
}


export const allSurveysLoader = (queryClient: QueryClient) => async () => {
  return await queryClient.fetchQuery<any, unknown, Response<Survey[]>>({
    queryKey: ['AllSurvey'],
    queryFn: () => fetch(`${BASE_URI}/surveys`).then((res) => res.json())
  })
}

export const surveyDetailLoader =
  (queryClient: QueryClient) =>
  async ({ params }: { params: Params }) => {
    const result = queryClient.fetchQuery<any, unknown, Response<Survey>>(
      {
        queryKey: ['Survey', params.surveyId],
        queryFn: () =>
          fetch(`${BASE_URI}/surveys/${params.surveyId}`).then((res) =>
            res.json()
          ).finally(() => console.log('fetched')),
      }
    );

    return defer({ result });
  };

export const surveyUpdate = async ({ params, request }: { params: Params, request: Request }) => {
  const data = await request.formData();
  return fetch(`${BASE_URI}/surveys/${params.surveyId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: data.get('title'),
      description: data.get('description')
    })
  }).then(res => res.json());
}
