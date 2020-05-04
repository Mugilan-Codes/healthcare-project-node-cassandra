import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

import Spinner from '../layout/Spinner';

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

      <h2 class='my-2'>Booked Appointments</h2>
      <table class='table'>
        <thead>
          <tr>
            <th>Doctor</th>
            <th class='hide-sm'>Specialization</th>
            <th>Appointment Date</th>
            <th class='hide-sm'>Booked On</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {user.bookedAppointments.length > 0 &&
            user.bookedAppointments.map((book) => (
              <tr>
                <td>{book.d_name}</td>
                <td class='hide-sm'>{book.spec}</td>
                <td>
                  <Moment format='Do MMM, YYYY'>{book.doa}</Moment>
                </td>
                <td class='hide-sm'>
                  <Moment format='Do MMM, YYYY'>{book.time}</Moment>
                </td>
                <td>
                  <button class='btn btn-danger'>
                    <i class='las la-calendar-minus' />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
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
