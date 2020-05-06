import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const DoctorConsult = ({ consultations, checks }) => {
  let merged = [];

  if (checks !== undefined) {
    for (let i = 0; i < consultations.length; i++) {
      merged.push({
        ...consultations[i],
        ...checks.find((itmInner) => itmInner.cp_id === consultations[i].cp_id),
      });
    }
  } else {
    merged.push(...consultations);
  }

  const consultation = merged.map((item) => (
    <tr key={item.c_id}>
      <td>{item.name}</td>
      <td className='hide-sm'>{item.age}</td>
      <td className='hide-sm'>{item.gender}</td>
      <td>{item.days}</td>
      {item.cp_id !== null ? (
        <Fragment>
          <td className='hide-sm'>{item.result}</td>
          <td className='hide-sm'>{item.status}</td>
          <td>
            <a href='#!' className='btn'>
              Done
            </a>
          </td>
        </Fragment>
      ) : (
        <Fragment>
          <td className='hide-sm'>Nil</td>
          <td className='hide-sm'>Nil</td>
          <td>
            <Link
              to={`/check-patient/${item.c_id}`}
              className='btn btn-success'
            >
              Consult
            </Link>
          </td>
        </Fragment>
      )}
    </tr>
  ));

  return (
    <Fragment>
      <h2 className='my-2'>Consultations</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>Patient</th>
            <th className='hide-sm'>Age</th>
            <th className='hide-sm'>Gender</th>
            <th>Days</th>
            <th className='hide-sm'>Result</th>
            <th className='hide-sm'>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{consultation}</tbody>
      </table>
    </Fragment>
  );
};

DoctorConsult.propTypes = {
  consultations: PropTypes.array,
  checks: PropTypes.array,
};

export default DoctorConsult;
