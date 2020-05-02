import React, { Fragment } from 'react';

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Footer from './components/layout/Footer';

import './App.css';

const App = () => (
  <Fragment>
    <Navbar />
    <Landing />
    <Footer />
  </Fragment>
);

export default App;
