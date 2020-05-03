import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { PATIENT } from '../../actions/types';

const DoctorPrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, loading, role },
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      role === PATIENT || !isAuthenticated ? (
        <Redirect to='/doctor-login' />
      ) : (
        <Component {...props} />
      )
    }
  />
);

DoctorPrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(DoctorPrivateRoute);
