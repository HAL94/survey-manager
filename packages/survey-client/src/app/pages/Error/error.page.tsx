import { useNavigate, useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const navigate = useNavigate();
  const error = useRouteError() as Partial<{
    statusText: string;
    message: string;
  }>;

  return (
    <>
      <div
        id="error-page"
        className="bg-red-500 text-white p-4 w-[500px] rounded my-3 mx-auto"
      >
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
      <button role="navigation" onClick={() => navigate('/')} className='flex justify-center items-center'>
        Get Back
      </button>
    </>
  );
}
