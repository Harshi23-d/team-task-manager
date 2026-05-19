import React, { useState } from 'react';
import axios from 'axios';

function CreateProject() {
  const [project, setProject] = useState({ title: '', description: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/projects/create', project);
      alert('Project created successfully!');
      window.location.reload(); // Reload to see the new project
    } catch (err) {
      alert('Error creating project');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4>Add New Project</h4>
      <input type="text" placeholder="Title" onChange={(e) => setProject({...project, title: e.target.value})} />
      <input type="text" placeholder="Description" onChange={(e) => setProject({...project, description: e.target.value})} />
      <button type="submit">Create Project</button>
    </form>
  );
}

export default CreateProject;