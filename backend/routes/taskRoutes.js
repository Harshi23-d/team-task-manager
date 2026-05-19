const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Create a new task and link it to a project
router.post('/create', async (req, res) => {
    try {
        const { title, description, status, projectId } = req.body;
        const newTask = new Task({ title, description, status, project: projectId });
        await newTask.save();
        res.status(201).json({ message: "Task created successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get tasks for a specific project
router.get('/:projectId', async (req, res) => {
    try {
        const tasks = await Task.find({ project: req.params.projectId });
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all tasks for the dashboard
router.get('/all', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;