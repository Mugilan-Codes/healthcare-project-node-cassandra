import axios from 'axios';

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
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
    const res = await axios.get('/patient');

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
    const res = await axios.post('/patient/register', body, config);

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
    const res = await axios.post('/patient/login', body, config);

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

    dispatch({ type: LOGIN_FAIL });
  }
};

// Load Doctor
export const loadDoctor = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/doctor');

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
    const res = await axios.post('/doctor/register', body, config);

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
    const res = await axios.post('/doctor/login', body, config);

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

// // Get Total Patients, Doctors & Admins in Doctor Landing Page
// export const getTotal = () => async (dispatch) => {
//   try {
//     const res = await axios.get('/total');

//     console.log(res);
//   } catch (err) {
//     console.error(err.message);
//   }
// };
