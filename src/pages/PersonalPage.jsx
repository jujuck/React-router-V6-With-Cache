import React from 'react';
import { useLoaderData, Link } from 'react-router-dom';

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

export default PersonalPage