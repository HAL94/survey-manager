import { Box, Select } from '@chakra-ui/react';
import React from 'react';
interface Props {
  fieldNames: string[];
  titles: string[] | undefined;
  onSelect: (value: string | null) => void;
}
const QuestionDropdown = ({ fieldNames, onSelect, titles }: Props) => {
  return (
    <Box w="full" p={4}>
      <Select
        placeholder="Select Question"
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          console.log(e.target.value);
          if (e.target.value === '') {
            onSelect(null);
          } else {
            onSelect(e.target.value);
          }
        }}
      >
        {fieldNames.map((value, index) => (
          <option value={value} key={`${value}-${index}`}>{titles && titles[index]}</option>
        ))}
      </Select>
    </Box>
  );
};

export default QuestionDropdown;
