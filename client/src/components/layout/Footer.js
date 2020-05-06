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
          <Link to='/admin'>Admin</Link>
        </li>
        <li>
          <Link to='/news'>News</Link>
        </li>
        <li>
          <Link to='/about'>About</Link>
        </li>
      </ul>
      <span>Copyright 2019-2022, HealthCare 360</span>
    </footer>
  );
};

export default Footer;
