// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RootLayout } from './layouts';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Home, ErrorPage, SurveyPage, SurveyQuestionsPage, SurveyPageError, SurveyDetailPage } from './pages';


import {
  allSurveysLoader,
  surveyDetailLoader,
  surveyUpdate,
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
          action: surveyUpdate,
          errorElement: <SurveyPageError />,
          children: [
            {
              path: '',
              loader: surveyDetailLoader(queryClient),
              element: <SurveyDetailPage />,
            },
            {
              path: 'questions',
              element: <SurveyQuestionsPage />,
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
      <AppContent />
    </QueryClientProvider>
  );
}

export default App;
