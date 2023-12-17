import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="navbar navbar-dark bg-dark">
      <div className="container">
        <a className="navbar-brand" href="/">
          Your Logo
        </a>
      </div>
    </header>
  );
};

export default Header;
