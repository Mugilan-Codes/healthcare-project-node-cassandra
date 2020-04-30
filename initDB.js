const cassandra = require('cassandra-driver');
const uuid = cassandra.types.Uuid;

const initDB = async () => {
  try {
    // Initialize Keyspace and Empty Tables
    const client = new cassandra.Client({
      contactPoints: ['localhost'],
      localDataCenter: 'datacenter1',
    });
    await client.connect();
    console.log('Connected to Cassandra');

    const createKeyspace =
      "CREATE KEYSPACE IF NOT EXISTS healthcare WITH replication = {'class': 'SimpleStrategy', 'replication_factor': '1' } ;";
    await client.execute(createKeyspace);
    // console.log('healthcare Keyspace Created');

    const useKeyspace = 'USE healthcare ;';
    await client.execute(useKeyspace);
    // console.log('Use healthcare Keyspace');

    const createAdminTable =
      'CREATE TABLE IF NOT EXISTS admin ( id uuid, name text, email varchar PRIMARY KEY, pwd varchar ) ;';
    await client.execute(createAdminTable);
    // console.log('admin Table Created');

    const createPatientTable =
      'CREATE TABLE IF NOT EXISTS patient ( id uuid, name text, email varchar, addr varchar, dob date, gender text, phno int, pwd varchar, PRIMARY KEY ( email, id ) ) ;';
    await client.execute(createPatientTable);
    // console.log('patient Table Created');

    const createDoctorTable =
      'CREATE TABLE IF NOT EXISTS doctor ( d_id uuid, d_name text, email varchar, spec varchar, pwd varchar, PRIMARY KEY ( email, d_id ) ) ;';
    await client.execute(createDoctorTable);
    // console.log('doctor Table Created');

    const createBookAppointmentTable =
      'CREATE TABLE IF NOT EXISTS book_appointment ( b_id uuid, p_id uuid, name text, email varchar, d_id uuid, d_name text, doa date, time timestamp, spec varchar, PRIMARY KEY ( ( p_id, d_id ), b_id ) );';
    await client.execute(createBookAppointmentTable);
    // console.log('book_appointment Table Created');

    const createConsultDoctorTable =
      'CREATE TABLE IF NOT EXISTS consult_doctor ( c_id uuid, p_id uuid, name text, age int, gender text, d_id uuid, d_name text, spec varchar, symptoms varchar, affected_area list<varchar>, additional_info varchar, days int, consulted_on date, cp_id uuid, PRIMARY KEY ( ( p_id, d_id ), c_id ) ) ;';
    await client.execute(createConsultDoctorTable);
    // console.log('consult_doctor Table Created');

    const createCheckPatientTable =
      'CREATE TABLE IF NOT EXISTS check_patient ( cp_id uuid, c_id uuid, diagnosis varchar, prescription list<varchar>, result varchar, status varchar, checked_on date, PRIMARY KEY ( cp_id, c_id ) ) ;';
    await client.execute(createCheckPatientTable);
    // console.log('check_patient Table Created');

    // const createFeedbackTable =
    //   'CREATE TABLE IF NOT EXISTS feedback ( id uuid, name text, email varchar, revmsg varchar, exp varchar, response varchar, support varchar, satisfac map<text,int>, rating int, extfeed varchar, PRIMARY KEY ( id, name ) ) ;';
    // await client.execute(createFeedbackTable);
    // console.log('feedback Table Created');

    const admins = [
      {
        query: 'INSERT INTO admin ( email, name, pwd ) values( ?, ?, ? ) ;',
        params: ['mugilan@health.com', 'Mugilan', 'mugilan'],
      },
      {
        query: 'INSERT INTO admin ( email, name, pwd ) values( ?, ?, ? ) ;',
        params: ['nive@health.com', 'Nivethithaa', 'nive'],
      },
      {
        query: 'INSERT INTO admin ( email, name, pwd ) values( ?, ?, ? ) ;',
        params: ['sasi@health.com', 'Sasi Kiran', 'sasi'],
      },
    ];
    await client.batch(admins, { prepare: true });

    for (let i = 0; i < Object.keys(admins).length; i++) {
      let getAdmin = (await client.execute('SELECT * FROM admin')).rows[i];
      // console.log(getAdmin.id);
      if (getAdmin.id === null) {
        await client.execute(
          'UPDATE admin SET id = ? WHERE email = ?',
          [uuid.random(), getAdmin.email],
          { prepare: true }
        );
      }
    }
    // console.log('admins added - Mugilan, Nive, Sasi');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = initDB;
