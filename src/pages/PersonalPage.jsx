import React from 'react';
import { useLoaderData, Link } from 'react-router-dom';
import axios from 'axios';

const PersonalPage = () => {
  const pers = useLoaderData()
  console.log(pers)
  return (
    <div>
      <h1 className='pers'>{pers.first_name} {pers.last_name}</h1>
      <Link to="/" >Retour aux personnes</Link>
    </div>
  )
}

export default     {
  path: "people/:id",
  loader: async ({ request, params }) => {
    // loaders can be async functions
    const people = await axios.get(`http://localhost:3000/people/${params.id}`).then(res => res.data);

    return people;
  },
  element: <PersonalPage />,
};