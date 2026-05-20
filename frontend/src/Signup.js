import React, { useState } from 'react';
import axios from 'axios';
import './Auth.css';

function Signup() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'Member' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // FIX: Use relative path '/api/users/signup'
      await axios.post('/api/users/signup', formData);
      alert('User registered successfully!');
    } catch (err) {
      console.error(err);
      // More descriptive error handling for your demo
      alert('Error registering user: ' + (err.response?.data?.message || 'Check your input'));
    }
  };

  return (
    <div className="auth-container">
      <h2>Signup</h2>
      <input 
        type="text" 
        placeholder="Name" 
        value={formData.name}
        onChange={(e) => setFormData({...formData, name: e.target.value})} 
        required
      />
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
      <select value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})}>
        <option value="Member">Member</option>
        <option value="Admin">Admin</option>
      </select>
      <button onClick={handleSubmit}>Register</button>
    </div>
  );
}

export default Signup;