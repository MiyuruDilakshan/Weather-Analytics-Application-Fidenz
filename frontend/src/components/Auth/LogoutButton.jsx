import React from 'react';

const LogoutButton = () => {
  const handleLogout = () => {
    // Auth0 logout logic
    console.log('Logout clicked');
  };

  return (
    <button onClick={handleLogout} className="btn btn-danger">
      Logout
    </button>
  );
};

export default LogoutButton;
