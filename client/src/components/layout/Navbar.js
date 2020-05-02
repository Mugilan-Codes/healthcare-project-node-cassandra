import React from 'react';

const Navbar = () => {
  return (
    <nav className='navbar bg-dark'>
      <h1>
        <a href='index.html'>
          <i className='las la-heartbeat'></i> HealthCare 360
        </a>
      </h1>
      <ul>
        <li>
          <a href='login.html'>Login</a>
        </li>
        <li>
          <a href='register.html'>Register</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
