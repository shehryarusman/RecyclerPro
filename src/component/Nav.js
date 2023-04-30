import React from 'react';
import { Link } from 'react-router-dom';
import '../Nav.css';

function Nav() {
  return (
    <div>
      <nav className="nav">
        <ul>
          <li className="nav-item-l">
            <Link to="/home">Home</Link>
          </li>
          <li className="nav-item-center">
            <Link to="/news">News</Link>
          </li>
          <li className="nav-item-r">
            <Link to="/detect">Detect Trash</Link>
          </li>
          <li className="nav-item-r">
            <Link to="/product">Product Page</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Nav;
