import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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
              {user.patient.addr !== null
                ? user.patient.addr.length < 20
                  ? user.patient.addr
                  : 'Too Long to Display'
                : '--Nil--'}
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
