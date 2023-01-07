import { Box } from '@chakra-ui/react';
import { Survey } from 'survey-react-ui';
import { Model } from 'survey-core';

interface Props {
  survey: Model
}
const Questions = ({ survey }: Props) => {
  return (
    <Box border={1} width={'full'}>
      <Survey model={survey} />
    </Box>
  );
};

export default Questions;
