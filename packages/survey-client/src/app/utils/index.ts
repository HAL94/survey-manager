import { QueryClient } from '@tanstack/react-query';
import { AiOutlineCheckCircle, AiOutlineMail } from 'react-icons/ai';
import { BsToggleOn } from 'react-icons/bs';
import { HiOutlineMenuAlt2, HiOutlineMinusSm } from 'react-icons/hi';
import { IconType } from 'react-icons/lib';
import { defer, Params } from 'react-router-dom';
import { Model } from 'survey-core';

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

export interface QType {
  title: string;
  type: string;
  id: string;
}
export type QTypeDisplay = QType & {
  Icon: IconType;
};
export const QTYPES_ICONS: {
  [key: string]: IconType;
} = {
  TEXT: HiOutlineMinusSm,
  COMMENT: HiOutlineMenuAlt2,
  RADIO: AiOutlineCheckCircle,
  BOOLEAN: BsToggleOn,
  TEXT_EMAIL: AiOutlineMail,
};

export const allSurveysLoader = (queryClient: QueryClient) => async () => {
  return await queryClient.fetchQuery<any, unknown, Response<Survey[]>>({
    queryKey: ['AllSurvey'],
    queryFn: () => fetch(`${BASE_URI}/surveys`).then((res) => res.json()),
  });
};

export const surveyDetailLoader =
  (queryClient: QueryClient) =>
  async ({ params }: { params: Params }) => {
    const result = queryClient.fetchQuery<any, unknown, Response<Survey>>({
      queryKey: ['Survey', params.surveyId],
      queryFn: () =>
        fetch(`${BASE_URI}/surveys/${params.surveyId}`)
          .then((res) => res.json())
          .finally(() => console.log('fetched')),
    });

    return defer({ result });
  };

export const surveyUpdate = async ({
  params,
  request,
}: {
  params: Params;
  request: Request;
}) => {
  const data = await request.formData();
  const response = await fetch(`${BASE_URI}/surveys/${params.surveyId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: data.get('title'),
      description: data.get('description'),
    }),
  });
  const result = await response.json();
  return result;
};

export const checkIfNameExistInSurveyJson = (surveyJson: any, name: string) => {
  const found = surveyJson.elements.find((element: any) => {
    return element.name === name;
  });
  return !!found;
};

export const mapJsonFormToNames = (surveyJson: any) => {
  return surveyJson.elements.map((element: any) => element.name) as string[];
}



export const getQuestionTypeByFieldName = (survey: Model, fieldName: string | null | undefined) => {

  if (fieldName !== null && fieldName !== undefined) {
    const q = survey.getQuestionByName(fieldName);
    return q.getType();
  }
  return null;
};
