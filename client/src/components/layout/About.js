import React, { Fragment } from 'react';

const About = () => {
  return (
    <Fragment>
      <div className='about'>
        <h1 className='large text-primary'>About Developers</h1>
        <p className='lead'>
          <i className='las la-code'></i> This project is made using{' '}
          <a
            href='https://cassandra.apache.org/'
            target='_blank'
            rel='noopener noreferrer'
          >
            CassandraDB
          </a>
          ,{' '}
          <a
            href='https://expressjs.com/'
            target='_blank'
            rel='noopener noreferrer'
          >
            ExpressJS
          </a>
          ,{' '}
          <a
            href='https://reactjs.org/'
            target='_blank'
            rel='noopener noreferrer'
          >
            ReactJS
          </a>
          ,{' '}
          <a
            href='https://nodejs.org/en/'
            target='_blank'
            rel='noopener noreferrer'
          >
            NodeJS
          </a>
        </p>

        <p className='link'>
          <a
            className='btn btn-primary my-1'
            href='https://github.com/Mugilan-Codes/healthcare-project-node-cassandra'
            target='_blank'
            rel='noopener noreferrer'
          >
            Link To Repo
          </a>
        </p>

        <div className='profiles'>
          <div className='profile dev bg-light'>
            <img
              className='round-img'
              src='https://ui-avatars.com/api/?name=Mugilan&size=200'
              alt='img'
            />

            <div>
              <h2>Mugilan</h2>
              <p>mugilancodes@gmail.com</p>
              <p>Coder</p>
            </div>

            <ul>
              <li>
                <a
                  href='https://www.linkedin.com/in/mugilan-codes/'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <i className='lab la-linkedin la-2x'></i>
                </a>
              </li>
              <li className='hide-sm'>
                <a
                  href='https://www.instagram.com/mugilancodes/'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <i className='lab la-instagram la-2x'></i>
                </a>
              </li>
              <li>
                <a
                  href='https://github.com/Mugilan-Codes'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <i className='lab la-github la-2x'></i>
                </a>
              </li>
            </ul>
          </div>

          <div className='profile dev bg-light'>
            <img
              className='round-img'
              src='https://ui-avatars.com/api/?name=Nivethithaaa&size=200'
              alt='img'
            />

            <div>
              <h2>Nivethithaa</h2>
              <p>nivethithaaathithan75@gmail.com</p>
              <p>Database</p>
            </div>

            <ul>
              <li>
                <a
                  href='https://www.linkedin.com/in/nivethithaa-murugan-84ba4a194/'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <i className='lab la-linkedin la-2x'></i>
                </a>
              </li>
              <li className='hide-sm'>
                <a
                  href='https://www.instagram.com/krystelene_dizzona/'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <i className='lab la-instagram la-2x'></i>
                </a>
              </li>
              <li>
                <a
                  href='https://github.com/Nivethithaa-M'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <i className='lab la-github la-2x'></i>
                </a>
              </li>
            </ul>
          </div>

          <div className='profile dev bg-light'>
            <img
              className='round-img'
              src='https://ui-avatars.com/api/?name=Sasi-Kiran&size=200'
              alt='img'
            />

            <div>
              <h2>Sasi Kiran</h2>
              <p>sasikiran@gmail.com</p>
              <p>Database</p>
            </div>

            <ul>
              <li>
                <a href='#!' target='_blank' rel='noopener noreferrer'>
                  <i className='lab la-linkedin la-2x'></i>
                </a>
              </li>
              <li className='hide-sm'>
                <a href='#!' target='_blank' rel='noopener noreferrer'>
                  <i className='lab la-instagram la-2x'></i>
                </a>
              </li>
              <li>
                <a href='#!' target='_blank' rel='noopener noreferrer'>
                  <i className='lab la-github la-2x'></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default About;
