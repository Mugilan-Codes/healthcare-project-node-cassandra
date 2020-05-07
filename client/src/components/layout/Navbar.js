import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { logout } from '../../actions/auth';
import { PATIENT, DOCTOR, ADMIN } from '../../actions/types';

const PatientNavbar = ({ auth: { isAuthenticated, role }, logout }) => {
  const authLinks = (
    <Fragment>
      <li>
        <Link to='/dashboard'>Dashboard</Link>
      </li>
      <li>
        <a href='#!' onClick={logout}>
          <i className='las la-sign-out-alt' />{' '}
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to='/login'>Login</Link>
      </li>
      <li>
        <Link to='/register'>Register</Link>
      </li>
    </Fragment>
  );

  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>
          <i className='las la-heartbeat'></i> HealthCare 360
        </Link>
      </h1>
      <Fragment>
        <ul>
          <li>
            <Link to='/home'>Home</Link>
          </li>
          {role === PATIENT && isAuthenticated ? authLinks : guestLinks}
        </ul>
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

const AdminNavbar = ({ auth: { isAuthenticated, role }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to='/admin-dashboard'>Dashboard</Link>
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
        <Link to='/'>Patient</Link>
      </li>
      <li>
        <Link to='/doctor'>Doctor</Link>
      </li>
      <li>
        <Link to='/admin'>Admin</Link>
      </li>
    </ul>
  );

  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/admin'>
          <i className='las la-heartbeat'></i> HealthCare 360
        </Link>
      </h1>
      <Fragment>
        {role === ADMIN && isAuthenticated ? authLinks : guestLinks}
      </Fragment>
    </nav>
  );
};

const GuestNavbar = () => (
  <nav className='navbar bg-dark'>
    <h1>
      <Link to='/about'>
        <i className='las la-heartbeat'></i> HealthCare 360
      </Link>
    </h1>
    <ul>
      <li>
        <Link to='/'>Patient</Link>
      </li>
      <li>
        <Link to='/doctor'>Doctor</Link>
      </li>
      <li>
        <Link to='/admin'>Admin</Link>
      </li>
    </ul>
  </nav>
);

const Navbar = ({ location, auth, logout }) => {
  //todo Make Admin and News Page and Navbar relating to it
  if (location.pathname.match(/about/) || location.pathname.match(/news/)) {
    return <GuestNavbar />;
  }
  if (location.pathname.match(/admin/)) {
    return <AdminNavbar auth={auth} logout={logout} />;
  }
  if (
    location.pathname.match(/doctor/) ||
    location.pathname.match(/check-patient/)
  )
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
