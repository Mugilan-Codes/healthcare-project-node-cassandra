const cassandra = require('cassandra-driver');
const express = require('express');
const router = express.Router();

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

module.exports = router;
