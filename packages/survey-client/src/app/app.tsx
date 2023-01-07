// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RootLayout } from './layouts';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Home, ErrorPage, SurveyPage, SurveyQuestionsPage, SurveyPageError, SurveyDetailPage } from './pages';
import { ChakraProvider } from '@chakra-ui/react'

import {
  allSurveysLoader,
  surveyDetailLoader,
} from './utils';

const queryClient = new QueryClient();

const AppContent = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '/',
          element: <Home/>,
          loader: allSurveysLoader(queryClient),
        },
        {
          path: 'survey/:surveyId',
          element: <SurveyPage />,
          errorElement: <SurveyPageError />,
          children: [
            {
              path: '',
              loader: surveyDetailLoader(queryClient),
              element: <SurveyDetailPage />
            },
            {
              path: 'questions',
              element: <SurveyQuestionsPage />,
              errorElement: <ErrorPage />
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};
export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <AppContent />
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
