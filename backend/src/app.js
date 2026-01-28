const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const notesRoutes = require('./routes/notes');
const todosRoutes = require('./routes/todos');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);
app.use('/api/todos', todosRoutes);

// Middleware de errores
app.use(errorHandler);

module.exports = app;
