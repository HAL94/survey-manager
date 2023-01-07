import { Survey } from '../../utils';
import React, { useState } from 'react';
import { useAddSurvey } from '../../hooks';
import SurveyDetailForm from './SurveyDetailForm';

const SurveyAddForm = () => {
  const { isLoading, data, mutate, reset } = useAddSurvey({ onSuccessFn: onSuccessAdd });
  const [survey, setSurvey] = useState<Omit<Survey, 'id'>>({
    title: '',
    description: '',
  });

  async function onSuccessAdd() {
    setSurvey((prev) => ({
      ...prev,
      title: '',
      description: '',
    }));
  }

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
    const survey = {
      title: formData.title.value,
      description: formData.description.value,
    };

    mutate(survey);
  };
  return (
    <SurveyDetailForm
      isLoading={isLoading}
      data={data}
      reset={reset}
      onChange={onChangeHandler}
      onSubmit={onSubmitHandler}
      surveyData={survey}
      submitText={'Add'}
    />
  );
};

export default SurveyAddForm;
