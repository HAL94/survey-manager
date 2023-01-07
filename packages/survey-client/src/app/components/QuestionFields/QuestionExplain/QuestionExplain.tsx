import { Input } from '@chakra-ui/react';
import React from 'react'
import QuestionBase from '../QuestionBase/QuestionBase';
interface Props {
  explanation: string;
  onChange: (e: React.ChangeEvent<any>) => void;
}
const QuestionExplain = ({ explanation, onChange }: Props) => {
  return (
    <QuestionBase title={explanation}>
      <Input name={'explanation'}
        type="text"
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
  )
}

export default QuestionExplain
