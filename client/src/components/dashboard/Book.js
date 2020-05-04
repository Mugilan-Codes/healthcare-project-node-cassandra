import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const Book = ({ bookings }) => {
  const booked = bookings.map((book) => (
    <tr key={book.b_id}>
      <td>{book.d_name}</td>
      <td className='hide-sm'>{book.spec}</td>
      <td>
        <Moment format='Do MMM, YYYY'>{book.doa}</Moment>
      </td>
      <td className='hide-sm'>
        <Moment format='Do MMM, YYYY'>{book.time}</Moment>
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
      <h2 className='my-2'>Booked Appointments</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>Doctor</th>
            <th className='hide-sm'>Specialization</th>
            <th>Appointment Date</th>
            <th className='hide-sm'>Booked On</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{booked}</tbody>
      </table>
    </Fragment>
  );
};

Book.propTypes = {
  bookings: PropTypes.array.isRequired,
};

export default Book;
