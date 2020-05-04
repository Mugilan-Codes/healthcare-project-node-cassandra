import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { logout } from '../../actions/auth';
import { PATIENT, DOCTOR } from '../../actions/types';

const PatientNavbar = ({ auth: { isAuthenticated, role }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to='/home'>Home</Link>
      </li>
      <li>
        <Link to='/dashboard'>Dashboard</Link>
      </li>
      <li>
        <a href='#!' onClick={logout}>
          <i className='las la-sign-out-alt' />{' '}
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to='/login'>Login</Link>
      </li>
      <li>
        <Link to='/register'>Register</Link>
      </li>
    </ul>
  );

  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>
          <i className='las la-heartbeat'></i> HealthCare 360
        </Link>
      </h1>
      <Fragment>
        {role === PATIENT && isAuthenticated ? authLinks : guestLinks}
      </Fragment>
    </nav>
  );
};

const DoctorNavbar = ({ auth: { isAuthenticated, role }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to='/doctor-dashboard'>Dashboard</Link>
      </li>
      <li>
        <a href='#!' onClick={logout}>
          <i className='las la-sign-out-alt' />{' '}
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to='/doctor-login'>Login</Link>
      </li>
      <li>
        <Link to='/doctor-register'>Register</Link>
      </li>
    </ul>
  );

  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/doctor'>
          <i className='las la-heartbeat'></i> HealthCare 360
        </Link>
      </h1>
      <Fragment>
        {role === DOCTOR && isAuthenticated ? authLinks : guestLinks}
      </Fragment>
    </nav>
  );
};

const Navbar = ({ location, auth, logout }) => {
  if (location.pathname.match(/doctor/))
    return <DoctorNavbar auth={auth} logout={logout} />;
  if (location.pathname.match())
    return <PatientNavbar auth={auth} logout={logout} />;
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(withRouter(Navbar));
