import React, { useState } from 'react';
import axios from 'axios';

function CreateProject() {
  const [project, setProject] = useState({ title: '', description: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // FIX: Changed 'http://localhost:5000/api/projects/create' 
      // to the relative path '/api/projects/create'
      await axios.post('/api/projects/create', project);
      
      alert('Project created successfully!');
      window.location.reload(); 
    } catch (err) {
      // Improved error logging so you can see what went wrong
      console.error(err);
      alert('Error creating project: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4>Add New Project</h4>
      <input 
        type="text" 
        placeholder="Title" 
        value={project.title}
        onChange={(e) => setProject({...project, title: e.target.value})} 
        required 
      />
      <input 
        type="text" 
        placeholder="Description" 
        value={project.description}
        onChange={(e) => setProject({...project, description: e.target.value})} 
        required 
      />
      <button type="submit">Create Project</button>
    </form>
  );
}

export default CreateProject;