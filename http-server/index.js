const express = require('express');
const app = express();
const port = process.argv[2] || 3000; // accept port number as command line argument

// serve registration page
app.get('/registration', (req, res) => {
    res.sendFile(__dirname + '/registration.html');
});

// handle registration form submission
app.post('/register', (req, res) => {
    // handle registration form data here
});

// serve home page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/home.html');
});

// serve project page
app.get('/projects', (req, res) => {
    res.sendFile(__dirname + '/project.html');
});

// start server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});