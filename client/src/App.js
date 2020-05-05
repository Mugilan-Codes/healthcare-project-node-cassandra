import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import DoctorLanding from './components/layout/DoctorLanding';
import Routes from './components/routing/Routes';
import Footer from './components/layout/Footer';
import { ScrollToTop } from './components/routing/ScrollToTop';

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
          <ScrollToTop />
          <Navbar />
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route exact path='/doctor' component={DoctorLanding} />
            <Route component={Routes} />
          </Switch>
          <Footer />
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
