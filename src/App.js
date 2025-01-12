import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';  // Dashboard component after login
import ProtectedRoute from './components/ProtectedRoute';  // ProtectedRoute to guard dashboard
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if the user is authenticated by checking if JWT token exists
  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      setIsAuthenticated(true); // User is authenticated if JWT token is present
    }
  }, []);

  // Function to mark user as logged in
  const login = () => {
    setIsAuthenticated(true);
  };

  // Function to mark user as logged out
  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('jwtToken'); // Remove JWT token on logout
  };

  return (
    <Router>
      <Routes>
        {/* Login route */}
        <Route 
          path="/" 
          element={<Login isAuthenticated={isAuthenticated} login={login} />} 
        />

        {/* Protected route for dashboard */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Dashboard logout={logout} />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
