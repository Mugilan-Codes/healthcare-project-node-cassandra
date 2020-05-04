import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Spinner from '../layout/Spinner';
import Book from './Book';
import Consult from './Consult';

const Dashboard = ({ auth: { user, loading } }) => {
  return loading && user === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='las la-hospital'></i>Welcome, {user.patient.name}
      </p>

      <div className='user-profile bg-light'>
        <img
          className='round-img'
          src={`https://ui-avatars.com/api/?name=${user.patient.name
            .replace(/\s\s+/g, ' ')
            .split('')
            .join('+')}&size=200`}
          alt='img'
        />

        <div>
          <h2>
            Name: <span>{user.patient.name}</span>
          </h2>
          <p>
            Email: <span>{user.patient.email}</span>
          </p>
          <p>
            Phone:{' '}
            <span>
              {user.patient.phno !== null ? user.patient.phno : '--Nil--'}
            </span>
          </p>
        </div>

        <div>
          <p>
            Address:{' '}
            <span>
              {user.patient.addr === null
                ? '--Nil'
                : user.patient.addr.length < 30
                ? user.patient.addr
                : 'Too Long to Display'}
            </span>
          </p>
          <p>
            DOB: <span>{user.patient.dob}</span>
          </p>
          <p>
            Gender: <span>{user.patient.gender}</span>
          </p>
        </div>
      </div>

      {user.getAllDoctors.length > 0 && (
        <div className='dash-buttons'>
          <Link to='/home' className='btn'>
            <i className='las la-clinic-medical text-primary' /> View Doctors
          </Link>
        </div>
      )}

      {user.bookedAppointments.length > 0 ? (
        <Book bookings={user.bookedAppointments} />
      ) : (
        <h2 className='my-2'>No Booked Appointments</h2>
      )}

      {user.consultations.length > 0 ? (
        <Consult consultation={user.consultations} />
      ) : (
        <h2 class='my-2'>No Consultations</h2>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Dashboard);
