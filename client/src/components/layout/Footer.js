import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='bg-dark'>
      <ul>
        <li>
          <Link to='/'>Patient</Link>
        </li>
        <li>
          <Link to='/doctor'>Doctor</Link>
        </li>
        <li className='hide-sm'>
          <Link to='#!'>Admin</Link>
        </li>
        <li>
          <Link to='#!'>News</Link>
        </li>
        <li>
          <Link to='#!'>About</Link>
        </li>
      </ul>
      <span>Copyright 1999-2020, MugilanCodes</span>
    </footer>
  );
};

export default Footer;
