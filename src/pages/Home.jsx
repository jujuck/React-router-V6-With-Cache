import { Link, useLoaderData } from 'react-router-dom';
import axios from 'axios';
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

export default     {
  path: "people",
  loader: async ({ request }) => {
    console.log("loader People from Home")
    const query = new URL(request.url).search;

    // loaders can be async functions
    const people = await axios.get(`http://localhost:3000/people${query}`).then(res => res.data);
    console.log(people)
    return people;
  },
  element: (
    <Home />
  )
}