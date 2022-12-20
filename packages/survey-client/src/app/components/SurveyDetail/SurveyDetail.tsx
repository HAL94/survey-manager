import { Params, useLoaderData } from 'react-router-dom';

import { BASE_URI, Response, Survey } from '../../utils';
import { QueryClient } from '@tanstack/react-query';

export const surveyDetailLoader = (queryClient: QueryClient) => async ({ params }: { params: Params}) => {
  return await queryClient.fetchQuery<any, unknown, Response<Survey>>({
    queryKey: ['Survey', params.surveyId],
    queryFn: () => fetch(`${BASE_URI}/surveys/${params.surveyId}`).then((res) => res.json())
  })
}

const SurveyDetail = () => {
  const data = useLoaderData();
  console.log(data);
  return <div>{JSON.stringify(data)}</div>;
};

export default SurveyDetail;
