import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import { consultDoctor } from '../../actions/auth';

const Consult = ({ doctors, history, consultDoctor }) => {
  const [formData, setFormData] = useState({
    symptoms: '',
    affected_area: '',
    additional_info: '',
    days: '',
  });

  const id = history.location.pathname.substring(9); // history.location.pathname.replace('/consult/', '')
  const doctor = doctors.find((doc) => doc.d_id === id);

  const { symptoms, affected_area, additional_info, days } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    consultDoctor(doctor.d_id, formData, history);
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Consult Doctor</h1>
      <p className='lead'>
        Get Consultation from Dr.{doctor.d_name} ({doctor.spec})
      </p>

      <form onSubmit={(e) => onSubmit(e)} className='form'>
        <div className='form-group'>
          <input
            type='text'
            name='symptoms'
            placeholder='Symptoms'
            value={symptoms}
            onChange={(e) => onChange(e)}
            required
          />
          <small className='form-text'>Enter your Symptoms</small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Affected Areas'
            name='affected_area'
            value={affected_area}
            onChange={(e) => onChange(e)}
            required
          />
          <small className='form-text'>
            Please use comma separated values (eg. Cold,Fever)
          </small>
        </div>
        <div className='form-group'>
          <textarea
            name='additional_info'
            cols='20'
            rows='5'
            placeholder='Additional Info'
            value={additional_info}
            onChange={(e) => onChange(e)}
            required
          ></textarea>
          <small className='form-text'>Enter Additional Info</small>
        </div>
        <div className='form-group'>
          <input
            type='number'
            name='days'
            placeholder='No. of Days'
            min='1'
            max='99'
            value={days}
            onChange={(e) => onChange(e)}
            required
          />
          <small className='form-text'>
            Enter the no. of days you have had the symptoms
          </small>
        </div>
        <input type='submit' value='Consult' className='btn btn-primary my-1' />
        <Link to='/home' className='btn my-1'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

Consult.propTypes = {
  doctors: PropTypes.array,
  consultDoctor: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  doctors: state.auth.user.getAllDoctors,
});

export default connect(mapStateToProps, { consultDoctor })(withRouter(Consult));
