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

// @route   GET api/health
// @desc    List all Table Details
// @access  Public
router.get('/', admin, async (req, res) => {
  try {
    const listAdmins = (await client.execute('SELECT * FROM admin')).rows;
    const listPatients = (await client.execute('SELECT * FROM patient')).rows;
    const listDoctors = (await client.execute('SELECT * FROM doctor')).rows;
    res.json({ listAdmins, listPatients, listDoctors });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

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

// @route   POST api/health/patient
// @desc    Get Auth Patient
// @access  Private
router.get('/patient', auth, async (req, res) => {
  try {
    const patient = (
      await client.execute(
        'SELECT * FROM patient WHERE email = ?',
        [req.email],
        { prepare: true }
      )
    ).rows[0];
    res.json(patient);
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

module.exports = router;
