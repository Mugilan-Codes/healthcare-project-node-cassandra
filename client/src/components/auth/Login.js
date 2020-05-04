import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { login } from '../../actions/auth';
import { PATIENT } from '../../actions/types';

const Login = ({ login, isAuthenticated, role }) => {
  const [formData, setFormData] = useState({
    email: '',
    pwd: '',
  });

  if (role === PATIENT && isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  const { email, pwd } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    login(email, pwd);
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Sign In</h1>
      <p className='lead'>
        <i className='las la-user-injured'></i>Sign Into your Account
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
        Don't have an account? <Link to='/register'>Sign Up</Link>
      </p>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  role: PropTypes.string,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  role: state.auth.role,
});

export default connect(mapStateToProps, { login })(Login);
