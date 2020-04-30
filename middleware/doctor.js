const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
  contactPoints: ['localhost'],
  localDataCenter: 'datacenter1',
  keyspace: 'healthcare',
});
client.connect();

module.exports = async (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ msg: 'No Token, Authorization denied' });
  }

  try {
    const decoded = (
      await client.execute(
        'SELECT * FROM doctor WHERE d_id = ? ALLOW FILTERING',
        [token],
        {
          prepare: true,
        }
      )
    ).rows[0];
    // console.log(`decoded = ${JSON.stringify(decoded)}`);
    req.d_name = decoded.d_name;
    req.email = decoded.email;
    req.d_id = decoded.d_id;
    req.spec = decoded.spec;
    req.pwd = decoded.pwd;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is Invalid' });
  }
};
