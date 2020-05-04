import axios from 'axios';

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  RELOAD_USER,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  PATIENT,
  DOCTOR,
  LOGOUT,
} from './types';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';

// Load Patient
export const loadPatient = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/health/patient');

    dispatch({
      type: USER_LOADED,
      payload: res.data,
      // role: PATIENT,
    });
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};

// Register Patient
export const register = ({
  name,
  email,
  addr,
  dob,
  gender,
  phno,
  pwd,
}) => async (dispatch) => {
  const config = { headers: { 'Content-Type': 'application/json' } };

  const newPatient = { name, email, addr, dob, gender, phno, pwd };

  const body = JSON.stringify(newPatient);

  try {
    const res = await axios.post('/api/health/patient/register', body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
      role: PATIENT,
    });

    dispatch(loadPatient());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({ type: REGISTER_FAIL });
  }
};

// Login Patient
export const login = (email, pwd) => async (dispatch) => {
  const config = { headers: { 'Content-Type': 'application/json' } };

  const loginPatient = { email, pwd };

  const body = JSON.stringify(loginPatient);

  try {
    const res = await axios.post('/api/health/patient/login', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
      role: PATIENT,
    });

    dispatch(loadPatient());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    console.error(err.message);
    dispatch({ type: LOGIN_FAIL });
  }
};

// Load Doctor
export const loadDoctor = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/health/doctor');

    dispatch({
      type: USER_LOADED,
      payload: res.data,
      // role: DOCTOR,
    });
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};

// Register Doctor
export const doctorRegister = ({ d_name, spec, email, pwd }) => async (
  dispatch
) => {
  const config = { headers: { 'Content-Type': 'application/json' } };

  const newDoctor = { d_name, spec, email, pwd };

  const body = JSON.stringify(newDoctor);

  try {
    const res = await axios.post('/api/health/doctor/register', body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
      role: DOCTOR,
    });

    dispatch(loadDoctor());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({ type: REGISTER_FAIL });
  }
};

// Login Doctor
export const doctorLogin = (email, pwd) => async (dispatch) => {
  const config = { headers: { 'Content-Type': 'application/json' } };

  const loginDoctor = { email, pwd };

  const body = JSON.stringify(loginDoctor);

  try {
    const res = await axios.post('/api/health/doctor/login', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
      role: DOCTOR,
    });

    dispatch(loadDoctor());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({ type: LOGIN_FAIL });
  }
};

// Logout
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};

// Book Appointment
export const bookAppointment = (d_id, doa, history) => async (dispatch) => {
  const config = { headers: { 'Content-Type': 'application/json' } };

  const book = { doa };

  const body = JSON.stringify(book);

  try {
    const res = await axios.post(`/api/health/book/${d_id}`, body, config);

    dispatch({
      type: RELOAD_USER,
      payload: res.data,
    });

    dispatch(loadPatient());

    dispatch(setAlert('Appointment Booked', 'success'));

    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    const msg = err.response.data.msg;
    dispatch(setAlert(msg, 'danger'));
    // dispatch({ type: AUTH_ERROR });
  }
};

// Consult Doctor

// Check Patient
