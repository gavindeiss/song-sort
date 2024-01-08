import React from 'react';
import './Header.css';
import logoImage from './logo.png'; // Import the image

const Header = () => {
  return (
    <header className="Header navbar navbar-dark bg-dark">
      <div className="container">
        <div className="logo-container">
          <a className="navbar-brand" href="/">
            <img src={logoImage} alt="Your Logo" style={{ maxWidth: '20%', height: 'auto' }} />
          </a>
          <span className="logo-text">Spotify Song Sort</span>
        </div>
      </div>
    </header>
  );
};

export default Header;