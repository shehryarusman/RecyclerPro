import React from 'react';
import { Link } from 'react-router-dom';
import '../Nav.css';

function Nav() {
  return (
    <div>
      <nav className="fill">
        <ul>
          <li className="nav-item-l">
            <Link to="/login">Login</Link>
          </li>
          <li className="nav-item-center">
            <Link to="/home">Main Page</Link>
          </li>
          <li className="nav-item-r">
            <Link to="/new">News</Link>
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
