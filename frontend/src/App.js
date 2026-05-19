import React, { useState } from 'react';
import Signup from './Signup';
import Login from './Login';
import Dashboard from './Dashboard';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  // Retrieve role from localStorage if it exists after refresh
  const [role, setRole] = useState(localStorage.getItem('role'));

  // Function to handle login success
  const handleLogin = (token, role) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    setToken(token);
    setRole(role);
  };

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setToken(null);
    setRole(null);
  };

  if (!token) {
    return (
      <div>
        <h1>Team Task Manager</h1>
        <Signup />
        <hr />
        {/* Pass the login handler to the Login component */}
        <Login setToken={(t) => setToken(t)} setRole={(r) => {
          localStorage.setItem('role', r);
          setRole(r);
        }} />
      </div>
    );
  }

  return (
    <div>
      <h1>Team Task Manager</h1>
      <p>Welcome! You are logged in as: <strong>{role}</strong></p>
      <button onClick={handleLogout}>Logout</button>
      
      {/* Pass the role prop to the Dashboard */}
      <Dashboard role={role} />
    </div>
  );
}

export default App;