import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import { checkPatient } from '../../actions/auth';

const Check = ({ consultations, history, checkPatient }) => {
  const [formData, setFormData] = useState({
    diagnosis: '',
    prescription: '',
    result: '',
    status: '',
  });

  const id = history.location.pathname.replace('/check-patient/', '');
  const cons = consultations.find((cons) => cons.c_id === id);

  const { diagnosis, prescription, result, status } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    checkPatient(cons.c_id, formData, history);
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Check Patient</h1>

      <div className='check-profile bg-light'>
        <img
          className='round-img'
          src={`https://ui-avatars.com/api/?name=${cons.name
            .replace(/\s\s+/g, ' ')
            .split('')
            .join('+')}&size=200`}
          alt='img'
        />

        <div>
          <h2>
            Patient: <span>{cons.name}</span>
          </h2>
          <p>
            Email: <span>{cons.email}</span>
          </p>
          <p>
            Age: <span>{cons.age}</span>
          </p>
          <p>
            Gender: <span>{cons.gender}</span>
          </p>
        </div>
      </div>

      <div>
        <h2 className='my-2'>Details</h2>
        <p>
          Symptoms: <span>{cons.symptoms}</span>
        </p>
        <p>
          Affected Area:{' '}
          <span>
            {cons.affected_area
              .map((area) => area.charAt(0).toUpperCase() + area.slice(1))
              .join(', ')}
          </span>
        </p>
        <p>
          Additional Info: <span>{cons.additional_info}</span>
        </p>
        <p>
          Days Affected: <span>{cons.days}</span>
        </p>
      </div>

      <form onSubmit={(e) => onSubmit(e)} className='form'>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Diagnosis'
            name='diagnosis'
            value={diagnosis}
            onChange={(e) => onChange(e)}
            required
          />
          <small className='form-text'>Give your Diagnosis</small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Prescription'
            name='prescription'
            value={prescription}
            onChange={(e) => onChange(e)}
            required
          />
          <small className='form-text'>
            Please use comma separated values (eg. Crocin, Paracetamol)
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Result'
            name='result'
            value={result}
            onChange={(e) => onChange(e)}
            required
          />
          <small className='form-text'>Give the Result</small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Status'
            name='status'
            value={status}
            onChange={(e) => onChange(e)}
            required
          />
          <small className='form-text'>Update Status</small>
        </div>
        <input type='submit' value='Submit' className='btn btn-primary my-1' />
        <Link to='/doctor-dashboard' className='btn my-1'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

Check.propTypes = {
  consultations: PropTypes.array,
  checkPatient: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  consultations: state.auth.user.consultations,
});

export default connect(mapStateToProps, { checkPatient })(withRouter(Check));
