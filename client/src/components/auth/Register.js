import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setAlert } from '../../actions/alert';

const Register = ({ setAlert }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    addr: '',
    dob: '',
    gender: '',
    phno: '',
    pwd: '',
    pwd2: '',
  });

  const { name, email, addr, dob, gender, phno, pwd, pwd2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    if (pwd !== pwd2) {
      setAlert('Passwords Do Not Match', 'danger');
    } else {
      // const newPatient = { name, email, addr, dob, gender, phno, pwd };

      // try {
      //   const config = { headers: { 'Content-Type': 'application/json' } };

      //   const body = JSON.stringify(newPatient);

      //   const res = await axios.post('/patient/register', body, config);

      //   console.log(res.data);
      // } catch (err) {
      //   console.error(err.response.data);
      // }
      console.log('SUCCESS');
    }
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Sign Up</h1>
      <p className='lead'>
        <i className='las la-user-injured'></i>Create your Account
      </p>
      <form onSubmit={(e) => onSubmit(e)} className='form'>
        <div className='form-group'>
          <input
            type='text'
            placeholder="Patient's Name"
            name='name'
            value={name}
            onChange={(e) => onChange(e)}
            required
          />
          <small className='form-text'>Enter your Name</small>
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
          <textarea
            name='addr'
            cols='20'
            rows='5'
            value={addr}
            onChange={(e) => onChange(e)}
            placeholder='Address'
          ></textarea>
          <small className='form-text'>Enter your Residential Address</small>
        </div>
        <div className='form-group'>
          <input
            type='date'
            name='dob'
            value={dob}
            onChange={(e) => onChange(e)}
            required
          />
          <small className='form-text'>Enter your Date of Birth</small>
        </div>
        <div className='form-group'>
          <input
            type='radio'
            name='gender'
            value='Male'
            id='male'
            checked={gender === 'Male'}
            onChange={(e) => onChange(e)}
          />
          <label htmlFor='male'>Male</label>
          <input
            type='radio'
            name='gender'
            value='Female'
            id='female'
            checked={gender === 'Female'}
            onChange={(e) => onChange(e)}
          />
          <label htmlFor='female'>Female</label>
          <input
            type='radio'
            name='gender'
            value='Others'
            id='others'
            checked={gender === 'Others'}
            onChange={(e) => onChange(e)}
          />
          <label htmlFor='others'>Others</label>
          <small className='form-text'>Choose Your Gender</small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            name='phno'
            pattern='[0-9]{10}'
            minLength='8'
            maxLength='10'
            value={phno}
            onChange={(e) => onChange(e)}
            placeholder='Enter your Phone Number'
          />
          <small className='form-text'>
            Enter your Phone Number (eg. 9566162340)
          </small>
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
            value={pwd2}
            onChange={(e) => onChange(e)}
            minLength='6'
            required
          />
          <small className='form-text'>Confirm Password</small>
        </div>
        <input type='submit' value='Register' className='btn btn-primary' />
      </form>
      <p className='my-1'>
        Already have an account? <Link to='/login'>Sign In</Link>
      </p>
    </Fragment>
  );
};

Register.propTypes = { setAlert: PropTypes.func.isRequired };

export default connect(null, { setAlert })(Register);
