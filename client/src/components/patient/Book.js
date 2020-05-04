import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { bookAppointment } from '../../actions/auth';

const Book = ({ doctors, history, bookAppointment }) => {
  const [doa, setDoa] = useState('');

  const id = history.location.pathname.substring(6);

  const search = (nameKey, myArray) => {
    for (let x of myArray) {
      if (x.d_id === nameKey) return x;
    }
  };
  const doctor = search(id, doctors);
  // const doctor = doctors.find((doc) => doc.d_id === id);

  // const onChange = (e) =>
  //   setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <h1 className='large text-primary'>Book Appointment</h1>
      <p className='lead'>
        Book your Appointment with Dr.{doctor.d_name} ({doctor.spec})
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          bookAppointment(doctor.d_id, doa, history);
        }}
        className='form'
      >
        <div className='form-group'>
          <input
            type='date'
            name='doa'
            value={doa}
            onChange={(e) => {
              setDoa(e.target.value);
            }}
            required
          />
          <small className='form-text'>Enter the Date of Appointment</small>
        </div>
        <input type='submit' value='Book' className='btn btn-primary my-1' />
        <a href='home.html' className='btn my-1'>
          Go Back
        </a>
      </form>
    </Fragment>
  );
};

Book.propTypes = {
  doctors: PropTypes.array,
  bookAppointment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  doctors: state.auth.user.getAllDoctors,
});

export default connect(mapStateToProps, { bookAppointment })(withRouter(Book));
