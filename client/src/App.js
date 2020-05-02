import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import DoctorLanding from './components/layout/DoctorLanding';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import DoctorLogin from './components/auth/DoctorLogin';
import DoctorRegister from './components/auth/DoctorRegister';
// import Footer from './components/layout/Footer';

import './App.css';

const App = () => (
  <Router>
    <Fragment>
      <Navbar />
      <Route exact path='/' component={Landing} />
      <Route exact path='/doctor' component={DoctorLanding} />
      <section className='container'>
        <Switch>
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/doctor-register' component={DoctorRegister} />
          <Route exact path='/doctor-login' component={DoctorLogin} />
        </Switch>
      </section>
      {/* <Footer /> */}
    </Fragment>
  </Router>
);

export default App;
