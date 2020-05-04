import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const DoctorConsult = ({ consultations, checks }) => {
  const check = (cons) =>
    checks.map((che) =>
      che.cp_id === cons.cp_id ? (
        <Fragment key={che.cp_id}>
          <td className='hide-sm'>{che.result}</td>
          <td className='hide-sm'>{che.status}</td>
          <td>
            <a href='#!' className='btn'>
              Done
            </a>
          </td>
        </Fragment>
      ) : (
        <td>No</td>
      )
    );

  const consultaion = consultations.map((cons) => (
    <tr key={cons.c_id}>
      <td>{cons.name}</td>
      <td className='hide-sm'>{cons.age}</td>
      <td className='hide-sm'>{cons.gender}</td>
      <td>{cons.days}</td>
      {cons.cp_id ? (
        check(cons)
      ) : (
        <Fragment>
          <td className='hide-sm'>Nil</td>
          <td className='hide-sm'>Nil</td>
          <td>
            <Link
              to={`/check-patient/${cons.c_id}`}
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
        <tbody>{consultaion}</tbody>
      </table>
    </Fragment>
  );
};

DoctorConsult.propTypes = {
  consultations: PropTypes.array.isRequired,
  checks: PropTypes.array.isRequired,
};

export default DoctorConsult;
