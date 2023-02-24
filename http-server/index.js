const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // Use the environment variable PORT if available, otherwise default to port 3000

 // Serve static files in the 'public' directory

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
