import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const ViewDoctors = ({ doctors }) => {
  const doctor = doctors.map((doc) => (
    <div key={doc.d_id} className='bg-light p-3 my-1'>
      <h3>{doc.d_name}</h3>
      <p>{doc.spec}</p>
      <p>{doc.email}</p>
    </div>
  ));

  return (
    <Fragment>
      <h2>Doctors</h2>
      <div className='admin-display'>{doctor}</div>
    </Fragment>
  );
};

ViewDoctors.propTypes = {
  doctors: PropTypes.array.isRequired,
};

export default ViewDoctors;
