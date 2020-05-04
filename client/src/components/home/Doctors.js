import React from 'react';

import { useFetch } from '../../actions/hooks';

const Doctors = () => {
  const [data] = useFetch('/list/doctors');
  const { doctors } = data;

  return (
    <div>
      {doctors &&
        doctors.map((doctor) => (
          <div key={doctor.d_id}>
            <h1>{doctor.d_name}</h1>
            <p>{doctor.spec}</p>
            <p>{doctor.email}</p>
          </div>
        ))}
    </div>
  );
};

export default Doctors;
