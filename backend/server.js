const express = require('express');
const bodyParser = require('body-parser');
const tasksRoutes = require('./tasks');
const userRoutes = require('./user');

const app = express();

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Use tasks routes
app.use('/api', tasksRoutes);
app.use('/api', userRoutes);
app.listen('3000', () => {
    console.log('Server started on port 3000');
});
