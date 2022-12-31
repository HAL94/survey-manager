import React from 'react';

import { Box } from "@chakra-ui/react";
import { Await, useLoaderData } from "react-router-dom";
import { Response, Survey } from '../../utils';
import { SurveyUpdateForm } from '../../components';

export default function SurveyDetailPage() {
  const data = useLoaderData() as Response<Survey>;

  return (
    <Box display="flex" flexDir={"column"} marginX="auto" maxWidth={1280} borderWidth='1px' borderRadius='lg' overflow='hidden'>
      <React.Suspense
        fallback={<p>Loading..</p>}>
        <Await resolve={data.result}
          errorElement={
            <p>Error loading survey</p>
          }
        >
          {(result) => (
            <SurveyUpdateForm surveyData={result.result} />
          )}
        </Await>
      </React.Suspense>
    </Box>
  );
};
