// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RootLayout } from './layouts';
import { Home, ErrorPage } from './pages';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import SurveyDetail, {
  surveyDetailLoader,
} from './components/SurveyDetail/SurveyDetail';

import { allSurveysLoader } from './pages/Home/home.page';


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
          element: <Home />,
          loader: allSurveysLoader(queryClient),
        },
        {
          path: 'survey/:surveyId',
          loader: surveyDetailLoader(queryClient),
          element: <SurveyDetail />,
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
