import React from 'react';
import { AuthProvider } from './context/AuthContext';
import WeatherDashboard from './components/Weather/WeatherDashboard';
import Header from './components/Layout/Header';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Header />
        <main className="container mt-4">
          <WeatherDashboard />
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;
