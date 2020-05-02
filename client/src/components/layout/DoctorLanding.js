import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <section className='doctor-landing'>
      <div className='dark-overlay'>
        <div className='doctor-landing-inner'>
          <h1 className='x-large'>DOCTOR</h1>
          <p className='lead'>
            This is Doctor Landing Page
            <br />
            No. of Patients: <span>7</span>
            <br />
            No. of Doctors: <span>14</span>
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
