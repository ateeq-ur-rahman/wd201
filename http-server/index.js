const express = require('express');
const app = express();
const port = process.argv.slice(2)[0] || 3000; // accept port number as command line argument

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
    res.send('<h1>Welcome to the home page</h1><p><a href="/projects">View Projects</a></p>');
});

// serve project page
app.get('/projects', (req, res) => {
    res.send('<h1>Our Projects</h1><p><a href="/registration">Register for updates</a></p>');
});

// start server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
