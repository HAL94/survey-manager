import { BiDotsVerticalRounded } from 'react-icons/bi';
import { Container } from '../../layouts';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { Response, Survey } from '../../utils';


const Home = () => {
  const data = useLoaderData() as Response<Survey[]>;
  const navigate = useNavigate();

  return (
    <Container>
      {data.result.map((survey) => {
        return (
          <div
            className="border my-2 p-4 bg-white shadow-md cursor-pointer flex flex-row w-full justify-between"
            onClick={() => navigate(`survey/${survey.id}`)}
            key={survey.id}
          >
            <div className="flex flex-col justify-center items-start">
              <h1 className="text-xl">{survey.title}</h1>
              <span>{survey.description}</span>
            </div>
            <BiDotsVerticalRounded size={25} />
          </div>
        );
      })}
    </Container>
  );
};

export default Home;

