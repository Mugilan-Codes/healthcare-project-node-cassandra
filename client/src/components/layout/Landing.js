import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1 className='x-large'>Health Care</h1>
          <p className='lead'>
            This is a Healthcare Management System Project. Using CassandraDB
          </p>
          <div className='buttons'>
            <Link to='/register' className='btn btn-primary'>
              Register
            </Link>
            <Link to='/login' className='btn'>
              Log In
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
