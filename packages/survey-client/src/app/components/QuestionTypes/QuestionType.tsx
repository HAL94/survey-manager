import { Box, Text } from '@chakra-ui/react';
import { QTypeDisplay } from 'app/utils';
import { GrAddCircle } from 'react-icons/gr';

interface Props {
  questionType: QTypeDisplay;
  onAddQuestion: (name: string) => void;
}
const QuestionType = ({ questionType, onAddQuestion }: Props) => {

  return (
    <Box className='hover:shadow-lg group transition-all duration-200 ease-in' cursor="pointer" width={"full"} display={"flex"} justifyContent="start" alignItems={"center"} px={4} py={3} mb={2}>
      <questionType.Icon size={24} />
      <Text marginLeft={10}>
        {questionType.title}
      </Text>
      <Box alignSelf={"flex-end"} flex="row" justifyContent={"center"} alignItems="center" ml="auto">
        <GrAddCircle onClick={() => onAddQuestion('NewField')} className='invisible group-hover:visible' color='#333' size={24} />
      </Box>
    </Box>
  )
}

export default QuestionType
