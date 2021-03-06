import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { doctorLogin } from '../../actions/auth';
import { DOCTOR } from '../../actions/types';

const DoctorLogin = ({ doctorLogin, isAuthenticated, role }) => {
  const [formData, setFormData] = useState({
    email: '',
    pwd: '',
  });

  const { email, pwd } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    doctorLogin(email, pwd);
  };

  if (role === DOCTOR && isAuthenticated) {
    return <Redirect to='/doctor-dashboard' />;
  }

  return (
    <Fragment>
      <h1 className='large text-primary'>Doctor Sign In</h1>
      <p className='lead'>
        <i className='las la-stethoscope'></i>Sign Into your Account
      </p>
      <form onSubmit={(e) => onSubmit(e)} className='form'>
        <div className='form-group'>
          <input
            type='email'
            placeholder='E-Mail Address'
            name='email'
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
          <small className='form-text'>Enter your Email Address</small>
        </div>
        <div className='form-group'>
          <input
            type='password'
            name='pwd'
            placeholder='Enter your Password'
            minLength='6'
            value={pwd}
            onChange={(e) => onChange(e)}
            required
          />
          <small className='form-text'>Enter Password</small>
        </div>
        <input type='submit' value='Login' className='btn btn-primary' />
      </form>
      <p className='my-1'>
        Don't have an account? <Link to='/doctor-register'>Sign Up</Link>
      </p>
    </Fragment>
  );
};

DoctorLogin.propTypes = {
  doctorLogin: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  role: PropTypes.string,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  role: state.auth.role,
});

export default connect(mapStateToProps, { doctorLogin })(DoctorLogin);
