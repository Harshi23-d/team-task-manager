import React, { useState } from 'react';
import axios from 'axios';

function CreateTask({ projectId }) {
  const [task, setTask] = useState({ title: '', description: '', status: 'To Do' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // FIX: Use relative path '/api/tasks/create'
      await axios.post('/api/tasks/create', { ...task, projectId });
      alert('Task added!');
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert('Error adding task: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Task Title" 
        value={task.title}
        onChange={(e) => setTask({...task, title: e.target.value})} 
        required 
      />
      <input 
        type="text" 
        placeholder="Task Desc" 
        value={task.description}
        onChange={(e) => setTask({...task, description: e.target.value})} 
        required 
      />
      <button type="submit">Add Task</button>
    </form>
  );
}

export default CreateTask;