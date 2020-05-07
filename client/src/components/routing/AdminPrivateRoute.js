import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { PATIENT, DOCTOR } from '../../actions/types';

const AdminPrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, loading, role },
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      role === PATIENT || role === DOCTOR || !isAuthenticated ? (
        <Redirect to='/admin' />
      ) : (
        <Component {...props} />
      )
    }
  />
);

AdminPrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(AdminPrivateRoute);
