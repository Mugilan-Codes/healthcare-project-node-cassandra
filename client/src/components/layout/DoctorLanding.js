import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { useFetch } from '../../actions/hooks';
import { DOCTOR } from '../../actions/types';

const DoctorLanding = ({ isAuthenticated, role }) => {
  const [data] = useFetch('/api/health/total');
  const { totalPatients, totalDoctors } = data;

  if (role === DOCTOR && isAuthenticated) {
    return <Redirect to='/doctor-dashboard' />;
  }

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

DoctorLanding.propTypes = {
  isAuthenticated: PropTypes.bool,
  role: PropTypes.string,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  role: state.auth.role,
});

export default connect(mapStateToProps)(DoctorLanding);
