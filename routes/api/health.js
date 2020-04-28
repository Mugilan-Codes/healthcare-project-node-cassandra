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

// @route   GET api/health
// @desc    List all Table Details
// @access  Public
router.get('/', async (req, res) => {
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

      if (isPatientNotExist) {
        const registerQuery =
          'INSERT INTO patient ( id, name, email, addr, dob, gender, phno, pwd ) VALUES ( ?, ?, ?, ?, ?, ?, ?, ? ) ;';
        const params = [id, name, email, addr, dob, gender, phno, pwd];
        await client.execute(registerQuery, params, { prepare: true });

        const returnEmail = (
          await client.execute(
            'SELECT * FROM patient WHERE email = ?',
            [email],
            {
              prepare: true,
            }
          )
        ).rows[0].email;

        return res.json(returnEmail);
      }

      res.status(400).json({ errors: [{ msg: 'Patient Exists' }] });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   POST api/health/patient/login
// @desc    Login Patient
// @access  Public
router.post('/patient/login', async (req, res) => {
  const { email, pwd } = req.body;
  try {
    const query = `SELECT * FROM patient_sign_in WHERE email = ?`;
    const getPwd = await (
      await client.execute(query, [email], { prepare: true })
    ).rows[0].pwd;

    if (getPwd !== pwd) {
      return res.json('User Not Found');
    }
    res.json(getPwd);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
