import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const DoctorBook = ({ appointments }) => {
  const appointment = appointments.map((app) => (
    <tr key={app.b_id}>
      <td>{app.name}</td>
      <td className='hide-sm'>{app.email}</td>
      <td>
        <Moment format='Do MMM, YYYY'>{app.doa}</Moment>
      </td>
      <td className='hide-sm'>
        <Moment format='Do MMM, YYYY'>{app.time}</Moment>
      </td>
      <td>
        <button className='btn btn-danger'>
          <i className='las la-calendar-minus' />
        </button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className='my-2'>Appointments</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>Patient</th>
            <th className='hide-sm'>Email</th>
            <th>Appointment Date</th>
            <th className='hide-sm'>Booked On</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{appointment}</tbody>
      </table>
    </Fragment>
  );
};

DoctorBook.propTypes = {
  appointments: PropTypes.array.isRequired,
};

export default DoctorBook;
