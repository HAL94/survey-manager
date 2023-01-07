import { VStack } from '@chakra-ui/react';
import React from 'react';
import { Model, QuestionBooleanModel } from 'survey-core';
import QuestionExplain from '../QuestionFields/QuestionExplain/QuestionExplain';
import QuestionTextField from '../QuestionFields/QuestionText/QuestionTextField';

interface Props {
  survey: Model;
  currentField: string;
  questionType: string | null;
}
const QuestionInformation = ({ survey, currentField, questionType }: Props) => {
  return (
    <VStack>
      <QuestionTextField
        onChange={(e: React.ChangeEvent<any>) => {
          const q = survey.getQuestionByName(currentField);
          q.title = e.target.value;
        }}
        disabled={false}
        name={currentField}
        title={'Enter your question'}
      />
      <QuestionExplain
        explanation="Explain your question if needed"
        onChange={(e: React.ChangeEvent<any>) => {
          const q = survey.getQuestionByName(currentField);
          q.description = e.target.value;
        }}
      />

      {questionType && questionType === 'boolean' && (
        <VStack>
          <QuestionTextField
            title="First Answer"
            name="yes"
            disabled={false}
            onChange={(e) => {
              const q = survey.getQuestionByName(currentField) as QuestionBooleanModel;
              console.log(q.valueTrue);
              q.labelTrue = e.target.value;
            }}
          />
          <QuestionTextField
            title="Second Answer"
            name="no"
            disabled={false}
            onChange={(e) => {
              const q = survey.getQuestionByName(currentField) as QuestionBooleanModel;
              console.log(q.valueTrue);
              q.labelFalse = e.target.value;
            }}
          />
        </VStack>
      )}
    </VStack>
  );
};

export default QuestionInformation;
