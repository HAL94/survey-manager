import { Box, Heading } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import QuestionDropdown from './QuestionDropdown';
import { Model } from 'survey-core';
import { getQuestionTypeByFieldName } from 'app/utils';
import './question.css';
import QuestionInformation from './QuestionInformation';

interface Props {
  fieldNames: string[];
  survey: Model;
}
const QuestionDetail = ({ fieldNames, survey }: Props) => {
  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [fieldsTitles, setFieldsTitles] = useState<string[]>();

  const type = getQuestionTypeByFieldName(survey, selectedField);
  useEffect(() => {
    if (survey) {
      survey.onAfterRenderQuestion.add((sender, options) => {
        const element = options.htmlElement as Element;
        element.classList.add('cursor-pointer');
        element.addEventListener('click', (e) => {
          const name = element.getAttribute('data-name');
          const allElements = document.querySelectorAll('[data-name]');
          allElements.forEach((ele) => {
            ele.classList.remove('active-question');
          });
          element.classList.add('active-question');
          setSelectedField(name);
        });
      });
    }
  }, [survey]);
  useEffect(() => {
    setFieldsTitles(survey.getAllQuestions().map((q) => q.title));
  }, [survey]);

  return (
    <Box
      boxShadow={'lg'}
      width="full"
      display="flex"
      flexDir={'column'}
      justifyContent="start"
      alignItems={'center'}
    >
      <Box
        borderWidth={1}
        p={2}
        borderTop={'none'}
        borderLeft={'none'}
        borderRight={'none'}
        borderColor="gray.200"
        w="full"
      >
        {type ? (
          <Heading size={'sm'} className="uppercase" p={2}>
            {type}
          </Heading>
        ) : (
          <Heading size={'sm'} className="uppercase" p={2}>
            {'Select a Question'}
          </Heading>
        )}
      </Box>
      <QuestionDropdown
        onSelect={setSelectedField}
        titles={fieldsTitles}
        fieldNames={fieldNames}
      />
      {selectedField !== '' && selectedField && (
        <QuestionInformation
          questionType={type}
          currentField={selectedField}
          survey={survey}
        />
      )}
    </Box>
  );
};

export default QuestionDetail;
