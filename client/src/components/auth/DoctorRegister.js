import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

const DoctorRegister = () => {
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

  const onSubmit = (e) => {
    e.preventDefault();

    if (pwd !== pwd2) {
      console.log('Password Does not Match');
    } else {
      console.log(formData);
    }
  };

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

export default DoctorRegister;
