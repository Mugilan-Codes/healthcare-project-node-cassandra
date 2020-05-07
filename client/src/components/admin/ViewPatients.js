import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ViewPatients = ({ patients }) => {
  const patient = patients.map((pat) => (
    <div key={pat.id} className='bg-light p-3 my-1'>
      <h3>{pat.name}</h3>
      <p>
        <Moment format='Do MMM, YYYY'>{pat.dob}</Moment>
      </p>
      <p>{pat.gender}</p>
      <p>{pat.email}</p>
      {pat.phno !== null && <p>{pat.phno}</p>}
    </div>
  ));

  return (
    <Fragment>
      <h2>Patients</h2>
      <div className='admin-display'>{patient}</div>
    </Fragment>
  );
};

ViewPatients.propTypes = {
  patients: PropTypes.array.isRequired,
};

export default ViewPatients;
