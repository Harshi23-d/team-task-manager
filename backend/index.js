const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// 1. API ROUTES MUST COME FIRST
app.get('/api/test', (req, res) => res.json({ message: "Backend is working" }));
// ... put all your other app.use('/api', ...) routes here ...

// 2. PRODUCTION SETUP MUST COME AFTER API ROUTES
const buildPath = path.join(__dirname, 'build');
app.use(express.static(buildPath));

app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
});

// 3. GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
    console.error("Error:", err.stack);
    res.status(500).send('Something broke!');
});

// 4. START SERVER
const PORT = process.env.PORT || 5000;

// Use '0.0.0.0' for Railway compatibility
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => console.error("Database connection error:", err));