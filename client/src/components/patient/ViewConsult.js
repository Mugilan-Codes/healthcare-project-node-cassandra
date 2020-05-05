import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import Moment from 'react-moment';

const ViewConsult = ({ consultations, replies, history, patient }) => {
  const cp_id = history.location.pathname.replace('/view-consult/', '');

  const cons = consultations.find((cons) => cons.cp_id === cp_id);
  const reply = replies.find((rep) => rep.cp_id === cp_id);

  const { name, email, phno, dob, gender } = patient;

  return (
    <Fragment>
      <Link to='/dashboard' className='btn'>
        Go Back
      </Link>

      <h1 className='large text-primary'>Consultation With Doctor Reply</h1>

      <div className='user-profile bg-light'>
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
            Name: <span>{name}</span>
          </h2>
          <p>
            Email: <span>{email}</span>
          </p>
          <p>
            Phone: <span>{phno !== null ? phno : '--Nil--'}</span>
          </p>
        </div>

        <div>
          <p>
            DOB: <span>{dob}</span>
          </p>
          <p>
            Age: <span>{cons.age}</span>
          </p>
          <p>
            Gender: <span>{gender}</span>
          </p>
        </div>
      </div>

      <div className='profile-grid my-1'>
        {/* <!-- Doctor Detail --> */}
        <div className='profile-top bg-primary p-2'>
          <h1 className='large'>{cons.d_name.toUpperCase()}</h1>
          <p className='lead'>
            {cons.spec.charAt(0).toUpperCase() + cons.spec.slice(1)}
          </p>
          {/* <p>Email Address</p> */}
        </div>

        {/* <!-- Consult --> */}
        <div className='profile-consult bg-white p-2'>
          <h2 className='text-primary'>Consultation</h2>
          <div>
            <p>
              <strong>Symptoms: </strong>
              {cons.symptoms}
            </p>
            <p>
              <strong>Affected Area: </strong>
              {cons.affected_area
                .map((area) => area.charAt(0).toUpperCase() + area.slice(1))
                .join(', ')}
            </p>
            <p>
              <strong>Additional Info: </strong>
              {cons.additional_info}
            </p>
            <p>
              <strong>Days Affected: </strong>
              {cons.days}
            </p>
            <p>
              <strong>Consulted On: </strong>
              <Moment format='Do MMM, YYYY'>{cons.consulted_on}</Moment>
            </p>
          </div>
        </div>

        {/* <!-- Checked --> */}
        <div className='profile-checked bg-white p-2'>
          <h2 className='text-primary'>Doctor Reply</h2>
          <div>
            <p>
              <strong>Diagnosis: </strong>
              {reply.diagnosis}
            </p>
            <p>
              <strong>Prescription: </strong>
              {reply.prescription
                .map((pre) => pre.charAt(0).toUpperCase() + pre.slice(1))
                .join(', ')}
            </p>
            <p>
              <strong>Result: </strong>
              {reply.result}
            </p>
            <p>
              <strong>Status: </strong>
              {reply.status}
            </p>
            <p>
              <strong>Checked On: </strong>
              <Moment format='Do MMM, YYYY'>{reply.checked_on}</Moment>
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

ViewConsult.propTypes = {
  consultations: PropTypes.array,
  replies: PropTypes.array,
  patient: PropTypes.object,
};

const mapStateToProps = (state) => ({
  consultations: state.auth.user.consultations,
  replies: state.auth.user.doctorReply,
  patient: state.auth.user.patient,
});

export default connect(mapStateToProps)(withRouter(ViewConsult));
