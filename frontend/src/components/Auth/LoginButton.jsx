import React from 'react';

const LoginButton = () => {
  const handleLogin = () => {
    // Auth0 login logic
    console.log('Login clicked');
  };

  return (
    <button onClick={handleLogin} className="btn btn-primary">
      Login
    </button>
  );
};

export default LoginButton;
