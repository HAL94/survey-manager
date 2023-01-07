import 'survey-core/defaultV2.min.css';
import { QuestionTypes, QuestionDetail, Questions } from 'app/components';
// import { useParams } from 'react-router-dom';
import { StylesManager, Model } from 'survey-core';

import { Container, Grid, GridItem } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { mapJsonFormToNames } from 'app/utils';
StylesManager.applyTheme('defaultV2');

export default function SurveyQuestionsPage() {
  // const params = useParams();
  const [jsonForm, setJsonForm] = useState<any>({
    elements: [
      {
        name: 'FirstName',
        title: 'Enter your first name:',
        type: 'text',
      },
      {
        name: 'LastName',
        title: 'Enter your last name:',
        type: 'text',
      },
      {
        type: 'boolean',
        name: 'slider',
        title: 'Are you 21 or older?',
        description: 'Display mode = Default',
        valueTrue: 'Yes',
        valueFalse: 'No',
      },
      {
        type: 'radiogroup',
        name: 'car',
        title: 'Which is the brand of your car?',
        isRequired: true,
        showNoneItem: true,
        showOtherItem: true,
        colCount: 1,
        choices: [
          'Ford',
          'Vauxhall',
          'Volkswagen',
          'Nissan',
          'Audi',
          'Mercedes-Benz',
          'BMW',
          'Peugeot',
          'Toyota',
        ],
        separateSpecialChoices: true,
        showClearButton: true,
      },
    ],
  });
  const [fieldNames, setFieldNames] = useState<string[]>([]);
  const [survey, setSurvey] = useState<Model>(new Model());

  useEffect(() => {
    if (survey && jsonForm && jsonForm.elements) {
      survey.fromJSON(jsonForm);
      // survey.mode = 'display';
      setSurvey(survey);
      const names = mapJsonFormToNames(jsonForm);
      setFieldNames(names);
    }
  }, [jsonForm, setFieldNames, survey]);

  const addNewQuestionHandler = (name: string) => {
    setJsonForm((prev: any) => ({
      elements: [
        ...prev.elements,
        {
          name: name,
          title: 'Heres a Question',
          type: 'text',
        },
      ],
    }));
  };


  return (
    <Container marginTop={10} minW="full" border={1} p={0}>
      <Grid templateColumns="repeat(5, 1fr)" gap={12}>
        <GridItem w="100%" colSpan={1}>
          <QuestionTypes onAddQuestion={addNewQuestionHandler} />
        </GridItem>
        <GridItem w="100%" shadow="lg" backgroundColor="#f3f3f3" colSpan={3}>
          <Questions survey={survey} />
        </GridItem>
        <GridItem w="100%" colSpan={1}>
          <QuestionDetail
            survey={survey}
            fieldNames={fieldNames} />
        </GridItem>
      </Grid>
    </Container>
  );
}
