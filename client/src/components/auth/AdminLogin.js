import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { adminLogin } from '../../actions/auth';
import { ADMIN } from '../../actions/types';

const AdminLogin = ({ adminLogin, isAuthenticated, role }) => {
  const [formData, setFormData] = useState({
    email: '',
    pwd: '',
  });

  if (role === ADMIN && isAuthenticated) {
    return <Redirect to='/admin-dashboard' />;
  }

  const { email, pwd } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    adminLogin(email, pwd);
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Admin Sign In</h1>
      <p className='lead'>
        <i className='las la-user-cog' /> Sign Into your Account
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
        </div>
        <input type='submit' value='Login' className='btn btn-primary' />
      </form>
    </Fragment>
  );
};

AdminLogin.propTypes = {
  adminLogin: PropTypes.func,
  isAuthenticated: PropTypes.bool,
  role: PropTypes.string,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  role: state.auth.role,
});

export default connect(mapStateToProps, { adminLogin })(AdminLogin);
