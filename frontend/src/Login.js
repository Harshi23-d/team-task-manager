import React, { useState } from 'react';
import axios from 'axios';

function Login({ setToken, setRole }) {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // FIX: Changed 'http://localhost:5000/api/users/login' 
      // to the relative path '/api/users/login'
      const response = await axios.post('/api/users/login', formData);
      
      localStorage.setItem('token', response.data.token);
      setToken(response.data.token);
      setRole(response.data.role);
      alert('Login successful!');
    } catch (err) {
      console.error(err);
      alert('Invalid credentials');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input 
        type="email" 
        placeholder="Email" 
        value={formData.email}
        onChange={(e) => setFormData({...formData, email: e.target.value})} 
        required
      />
      <input 
        type="password" 
        placeholder="Password" 
        value={formData.password}
        onChange={(e) => setFormData({...formData, password: e.target.value})} 
        required
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;