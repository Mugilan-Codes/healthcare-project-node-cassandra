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
    // @todo  Need More Work on Admin
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
    // @todo   Add More Checks for Registeration
    check('name', 'Patient Name is required').not().isEmpty(),
    check('dob', 'Date of Birth is required').not().isEmpty(),
    check('gender', 'Gender is required').not().isEmpty(),
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

    req.body.phno = Number(req.body.phno);
    if (req.body.phno === 0) {
      req.body.phno = null;
    }

    if (!req.body.addr || req.body.addr.trim().length === 0) {
      req.body.addr = null;
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
    const { id, name, email, addr, dob, gender, phno, pwd } = req;

    const getAllDoctors = (
      await client.execute('SELECT d_id ,d_name, spec FROM doctor')
    ).rows;

    const bookedAppointments = (
      await client.execute(
        'SELECT b_id, d_name, spec, doa, time FROM book_appointment WHERE p_id = ? ALLOW FILTERING',
        [id],
        { prepare: true }
      )
    ).rows;

    const consultations = (
      await client.execute(
        'SELECT * FROM consult_doctor WHERE p_id = ? ALLOW FILTERING',
        [id],
        { prepare: true }
      )
    ).rows;

    const doctorReply = (
      await client.execute(
        'SELECT * FROM check_patient WHERE p_id = ? ALLOW FILTERING',
        [id],
        { prepare: true }
      )
    ).rows;

    res.json({
      patient: { id, name, email, addr, dob, gender, phno, pwd },
      getAllDoctors,
      bookedAppointments,
      consultations,
      doctorReply,
    });
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
  const { d_id, d_name, email, spec, pwd } = req;

  try {
    const appointments = (
      await client.execute(
        'SELECT b_id, name, email, doa, time FROM book_appointment WHERE d_id = ? ALLOW FILTERING',
        [d_id],
        { prepare: true }
      )
    ).rows;

    const consultations = (
      await client.execute(
        'SELECT c_id, p_id, name, age, gender, symptoms, affected_area, additional_info, days, consulted_on, cp_id FROM consult_doctor WHERE d_id = ? ALLOW FILTERING',
        [d_id],
        { prepare: true }
      )
    ).rows;

    res.json({
      doctor: { d_id, d_name, email, spec, pwd },
      appointments,
      consultations,
    });
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

// @route   POST api/health/consult/:d_id
// @desc    Consult Doctor
// @access  Private
router.post(
  '/consult/:d_id',
  [
    auth,
    [
      check('symptoms', 'Enter Your Symptoms').not().isEmpty(),
      check('affected_area', 'Enter the Affected Area').not().isEmpty(),
      check('additional_info', 'Need Some Additional Info').not().isEmpty(),
      check('days', 'Number of Days Affected (Number)').isNumeric(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    req.body.affected_area = req.body.affected_area
      .split(',')
      .map((area) => area.trim());

    const {
      body: { symptoms, affected_area, additional_info, days },
      email,
      name,
      id,
      dob: { date }, // To Calculate Age of the Patient
      gender,
    } = req;

    const calculateAge = (dateString) => {
      let today = new Date();
      let birthDate = new Date(dateString);
      let age = today.getFullYear() - birthDate.getFullYear();
      let m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    };
    const age = calculateAge(date);

    try {
      const c_id = uuid.random();

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

      const consulted_on = new Date();

      const checkForDuplicate = (
        await client.execute(
          'SELECT * FROM consult_doctor WHERE p_id = ? AND consulted_on = ? ALLOW FILTERING',
          [id, consulted_on],
          { prepare: true }
        )
      ).rows[0];
      if (checkForDuplicate)
        return res.status(400).json({ msg: 'Already Consulted' });

      await client.execute(
        'INSERT INTO consult_doctor ( c_id, p_id, name, age, gender, d_id, d_name, spec, symptoms, affected_area, additional_info, days, consulted_on ) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ) ;',
        [
          c_id,
          id,
          name,
          age,
          gender,
          d_id,
          d_name,
          spec,
          symptoms,
          affected_area,
          additional_info,
          days,
          consulted_on,
        ],
        { prepare: true }
      );

      res.json({
        c_id,
        patient: { id, name, age, gender },
        doctor: { id: d_id, name: d_name, specialization: spec },
        description: { symptoms, affected_area, additional_info, days },
        consulted_on,
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

// @route   POST api/health/check/:c_id
// @desc    Check Patient
// @access  Private
router.post(
  '/check/:c_id',
  [
    doctor,
    [
      check('diagnosis', 'Diagnosis is Required').not().isEmpty(),
      check('prescription', 'Give Prescription').not().isEmpty(),
      check('result', 'Result is required').not().isEmpty(),
      check('status', 'Status is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    req.body.prescription = req.body.prescription
      .split(',')
      .map((area) => area.trim());

    const {
      body: { diagnosis, prescription, result, status },
      d_id,
      params: { c_id },
    } = req;

    try {
      const cp_id = uuid.random();

      let getConsultation = (
        await client.execute(
          'SELECT * FROM consult_doctor WHERE c_id = ? ALLOW FILTERING',
          [c_id],
          { prepare: true }
        )
      ).rows[0];
      const isNotConsultation = typeof getConsultation === 'undefined';
      if (isNotConsultation) {
        return res.status(400).json({ msg: 'Consultation Request Not Found' });
      }

      const { p_id } = getConsultation;

      const checked_on = new Date();

      const checkForDuplicate = (
        await client.execute(
          'SELECT * FROM check_patient WHERE c_id = ? ALLOW FILTERING',
          [c_id],
          { prepare: true }
        )
      ).rows[0];
      if (checkForDuplicate)
        return res.status(400).json({ msg: 'Already Checked Patient' });

      await client.execute(
        'INSERT INTO check_patient ( cp_id, c_id, p_id, d_id, diagnosis, prescription, result, status, checked_on ) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ? ) ;',
        [
          cp_id,
          c_id,
          p_id,
          d_id,
          diagnosis,
          prescription,
          result,
          status,
          checked_on,
        ],
        { prepare: true }
      );
      await client.execute(
        'UPDATE consult_doctor SET cp_id = ? WHERE c_id = ? AND p_id = ? AND d_id = ?',
        [cp_id, c_id, p_id, d_id],
        { prepare: true }
      );

      getConsultation = (
        await client.execute(
          'SELECT * FROM consult_doctor WHERE c_id = ? ALLOW FILTERING',
          [c_id],
          { prepare: true }
        )
      ).rows[0];

      res.json({
        getConsultation,
        cp_id,
        diagnosis,
        prescription,
        result,
        status,
        checked_on,
      });
    } catch (err) {
      console.error(err.message);
      if (err.name === 'TypeError') {
        return res.status(400).json({ msg: 'Consultation Request Not Found' });
      }
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
