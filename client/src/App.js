import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import DoctorLanding from './components/layout/DoctorLanding';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import DoctorLogin from './components/auth/DoctorLogin';
import DoctorRegister from './components/auth/DoctorRegister';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import DoctorDashboard from './components/dashboard/DoctorDashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import DoctorPrivateRoute from './components/routing/DoctorPrivateRoute';
// import Footer from './components/layout/Footer';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadPatient, loadDoctor } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import { DOCTOR, PATIENT } from './actions/types';

import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    if (localStorage.role === DOCTOR) store.dispatch(loadDoctor());
    if (localStorage.role === PATIENT) store.dispatch(loadPatient());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path='/' component={Landing} />
          <Route exact path='/doctor' component={DoctorLanding} />
          <section className='container'>
            <Alert />
            <Switch>
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/doctor-register' component={DoctorRegister} />
              <Route exact path='/doctor-login' component={DoctorLogin} />
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <DoctorPrivateRoute
                exact
                path='/doctor-dashboard'
                component={DoctorDashboard}
              />
            </Switch>
          </section>
          {/* <Footer /> */}
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
