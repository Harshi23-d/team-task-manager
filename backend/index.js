const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- 1. API ROUTES (Define these first!) ---
app.get('/api/test', (req, res) => res.json({ message: "Backend is working" }));

// Example: app.use('/api/projects', projectRoutes);

// --- 2. PRODUCTION SETUP (Serve React Build) ---
const buildPath = path.join(__dirname, 'build');
app.use(express.static(buildPath));

// This Regex route avoids the PathError crash by matching everything 
// EXCEPT paths that start with '/api'
app.get(/^(?!\/api).+/, (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
});

// --- 3. GLOBAL ERROR HANDLER ---
app.use((err, req, res, next) => {
    console.error("SERVER ERROR:", err.stack);
    res.status(500).json({ error: "Something went wrong!" });
});

// --- 4. START SERVER ---
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => {
        console.error("Database connection error:", err);
        process.exit(1);
    });