const cassandra = require('cassandra-driver');
const express = require('express');
const router = express.Router();
const uuid = cassandra.types.Uuid;
const { check, validationResult } = require('express-validator');

const client = new cassandra.Client({
  contactPoints: ['localhost'],
  localDataCenter: 'datacenter1',
  keyspace: 'healthcare',
});
client.connect();

const admin = require('../../middleware/admin');
const auth = require('../../middleware/auth');
const doctor = require('../../middleware/doctor');

// @route   GET api/health
// @desc    Test Route
// @access  Public
router.get('/', (req, res) => {
  res.send('api/health Route');
});

// @route   GET api/health/admin
// @desc    List all Table Details
// @access  Private
router.get('/admin', admin, async (req, res) => {
  try {
    const currentAdmin = (
      await client.execute(
        'SELECT name, email, id FROM admin WHERE email = ?',
        [req.email],
        { prepare: true }
      )
    ).rows;
    const listAdmins = (await client.execute('SELECT name, email FROM admin'))
      .rows;
    const listPatients = (await client.execute('SELECT * FROM patient')).rows;
    const listDoctors = (await client.execute('SELECT * FROM doctor')).rows;
    const listAppointments = (
      await client.execute('SELECT * FROM book_appointment')
    ).rows;

    res.json({
      currentAdmin,
      listAdmins,
      listPatients,
      listDoctors,
      listAppointments,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/health/admin/login
// @desc    Login Admin
// @access  Public
router.post(
  '/admin/login',
  [
    check('email', 'Please Include Email').isEmail(),
    check('pwd', 'Password is Required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, pwd } = req.body;
    try {
      const getAdminDetail = (
        await client.execute('SELECT * FROM admin WHERE email = ?', [email], {
          prepare: true,
        })
      ).rows[0];

      const isNotAdmin =
        typeof getAdminDetail === 'undefined' || getAdminDetail.email !== email;

      if (isNotAdmin) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const getPwd = getAdminDetail.pwd;
      if (getPwd !== pwd) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      res.json({ token: getAdminDetail.id });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   POST api/health/patient/register
// @desc    Register Patient
// @access  Public
router.post(
  '/patient/register',
  [
    check('name', 'Patient Name is required').not().isEmpty(),
    check('email', 'Please Include a Email').isEmail(),
    check('pwd', 'Password must be atleast 6 characters long').isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, addr, dob, gender, phno, pwd } = req.body;
    try {
      const id = uuid.random();

      const getPatientDetail = (
        await client.execute('SELECT * FROM patient WHERE email = ?', [email], {
          prepare: true,
        })
      ).rows[0];
      const isPatientNotExist =
        typeof getPatientDetail === 'undefined' ||
        getPatientDetail.email !== email;

      if (!isPatientNotExist) {
        return res.status(400).json({ errors: [{ msg: 'Patient Exists' }] });
      }

      const registerQuery =
        'INSERT INTO patient ( id, name, email, addr, dob, gender, phno, pwd ) VALUES ( ?, ?, ?, ?, ?, ?, ?, ? ) ;';
      const params = [id, name, email, addr, dob, gender, phno, pwd];
      await client.execute(registerQuery, params, { prepare: true });

      const returnId = (
        await client.execute('SELECT * FROM patient WHERE email = ?', [email], {
          prepare: true,
        })
      ).rows[0].id;

      res.json({ token: returnId });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   GET api/health/patient
// @desc    Get Auth Patient
// @access  Private
router.get('/patient', auth, async (req, res) => {
  try {
    const getAllDoctors = (
      await client.execute('SELECT d_id ,d_name, spec FROM doctor')
    ).rows;
    const patient = (
      await client.execute(
        'SELECT * FROM patient WHERE email = ?',
        [req.email],
        { prepare: true }
      )
    ).rows[0];
    const bookedAppointments = (
      await client.execute(
        'SELECT b_id, d_name, spec, doa, time FROM book_appointment WHERE p_id = ? ALLOW FILTERING',
        [req.id],
        { prepare: true }
      )
    ).rows;

    res.json({ patient, getAllDoctors, bookedAppointments });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/health/patient/login
// @desc    Login Patient
// @access  Public
router.post(
  '/patient/login',
  [
    check('email', 'Please Include Email').isEmail(),
    check('pwd', 'Password is Required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, pwd } = req.body;
    try {
      const getPatientDetail = (
        await client.execute('SELECT * FROM patient WHERE email = ?', [email], {
          prepare: true,
        })
      ).rows[0];

      const isPatientNotExist =
        typeof getPatientDetail === 'undefined' ||
        getPatientDetail.email !== email;

      if (isPatientNotExist) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const getPwd = getPatientDetail.pwd;
      if (getPwd !== pwd) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      res.json({ token: getPatientDetail.id });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   POST api/health/doctor/register
// @desc    Register Doctor
// @access  Public
router.post(
  '/doctor/register',
  [
    check('d_name', 'Doctor Name is required').not().isEmpty(),
    check('spec', 'Specialization of the Doctor is required').not().isEmpty(),
    check('email', 'Please Include a Email').isEmail(),
    check('pwd', 'Password must be atleast 6 characters long').isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { d_name, spec, email, pwd } = req.body;
    try {
      const d_id = uuid.random();

      const getDoctorDetail = (
        await client.execute('SELECT * FROM doctor WHERE email = ?', [email], {
          prepare: true,
        })
      ).rows[0];
      const isDoctorNotExist =
        typeof getDoctorDetail === 'undefined' ||
        getDoctorDetail.email !== email;

      if (!isDoctorNotExist) {
        return res.status(400).json({ errors: [{ msg: 'Doctor Exists' }] });
      }

      const registerDoctor =
        'INSERT INTO doctor ( d_id, d_name, spec, email, pwd ) VALUES ( ?, ?, ?, ?, ? ) ;';
      const params = [d_id, d_name, spec, email, pwd];
      await client.execute(registerDoctor, params, { prepare: true });

      const returnId = (
        await client.execute('SELECT * FROM doctor WHERE email = ?', [email], {
          prepare: true,
        })
      ).rows[0].d_id;

      res.json({ token: returnId });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   GET api/health/doctor
// @desc    Get Auth Doctor
// @access  Private
router.get('/doctor', doctor, async (req, res) => {
  try {
    const doctor = (
      await client.execute(
        'SELECT * FROM doctor WHERE email = ?',
        [req.email],
        { prepare: true }
      )
    ).rows[0];
    const appointments = (
      await client.execute(
        'SELECT b_id, name, email, doa, time FROM book_appointment WHERE d_id = ? ALLOW FILTERING',
        [doctor.d_id],
        { prepare: true }
      )
    ).rows;

    res.json({ doctor, appointments });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/health/doctor/login
// @desc    Login Doctor
// @access  Public
router.post(
  '/doctor/login',
  [
    check('email', 'Please Include Email').isEmail(),
    check('pwd', 'Password is Required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, pwd } = req.body;
    try {
      const getDoctorDetail = (
        await client.execute('SELECT * FROM doctor WHERE email = ?', [email], {
          prepare: true,
        })
      ).rows[0];

      const isNotDoctor =
        typeof getDoctorDetail === 'undefined' ||
        getDoctorDetail.email !== email;

      if (isNotDoctor) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const getPwd = getDoctorDetail.pwd;
      if (getPwd !== pwd) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      res.json({ token: getDoctorDetail.d_id });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   POST api/health/book/:d_id
// @desc    Book Appointment for Patient with Doctor
// @access  Private
router.post(
  '/book/:d_id',
  [auth, [check('doa', 'Date of Appointment is required').isISO8601()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { doa } = req.body;
    try {
      const b_id = uuid.random();

      const getDoctor = (
        await client.execute(
          'SELECT d_id, d_name, spec FROM doctor WHERE d_id = ? ALLOW FILTERING',
          [req.params.d_id],
          { prepare: true }
        )
      ).rows[0];

      const isNotDoctor = typeof getDoctor === 'undefined';
      if (isNotDoctor) {
        return res.status(400).json({ msg: 'Doctor not found' });
      }
      const { d_id, d_name, spec } = getDoctor;

      // Patient can't have more than One appointment on the same day
      const checkForDuplicate = (
        await client.execute(
          'SELECT * FROM book_appointment WHERE p_id = ? AND doa = ? ALLOW FILTERING',
          [req.id, doa],
          { prepare: true }
        )
      ).rows[0];
      if (checkForDuplicate)
        return res.status(400).json({ msg: 'Already Booked' });

      await client.execute(
        'INSERT INTO book_appointment ( b_id, p_id, name, email, d_id, d_name, doa, time, spec ) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ? ) ;',
        [
          b_id,
          req.id,
          req.name,
          req.email,
          d_id,
          d_name,
          doa,
          new Date(),
          spec,
        ],
        { prepare: true }
      );

      res.json({
        patient: { id: req.id, name: req.name },
        doctor: { id: d_id, name: d_name, specialization: spec },
        appoinment_date: doa,
        message: `${req.name}, Your appointment is booked with Doctor ${d_name}(${spec}) on ${doa}`,
      });
    } catch (err) {
      console.error(err.message);
      if (err.name === 'TypeError') {
        return res.status(400).json({ msg: 'Doctor not found' });
      }
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
