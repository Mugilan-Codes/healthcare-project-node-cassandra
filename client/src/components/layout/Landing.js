import React from 'react';

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
            <a href='register.html' className='btn btn-primary'>
              Register
            </a>
            <a href='login.html' className='btn'>
              Log In
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
