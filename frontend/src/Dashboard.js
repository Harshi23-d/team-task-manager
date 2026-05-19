import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import { FaPlus, FaProjectDiagram } from 'react-icons/fa';
import CreateProject from './CreateProject';
import CreateTask from './CreateTask';
import './Dashboard.css';

function Dashboard({ role }) {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pRes, tRes] = await Promise.all([
          axios.get('http://localhost:5000/api/projects'),
          axios.get('http://localhost:5000/api/tasks/all')
        ]);
        setProjects(pRes.data);
        setTasks(tRes.data);
      } catch (err) {
        toast.error("Failed to load dashboard data");
      }
    };
    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      <Toaster position="top-right" />
      
      <header className="dashboard-header">
        <div className="logo">
          <FaProjectDiagram /> <span>TaskPro</span>
        </div>
        <div className="user-info">
          <span>Logged in as: </span>
          <span className="role-tag">{role}</span>
        </div>
      </header>

      {role === 'Admin' && (
        <section className="admin-actions">
          <CreateProject />
        </section>
      )}

      <main className="dashboard-main">
        <h2 className="section-title">Active Projects</h2>
        <div className="project-grid">
          {projects.map((p) => (
            <div key={p._id} className="project-card">
              <h3>{p.title}</h3>
              <p className="project-desc">{p.description}</p>
              
              <div className="task-input-area">
                <CreateTask projectId={p._id} />
              </div>
              
              <div className="task-list">
                {tasks.filter(t => t.project === p._id).map(t => (
                  <div key={t._id} className={`task-item status-${t.status.toLowerCase().replace(" ", "")}`}>
                    <strong>{t.title}</strong>
                    <span className="task-status">{t.status}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;