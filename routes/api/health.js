const cassandra = require('cassandra-driver');
const express = require('express');
const router = express.Router();

const uuid = cassandra.types.Uuid;

const client = new cassandra.Client({
  contactPoints: ['localhost'],
  localDataCenter: 'datacenter1',
  keyspace: 'healthcare',
});
client.connect();

// @route   GET api/health
// @desc    Test Route
// @access  Public
router.get('/', (req, res) => {
  res.send('Api Health Route');
});

// @route   POST api/health/register
// @desc    Register Patient
// @access  Public
router.post('/register', async (req, res) => {
  const { email, addr, dob, gender, name, phno, pwd } = req.body;
  try {
    const id = uuid.random();
    const registerQueries = [
      {
        query:
          'INSERT INTO patient_sign_up ( name, gender, dob, addr, email, phno, pwd ) VALUES ( ?, ?, ?, ?, ?, ?, ? ) ;',
        params: [name, gender, dob, addr, email, phno, pwd],
      },
      {
        query: 'INSERT INTO patient_sign_in ( email, pwd ) VALUES ( ?, ? ) ;',
        params: [email, pwd],
      },
      {
        query: 'INSERT INTO patient_id ( name, id ) VALUES ( ?, ? ) ;',
        params: [name, id],
      },
    ];
    await client.batch(registerQueries, { prepare: true });
    res.send('Patient Registered');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
