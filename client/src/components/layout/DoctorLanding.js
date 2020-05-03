import React from 'react';
import { Link } from 'react-router-dom';

import { useFetch } from '../../actions/hooks';

const Landing = () => {
  const [data] = useFetch('/total');
  const { totalPatients, totalDoctors } = data;

  return (
    <section className='doctor-landing'>
      <div className='dark-overlay'>
        <div className='doctor-landing-inner'>
          <h1 className='x-large'>DOCTOR</h1>
          <p className='lead'>
            This is Doctor Landing Page
            <br />
            No. of Patients: <span>{totalPatients}</span>
            <br />
            No. of Doctors: <span>{totalDoctors}</span>
          </p>
          <div className='buttons'>
            <Link to='/doctor-register' className='btn btn-primary'>
              Register
            </Link>
            <Link to='/doctor-login' className='btn'>
              Log In
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
