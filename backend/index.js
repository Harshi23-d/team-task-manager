const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// --- YOUR API ROUTES ---
// Make sure all your API routes (e.g., app.use('/api', ...)) 
// are defined BEFORE the static file serving code below.

// Example route:
app.get('/api/test', (req, res) => {
    res.json({ message: "Backend is running!" });
});

// --- PRODUCTION SETUP ---

// 1. Serve static files from the build folder
app.use(express.static(path.join(__dirname, 'build')));

// 2. Handle all other routes by serving the index.html file
// This ensures that React Router works correctly in production
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// --- DATABASE & SERVER START ---
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => console.log(err));