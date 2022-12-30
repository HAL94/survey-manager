import { useLocation, useNavigate, useParams } from 'react-router-dom';
import './SurveyNavigation.css';

const SurveyNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();

  return (
    <div className="container mx-auto w-full p-5 pb-0 shadow-md my-4 flex items-center justify-start">
      <button
        role="tab"
        aria-selected="true"
        id="tab-id"
        aria-controls="tabpanel-id"
        className={`${location.pathname === `/survey/${params.surveyId}` ? 'active' : ''}`}
        onClick={() => navigate(`/survey/${params.surveyId}`)}
      >
        Info
      </button>
      <button
        role="tab"
        aria-selected="true"
        id="tab-id"
        aria-controls="tabpanel-id"
        className={`${location.pathname === `/survey/${params.surveyId}/questions` ? 'active' : ''}`}
        onClick={() => navigate(`questions`)}
      >
        Questions
      </button>
    </div>
  );
};

export default SurveyNavigation;
