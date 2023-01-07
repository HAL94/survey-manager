import React from 'react';
import { Input } from '@chakra-ui/react';
import QuestionBase from '../QuestionBase/QuestionBase';
interface Props {
  title: string;

  name: string;
  onChange: (e: React.ChangeEvent<any>) => void;
  disabled?: boolean;
}
const QuestionTextField = ({
  title,
  name,
  onChange,
  disabled,
}: Props) => {
  return (
    <QuestionBase title={title}>
      <Input
        disabled={disabled}
        type="text"
        name={name}
        className="py-[12px] px-[16px]"
        backgroundColor="#f9f9f9"
        boxShadow={"inset 0px 1px 2px rgba(0,0,0,.15)"}
        borderColor={'gray.300'}
        borderRadius="3px"
        lineHeight={"24px"}
        height={12}
        onChange={onChange}
      />
    </QuestionBase>
  );
};

export default QuestionTextField;
