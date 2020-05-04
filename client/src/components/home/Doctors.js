import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { useFetch } from '../../actions/hooks';

const Doctors = () => {
  const [doctors] = useFetch('/list/doctors');

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
                src='https://picsum.photos/200'
                alt='img'
              />

              <div>
                <h2>
                  Doctor Name: <span>{d_name}</span>
                </h2>
                <p>
                  Email: <span>{email}</span>
                </p>
                <p>
                  Spec: <span>{spec}</span>
                </p>
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
