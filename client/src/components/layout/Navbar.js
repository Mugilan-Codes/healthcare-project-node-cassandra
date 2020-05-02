import React from 'react';
import { Link, withRouter } from 'react-router-dom';

// @todo Doctor Viewable Navbar

const PatientNavbar = () => {
  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>
          <i className='las la-heartbeat'></i> HealthCare 360
        </Link>
      </h1>
      <ul>
        <li>
          <Link to='/login'>Login</Link>
        </li>
        <li>
          <Link to='/register'>Register</Link>
        </li>
      </ul>
    </nav>
  );
};

const DoctorNavbar = () => {
  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/doctor'>
          <i className='las la-heartbeat'></i> HealthCare 360
        </Link>
      </h1>
      <ul>
        <li>
          <Link to='/doctor-login'>Login</Link>
        </li>
        <li>
          <Link to='/doctor-register'>Register</Link>
        </li>
      </ul>
    </nav>
  );
};

const Navbar = ({ location }) => {
  if (location.pathname.match(/doctor/)) return <DoctorNavbar />;
  if (location.pathname.match()) return <PatientNavbar />;
};

export default withRouter(Navbar);
