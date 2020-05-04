import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

const Consult = ({ consultation }) => {
  const consultations = consultation.map((consult) => (
    <tr key={consult.c_id}>
      <td>{consult.d_name}</td>
      <td class='hide-sm'>{consult.spec}</td>
      <td class='hide-sm'>{consult.symptoms}</td>
      <td>
        <Moment format='Do MMM, YYYY'>{consult.consulted_on}</Moment>
      </td>
      <td>
        {consult.cp_id !== null ? (
          <Link to={`/view-consult/${consult.cp_id}`} class='btn btn-success'>
            View
          </Link>
        ) : (
          <a href='#!' className='btn'>
            Pending
          </a>
        )}
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 class='my-2'>Consultations</h2>
      <table class='table'>
        <thead>
          <tr>
            <th>Doctor</th>
            <th class='hide-sm'>Specialization</th>
            <th class='hide-sm'>Symptoms</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>{consultations}</tbody>
      </table>
    </Fragment>
  );
};

Consult.propTypes = {
  consultation: PropTypes.array.isRequired,
};

export default Consult;
