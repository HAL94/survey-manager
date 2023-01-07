import QuestionTypeList from './QuestionTypeList';

import { Box, Spinner } from '@chakra-ui/react';
import { useAllQuestionTypes } from 'app/hooks';
interface Props {
  onAddQuestion: (name: string) => void;
}
const QuestionTypes = ({ onAddQuestion }: Props) => {
  const { isLoading, data } = useAllQuestionTypes();
  return (
    <Box border={1} width={'full'} shadow="lg">
      {isLoading && <Spinner />}
      {!isLoading && data && <QuestionTypeList onAddQuestion={onAddQuestion} questionTypes={data} />}
    </Box>
  );
};

export default QuestionTypes;
