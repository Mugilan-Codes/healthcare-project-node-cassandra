import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Spinner from '../layout/Spinner';

const AdminDashboard = ({ auth: { user, loading } }) => {
  return loading || user === null ? (
    <Fragment>
      <Spinner />
    </Fragment>
  ) : (
    <Fragment>
      <h1 class='large text-primary'>Welcome to Admin Dashboard</h1>
      <p class='lead'>
        <i class='las la-hospital'></i>Welcome, {user.currentAdmin.name}
      </p>
    </Fragment>
  );
};

AdminDashboard.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(AdminDashboard);
