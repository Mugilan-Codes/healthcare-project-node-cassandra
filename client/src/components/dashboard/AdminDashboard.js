import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import Spinner from '../layout/Spinner';
import ViewDoctors from '../admin/ViewDoctors';
import ViewPatients from '../admin/ViewPatients';

const AdminDashboard = ({ auth: { user, loading } }) => {
  return loading || user === null ? (
    <Fragment>
      <Spinner />
    </Fragment>
  ) : (
    <Fragment>
      <div className='admin'>
        <h1 className='large text-primary'>Welcome to Admin Dashboard</h1>
        <p className='lead'>
          <i className='las la-hospital'></i>Welcome, {user.currentAdmin.name}
        </p>

        <div className='admin-profile bg-primary'>
          <img
            className='round-img'
            src={`https://ui-avatars.com/api/?name=${user.currentAdmin.name
              .replace(/\s\s+/g, ' ')
              .split('')
              .join('+')}&size=200`}
            alt='img'
          />

          <div>
            <h2>{user.currentAdmin.name}</h2>
            <p>{user.currentAdmin.email}</p>
          </div>
        </div>

        <Router>
          <div className='dash-buttons my-1'>
            <Link to='/admin-doctors' className='btn'>
              <i className='las la-stethoscope text-primary'></i>
              <span className='hide-sm'>View Doctors</span>
            </Link>
            <Link to='/admin-patients' className='btn'>
              <i className='las la-procedures text-primary'></i>
              <span className='hide-sm'>View Patients</span>
            </Link>
          </div>

          <Switch>
            <Route
              exact
              path='/admin-doctors'
              children={<ViewDoctors doctors={user.listDoctors} />}
            />
            <Route
              exact
              path='/admin-patients'
              children={<ViewPatients patients={user.listPatients} />}
            />
          </Switch>
        </Router>
      </div>
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
