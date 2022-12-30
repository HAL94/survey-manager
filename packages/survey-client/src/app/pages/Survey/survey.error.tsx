import { useRouteError } from "react-router-dom";

export default function SurveyPageError() {
  const error = useRouteError() as Partial<{
    error: string;
    message: string;
  }>;
  return (
    <div role='alert'>
      <span>Something went wrong with the survey page:</span>
      <div>{error.message}</div>
    </div>
  )
}
