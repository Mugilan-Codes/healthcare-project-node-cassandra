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
// @desc    List all Table Details
// @access  Public
router.get('/', async (req, res) => {
  try {
    const listAdmins = (await client.execute('SELECT * FROM admin')).rows;
    const listPatients = (await client.execute('SELECT * FROM patient')).rows;
    const listDoctors = (await client.execute('SELECT * FROM doctor')).rows;
    console.log(listAdmins);
    console.log(listPatients);
    console.log(listDoctors);
    res.json({ listAdmins, listPatients, listDoctors });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/health/patient/register
// @desc    Register Patient
// @access  Public
router.post('/patient/register', async (req, res) => {
  const { name, email, addr, dob, gender, phno, pwd } = req.body;
  try {
    const id = uuid.random();

    // const registerQueries = [
    //   {
    //     query:
    //       'INSERT INTO patient_sign_up ( name, gender, dob, addr, email, phno, pwd ) VALUES ( ?, ?, ?, ?, ?, ?, ? ) ;',
    //     params: [name, gender, dob, addr, email, phno, pwd],
    //   },
    //   {
    //     query: 'INSERT INTO patient_sign_in ( email, pwd ) VALUES ( ?, ? ) ;',
    //     params: [email, pwd],
    //   },
    //   {
    //     query: 'INSERT INTO patient_id ( name, id ) VALUES ( ?, ? ) ;',
    //     params: [name, id],
    //   },
    // ];
    // await client.batch(registerQueries, { prepare: true });
    const getPatientDetail = (
      await client.execute('SELECT * FROM patient WHERE email = ?', [email], {
        prepare: true,
      })
    ).rows[0];
    const isPatientNotExist =
      typeof getPatientDetail === 'undefined' ||
      getPatientDetail.email !== email;
    console.log(isPatientNotExist);

    if (isPatientNotExist) {
      const registerQuery =
        'INSERT INTO patient ( id, name, email, addr, dob, gender, phno, pwd ) VALUES ( ?, ?, ?, ?, ?, ?, ?, ? ) ;';
      const params = [id, name, email, addr, dob, gender, phno, pwd];
      await client.execute(registerQuery, params, { prepare: true });

      const returnEmail = (
        await client.execute('SELECT * FROM patient WHERE email = ?', [email], {
          prepare: true,
        })
      ).rows[0];

      return res.json(returnEmail.email);
    }

    res.json(getPatientDetail);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

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
