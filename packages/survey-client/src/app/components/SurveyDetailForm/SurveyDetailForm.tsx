import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  CloseButton,
  Spinner,
} from '@chakra-ui/react';
import React from 'react';
import { Response, Survey } from '../../utils';

interface Props {
  surveyData: Survey;
  isLoading: boolean;
  data: Response<Survey> | undefined;
  reset: () => void;
  onChange: (e: React.ChangeEvent<any>) => void;
  onSubmit: (e: React.SyntheticEvent) => void;
  submitText: string;
}

const SurveyDetailForm: React.FC<Props> = ({
  isLoading,
  data,
  reset,
  onSubmit,
  onChange,
  surveyData,
  submitText,
}) => {
  return (
    <Box p={4} justifyContent="center" alignItems={'center'} width="full">
      {isLoading && (
        <Box
          width={'full'}
          marginTop="16"
          display="flex"
          justifyContent={'center'}
          alignItems="center"
        >
          <Spinner
            alignSelf={'center'}
            marginX="auto"
            width={50}
            height={50}
            color="purple"
            size="lg"
          />
        </Box>
      )}
      {data && data.success && (
        <Alert
          marginX={'auto'}
          paddingY={20}
          paddingX={7}
          borderRadius={7}
          variant="subtle"
          flexDirection={'row'}
          display="flex"
          justifyContent={'start'}
          alignItems="center"
          status="success"
          bgColor="#0c4e2c"
          textColor="white"
          width={'auto'}
          height={70}
        >
          <AlertIcon
            height={20}
            fontSize={15}
            bgSize={'contain'}
            marginRight={20}
          />
          <Box display={'flex'} flexDirection={'column'}>
            <AlertTitle marginRight={20}>Success</AlertTitle>
            <AlertDescription fontSize={12}>
              {'Successfully performed operation'}
            </AlertDescription>
          </Box>
          <CloseButton
            onClick={() => reset()}
            marginLeft={'auto'}
            height={40}
            alignSelf={'center'}
          />
        </Alert>
      )}
      {data && !data.success && (
        <Alert
          marginX={'auto'}
          paddingY={20}
          paddingX={7}
          borderRadius={7}
          variant="subtle"
          flexDirection={'row'}
          display="flex"
          justifyContent={'start'}
          alignItems="center"
          status="error"
          bgColor="#aa0018"
          textColor="white"
          width={500}
          height={70}
        >
          <AlertIcon
            height={20}
            fontSize={15}
            bgSize={'contain'}
            marginRight={20}
          />
          <Box display={'flex'} flexDirection={'column'}>
            <AlertTitle marginRight={20}>Something went wrong</AlertTitle>
            <AlertDescription fontSize={12}>
              {'Failed to perform operation'}
            </AlertDescription>
          </Box>
          <CloseButton
            onClick={() => reset()}
            marginLeft={'auto'}
            height={40}
            alignSelf={'center'}
          />
        </Alert>
      )}
      {!isLoading && (
        <form
          onSubmit={onSubmit}
          className="flex justify-center items-center flex-col mx-auto p-4"
        >
          <div className="flex flex-col my-3 w-full">
            <label htmlFor="title">Title</label>
            <input
              value={surveyData?.title}
              onChange={onChange}
              type="text"
              name="title"
              className="border rounded p-3"
              required
            />
          </div>
          <div className="flex flex-col my-3 w-full">
            <label htmlFor="description">Description</label>
            <textarea
              value={surveyData?.description}
              onChange={onChange}
              rows={10}
              cols={20}
              name="description"
              className="border rounded p-3"
              required
            />
          </div>
          <button
            type="submit"
            className="p-2 bg-purple-700 text-white rounded hover:bg-purple-500 transition-300 duration-200"
          >
            {submitText}
          </button>
        </form>
      )}
    </Box>
  );
};

export default SurveyDetailForm;
