const express = require('express');

// Import our modular routers for /tips and /feedback
const notesRouter = require('./notes');
const savingRouter = require('./saving');
const diagnosticsRouter = require('./diagnostics');

const app = express();

app.use('/notes', notesRouter);
app.use('/feedback', savingRouter);
app.use('/diagnostics', diagnosticsRouter);

module.exports = app;
