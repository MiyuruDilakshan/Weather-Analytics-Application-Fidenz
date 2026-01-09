import React from 'react';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <main className="main-content container mt-4">
        {children}
      </main>
    </div>
  );
};

export default Layout;
