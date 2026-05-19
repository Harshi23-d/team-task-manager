import React, { useState } from 'react';
import axios from 'axios';

function CreateTask({ projectId }) {
  const [task, setTask] = useState({ title: '', description: '', status: 'To Do' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/tasks/create', { ...task, projectId });
      alert('Task added!');
      window.location.reload();
    } catch (err) {
      alert('Error adding task');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Task Title" onChange={(e) => setTask({...task, title: e.target.value})} />
      <input type="text" placeholder="Task Desc" onChange={(e) => setTask({...task, description: e.target.value})} />
      <button type="submit">Add Task</button>
    </form>
  );
}

export default CreateTask;