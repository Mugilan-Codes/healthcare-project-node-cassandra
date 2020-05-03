import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { DOCTOR } from '../../actions/types';

const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, loading, role },
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      role === DOCTOR || !isAuthenticated ? (
        <Redirect to='/login' />
      ) : (
        <Component {...props} />
      )
    }
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
