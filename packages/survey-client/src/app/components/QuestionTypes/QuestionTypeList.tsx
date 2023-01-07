import { VStack } from '@chakra-ui/react';
import QuestionType from './QuestionType';
import { QTypeDisplay } from 'app/utils';

interface Props {
  questionTypes: QTypeDisplay[];
  onAddQuestion: (name: string) => void;
}
const QuestionTypeList = ({ questionTypes, onAddQuestion }: Props) => {
  return (
    <VStack display={'flex'} justifyContent="space-between" alignItems={'center'}>
      {questionTypes.map((type) => (
        <QuestionType onAddQuestion={onAddQuestion} questionType={type as QTypeDisplay} key={type.id} />
      ))}
    </VStack>
  );
};

export default QuestionTypeList;
