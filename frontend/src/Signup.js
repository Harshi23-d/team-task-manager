import React, { useState } from 'react';
import axios from 'axios';
import './Auth.css'; // Ensure this file exists in frontend/src

function Signup() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'Member' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/users/signup', formData);
      alert('User registered successfully!');
    } catch (err) {
      alert('Error registering user');
    }
  };

  return (
    <div className="auth-container">
      <h2>Signup</h2>
      <input 
        type="text" 
        placeholder="Name" 
        onChange={(e) => setFormData({...formData, name: e.target.value})} 
      />
      <input 
        type="email" 
        placeholder="Email" 
        onChange={(e) => setFormData({...formData, email: e.target.value})} 
      />
      <input 
        type="password" 
        placeholder="Password" 
        onChange={(e) => setFormData({...formData, password: e.target.value})} 
      />
      <select onChange={(e) => setFormData({...formData, role: e.target.value})}>
        <option value="Member">Member</option>
        <option value="Admin">Admin</option>
      </select>
      <button onClick={handleSubmit}>Register</button>
    </div>
  );
}

export default Signup;