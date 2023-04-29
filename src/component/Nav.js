import React from 'react';
import { Link } from 'react-router-dom';
import '../Nav.css';

function Nav() {
  return (
    <div>
      <nav className="fill">
        <ul>
          <li className="nav-item-l">
            <Link to="/news">News</Link>
          </li>
          <li className="nav-item-center">
            <Link to="/">DonationHub</Link>
          </li>
          <li className="nav-item-r">
            <Link to="/donatepage">Donate</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Nav;
