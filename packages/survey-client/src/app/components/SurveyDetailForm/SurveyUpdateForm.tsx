import { Survey } from '../../utils';
import React, { useState } from 'react';
import { useUpdateSurveyById } from '../../hooks';
import SurveyDetailForm from './SurveyDetailForm';

interface Props {
  surveyData: Survey;
}
const SurveyUpdateForm: React.FC<Props> = ({ surveyData }) => {
  const { isLoading, data, mutate, reset } = useUpdateSurveyById(surveyData.id);
  const [survey, setSurvey] = useState<Survey>({ ...surveyData });

  const onChangeHandler = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setSurvey({
      ...survey,
      [name]: value,
    });
  };

  const onSubmitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const formData = e.target as typeof e.target & {
      title: { value: string };
      description: { value: string };
    };
    const updatedSurvey = {
      ...surveyData,
      title: formData.title.value,
      description: formData.description.value,
    };

    mutate(updatedSurvey);
  };

  return (
    <SurveyDetailForm
      isLoading={isLoading}
      data={data}
      reset={reset}
      onChange={onChangeHandler}
      onSubmit={onSubmitHandler}
      surveyData={survey}
      submitText='Update'
    />
  );
};

export default SurveyUpdateForm;
