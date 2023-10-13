import React from 'react'
import { Link } from 'react-router-dom'

const IdCard = ({ person }) => {
  return (
    <div className='card'>
      <h2>{person.first_name}</h2>
      <h2>{person.last_name}</h2>
      <h2>{person.gender}</h2>
      <h2>{person.city}</h2>
      <h2>{person.job_title}</h2>
      <Link to={`/people/${person.id}`} >More Info</Link>
    </div>
  )
}

export default IdCard