const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// Create a new project (Admin Only)
router.post('/create', async (req, res) => {
    // In a real production app, verify the JWT token here
    // For now, this acts as your logic gate
    try {
        const newProject = new Project(req.body);
        await newProject.save();
        res.status(201).json({ message: "Project created!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json(projects);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;