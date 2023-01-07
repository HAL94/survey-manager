import { Survey } from '../../utils';
import React, { useState } from 'react';
import { useUpdateSurveyById } from '../../hooks';
import SurveyDetailForm from './SurveyDetailForm';
import { Container, Heading, useToast } from '@chakra-ui/react';
interface Props {
  surveyData: Survey;
}
const SurveyUpdateForm: React.FC<Props> = ({ surveyData }) => {
  const { isLoading, data, mutate, reset } = useUpdateSurveyById(surveyData.id);
  const [survey, setSurvey] = useState<Survey>({ ...surveyData });
  const toast = useToast();

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

    if (
      formData.title.value === surveyData.title &&
      formData.description.value === surveyData.description
    ) {
      toast({
        title: 'No changes',
        description: "All your input is saved",
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    const updatedSurvey = {
      ...surveyData,
      title: formData.title.value,
      description: formData.description.value,
    };

    mutate(updatedSurvey);
  };

  return (
    <Container minW={'full'} p={10}>
      <Heading size="md">Update Survey Information</Heading>
      <SurveyDetailForm
        isLoading={isLoading}
        data={data}
        reset={reset}
        onChange={onChangeHandler}
        onSubmit={onSubmitHandler}
        surveyData={survey}
        submitText="Update"
      />
    </Container>
  );
};

export default SurveyUpdateForm;
