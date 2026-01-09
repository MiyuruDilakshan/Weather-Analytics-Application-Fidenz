import React from 'react';
import LoginButton from '../Auth/LoginButton';
import LogoutButton from '../Auth/LogoutButton';

const Header = () => {
  return (
    <header className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <a className="navbar-brand" href="/">
          Weather Analytics
        </a>
        <div className="ms-auto">
          <LoginButton />
          <LogoutButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
