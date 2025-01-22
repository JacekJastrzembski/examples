import React, { useState } from 'react';
import './navbar.css';
import { NavLink } from 'react-router-dom'

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <NavLink to="/" className="navbar-logo">
          SpaceX Rockets
        </NavLink>
        <button className="menu-toggle" onClick={toggleMenu}>
          <span className="menu-icon"></span>
          <span className="menu-icon"></span>
          <span className="menu-icon"></span>
        </button>
        <ul className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <li className="navbar-item">
            <NavLink to="/" className={({ isActive }: { isActive: boolean }) => isActive ? 'navbar-link active' : 'navbar-link'}>
              Home
            </NavLink>
          </li>
          <li className="navbar-item">
            <NavLink to="/rockets" className={({ isActive }: { isActive: boolean })=> isActive ? 'navbar-link active' : 'navbar-link'}>
              Rocket List
            </NavLink>
          </li>
          <li className="navbar-item">
            <NavLink to="/ships" className={({ isActive }: { isActive: boolean })=> isActive ? 'navbar-link active' : 'navbar-link'}>
              Ship List
            </NavLink>
          </li>
          <li className="navbar-item">
            <NavLink to="/launches" className={({ isActive }: { isActive: boolean }) => isActive ? 'navbar-link active' : 'navbar-link'}>
              Launches
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;