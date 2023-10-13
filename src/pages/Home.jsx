import { Link, useLoaderData } from 'react-router-dom';
import IdCard from '../components/IdCard';

const Home = () => {
  const people = useLoaderData();

  return (
    <div>
      <h1>React Router Test</h1>
      <Link to="/?gender=Male">With Gender</Link>
      <Link to="/">Without</Link>
      <div className='container'>
        {people.map(pers => <IdCard person={pers} key={pers.id} />)}
      </div>
    </div>
  )
}

export default Home