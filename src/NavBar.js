import React from 'react';
import { Link } from 'react-router-dom';
import './nav_styles.css';

const NavBar = () => {
  return (
    <nav>
      <ul className='links'>
        <li>
          <Link to="/">Games</Link>
        </li>
        <li>
          <Link to="/Simulation">Simulation</Link>
        </li>
        {/* Add more navigation items as needed */}
      </ul>
    </nav>
  );
};

export default NavBar;