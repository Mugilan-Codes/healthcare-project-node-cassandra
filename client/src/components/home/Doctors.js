import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { useFetch } from '../../actions/hooks';

const Doctors = () => {
  const [doctors] = useFetch('/api/health/list/doctors');

  return (
    <Fragment>
      <h1 className='large text-primary'>Doctors</h1>
      <p className='lead'>
        <i className='las la-hospital' /> Book and Consult with Doctors
      </p>

      <div className='profiles'>
        {doctors.length > 0 ? (
          doctors.map(({ d_id, d_name, email, spec }) => (
            <div key={d_id} className='profile bg-light'>
              <img
                className='round-img'
                src={`https://ui-avatars.com/api/?name=${d_name
                  .replace(/\s\s+/g, ' ')
                  .split('')
                  .join('+')}&size=200`}
                alt='img'
              />

              <div>
                <h2>{d_name}</h2>
                <p>{email}</p>
                <p>{spec}</p>
              </div>

              <ul>
                <li className='btn btn-primary'>
                  <Link to={`/book/${d_id}`}>Book</Link>
                </li>
                <li className='btn btn-primary'>
                  <Link to={`/consult/${d_id}`}>Consult</Link>
                </li>
              </ul>
            </div>
          ))
        ) : (
          <h4>No Doctors found...</h4>
        )}
      </div>
    </Fragment>
  );
};

export default Doctors;
