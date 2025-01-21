import React, { useState } from 'react';
import './navbar.css';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="/" className="navbar-logo">
          SpaceX Rockets
        </a>
        <button className="menu-toggle" onClick={toggleMenu}>
          <span className="menu-icon"></span>
          <span className="menu-icon"></span>
          <span className="menu-icon"></span>
        </button>
        <ul className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <li className="navbar-item">
            <a href="/" className="navbar-link">
              Home
            </a>
          </li>
          <li className="navbar-item">
            <a href="/rockets" className="navbar-link">
              Rocket List
            </a>
          </li>
          <li className="navbar-item">
            <a href="/ships" className="navbar-link">
              Ship List
            </a>
          </li>
          <li className="navbar-item">
            <a href="/launches" className="navbar-link">
              Launches
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;