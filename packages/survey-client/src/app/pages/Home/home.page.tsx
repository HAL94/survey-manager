import { Container } from '../../layouts';
import { useLoaderData } from 'react-router-dom';
import { Response, Survey } from '../../utils';
import { SurveyCard, SurveyAddFormDialog } from '../../components';

const Home = () => {
  const data = useLoaderData() as Response<Survey[]>;

  return (
    <Container>
      <SurveyAddFormDialog />

      {data.result.map((survey) => {
        return (
          <SurveyCard
            id={survey.id}
            title={survey.title}
            description={survey.description}
            key={`survey-${survey.id}`}
          />
        );
      })}

    </Container>
  );
};

export default Home;
