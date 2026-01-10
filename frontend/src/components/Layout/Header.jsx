import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Header = () => {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();
  
  // Check if user has dark mode preference saved
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === null) {
      // If no saved preference, check system preference
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return savedMode === 'true';
  });

  // Apply dark mode when component loads and when it changes
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [isDarkMode]);

  // Toggle function
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <header className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-white">
              Weather Analytics
            </h1>
          </div>

          <div className="flex items-center gap-4">
            {/* Modern Dark Mode Toggle Switch */}
            <div className="flex items-center gap-2">
              <span className="text-white text-sm font-medium">
                {isDarkMode ? 'Dark' : 'Light'}
              </span>
              <button
                onClick={toggleDarkMode}
                className="relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
                style={{ backgroundColor: isDarkMode ? '#4f46e5' : '#cbd5e1' }}
                role="switch"
                aria-checked={isDarkMode}
                title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {/* Toggle circle */}
                <span
                  className="inline-block w-4 h-4 transform bg-white rounded-full transition-transform"
                  style={{ 
                    transform: isDarkMode ? 'translateX(24px)' : 'translateX(4px)',
                    transition: 'transform 0.2s ease'
                  }}
                />
              </button>
            </div>

            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <div className="text-white text-sm">
                  <span className="font-medium">{user?.name || user?.email}</span>
                </div>
                <button
                  onClick={() => logout({ returnTo: window.location.origin })}
                  className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition duration-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => loginWithRedirect()}
                className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition duration-200"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
