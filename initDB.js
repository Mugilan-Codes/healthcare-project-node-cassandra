const cassandra = require('cassandra-driver');

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
      'CREATE TABLE IF NOT EXISTS admin ( name text, email varchar PRIMARY KEY, pwd varchar ) ;';
    await client.execute(createAdminTable);
    // console.log('admin Table Created');

    // const createPatientSignUpTable =
    //   'CREATE TABLE IF NOT EXISTS patient_sign_up ( email varchar PRIMARY KEY, addr varchar, dob date, gender text, name text, phno int, pwd varchar ) ;';
    // await client.execute(createPatientSignUpTable);
    // console.log('patient_sign_up Table Created');
    // const createPatientSignInTable =
    //   'CREATE TABLE IF NOT EXISTS patient_sign_in ( email varchar PRIMARY KEY, pwd varchar ) ;';
    // await client.execute(createPatientSignInTable);
    // console.log('patient_sign_in Table Created');
    // const createPatientIDTable =
    //   'CREATE TABLE IF NOT EXISTS patient_id ( name text, id uuid, PRIMARY KEY ( name, id ) ) ;';
    // await client.execute(createPatientIDTable);
    // console.log('patient_id Table Created');

    const createPatientTable =
      'CREATE TABLE IF NOT EXISTS patient ( id uuid, name text, email varchar, addr varchar, dob date, gender text, phno int, pwd varchar, PRIMARY KEY ( email, id ) ) ;';
    await client.execute(createPatientTable);
    // console.log('patient Table Created');

    const createDoctorTable =
      'CREATE TABLE IF NOT EXISTS doctor ( d_id uuid, d_name text, email varchar, spec varchar, pwd varchar, PRIMARY KEY ( email, d_id ) ) ;';
    await client.execute(createDoctorTable);
    // console.log('doctor Table Created');

    // const createBookAppointmentTable =
    //   'CREATE TABLE IF NOT EXISTS book_appointment ( id uuid, name text, email varchar, docname text, doa date, time timestamp, spec varchar, PRIMARY KEY ( name, id ) );';
    // await client.execute(createBookAppointmentTable);
    // console.log('book_appointment Table Created');

    // const createConsultDoctorTable =
    //   'CREATE TABLE IF NOT EXISTS consult_doctor ( id uuid, name text, age int, docname text, gender text, status varchar, symp varchar, affarea list<varchar>, days int, distype varchar, spec varchar, addinfo varchar, PRIMARY KEY ( id, name ) ) ;';
    // await client.execute(createConsultDoctorTable);
    // console.log('consult_doctor Table Created');

    // const createCheckPatientTable =
    //   'CREATE TABLE IF NOT EXISTS check_patient ( id uuid, docname text, disname varchar, status varchar, result varchar, medicine set<varchar>, addinfo varchar, PRIMARY KEY ( id, docname ) ) ;';
    // await client.execute(createCheckPatientTable);
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
    console.log('admins added - Mugilan, Nive, Sasi');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = initDB;
