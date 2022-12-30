import { Box, Spinner } from "@chakra-ui/react";
import { useFetcher } from "react-router-dom";
import { Survey } from "../../utils";

interface Props {
  surveyData: Survey
}

const SurveyDetailForm: React.FC<Props> = ({ surveyData }) => {
  const fetcher = useFetcher();
  // console.log('surveyData', surveyData);
  return (
    <Box p={4} justifyContent="center" alignItems={"center"} width="full">
      {fetcher.state === 'submitting' && <Box width={"full"} marginTop="16" display="flex" justifyContent={"center"} alignItems="center"><Spinner alignSelf={"center"} marginX="auto" width={50} height={50} color="purple" size='lg' /></Box>}
      {fetcher.state === 'idle' && <fetcher.Form method='post' action={`/survey/${surveyData.id}`} className="flex justify-center items-center flex-col mx-auto p-4">
        <div className="flex flex-col my-3 w-full">
          <label htmlFor="title">Title</label>
          <input defaultValue={surveyData.title} type="text" name="title" className="border rounded p-3" required />
        </div>
        <div className="flex flex-col my-3 w-full">
          <label htmlFor="description">Description</label>
          <textarea defaultValue={surveyData.description} rows={10} cols={20} name="description" className="border rounded p-3" required />
        </div>
        <button type="submit" className="p-2 bg-purple-700 text-white rounded hover:bg-purple-500 transition-300 duration-200">Submit</button>
      </fetcher.Form>}
    </Box>
  );
};

export default SurveyDetailForm;
