import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Spinner from '../layout/Spinner';
import DoctorBook from './DoctorBook';
import DoctorConsult from './DoctorConsult';

const DoctorDashboard = ({ auth: { user, loading } }) => {
  const reloadPage = () => window.location.reload(false);

  return loading || user === null ? (
    <Fragment>
      <Spinner />
      {reloadPage()}
    </Fragment>
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='las la-hospital'></i>Welcome, Dr.{user.doctor.d_name}
      </p>

      <div className='doc-profile bg-light'>
        <img
          className='round-img hide-sm'
          src={`https://ui-avatars.com/api/?name=${user.doctor.d_name
            .replace(/\s\s+/g, ' ')
            .split('')
            .join('+')}&size=200`}
          alt='img'
        />

        <div>
          <h2>
            Name: <span>{user.doctor.d_name}</span>
          </h2>
          <p>
            Email: <span>{user.doctor.email}</span>
          </p>
          <p>
            Specializaton: <span>{user.doctor.spec}</span>
          </p>
        </div>
      </div>

      {user.appointments.length > 0 ? (
        <DoctorBook appointments={user.appointments} />
      ) : (
        <h2 className='my-2'>No Appointments</h2>
      )}

      {user.consultations.length > 0 ? (
        user.checks.length > 0 ? (
          <DoctorConsult
            consultations={user.consultations}
            checks={user.checks}
          />
        ) : (
          <DoctorConsult consultations={user.consultations} />
        )
      ) : (
        <h2>No Consultations</h2>
      )}
    </Fragment>
  );
};

DoctorDashboard.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(DoctorDashboard);
