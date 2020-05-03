import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setAlert } from '../../actions/alert';
import { doctorRegister } from '../../actions/auth';
import { DOCTOR } from '../../actions/types';

const DoctorRegister = ({
  setAlert,
  doctorRegister,
  isAuthenticated,
  role,
}) => {
  const [formData, setFormData] = useState({
    d_name: '',
    spec: '',
    email: '',
    pwd: '',
    pwd2: '',
  });

  const { d_name, spec, email, pwd, pwd2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    if (pwd !== pwd2) {
      setAlert('Passwords do not Match!', 'danger');
    } else {
      const newDoctor = { d_name, spec, email, pwd };

      doctorRegister(newDoctor);
    }
  };

  if (role === DOCTOR && isAuthenticated) {
    return <Redirect to='/doctor-dashboard' />;
  }

  return (
    <Fragment>
      <h1 className='large text-primary'>Doctor Sign Up</h1>
      <p className='lead'>
        <i className='las la-stethoscope'></i>Create your Account
      </p>
      <form onSubmit={(e) => onSubmit(e)} className='form'>
        <div className='form-group'>
          <input
            type='text'
            placeholder="Doctor's Name"
            name='d_name'
            value={d_name}
            onChange={(e) => onChange(e)}
            required
          />
          <small className='form-text'>Enter your Name</small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Specialization'
            name='spec'
            value={spec}
            onChange={(e) => onChange(e)}
            required
          />
          <small className='form-text'>Enter your Specialization</small>
        </div>
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
        <div className='form-group'>
          <input
            type='password'
            name='pwd2'
            placeholder='Confirm Password'
            minLength='6'
            value={pwd2}
            onChange={(e) => onChange(e)}
            required
          />
          <small className='form-text'>Confirm Password</small>
        </div>
        <input type='submit' value='Register' className='btn btn-primary' />
      </form>
      <p className='my-1'>
        Already have an account? <Link to='/doctor-login'>Sign In</Link>
      </p>
    </Fragment>
  );
};

DoctorRegister.propTypes = {
  setAlert: PropTypes.func.isRequired,
  doctorRegister: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  role: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  role: state.auth.role,
});

export default connect(mapStateToProps, { setAlert, doctorRegister })(
  DoctorRegister
);
