const express = require('express'); // import express framework
const app = express(); // create an instance of express
const port = 3000; // port number for the server

const path = require('path'); // import path module for file path manipulation
const bodyParser = require('body-parser'); // import body-parser middleware for parsing request bodies

// error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack); // log the error stack to the console
    res.status(500).send('Something went wrong!'); // send a generic error message to the client
});

// serve static files from the 'public' directory
app.use(express.static('public'));

// middleware to parse URL-encoded bodies (from forms)
app.use(bodyParser.urlencoded({ extended: true }));

// simple route to display a message
app.get('/', (req, res) => {
    res.send('Welcome to Data Representation & Querying'); // send a welcome message
});

// a route that greets a user by their name
app.get('/hello/:name', (req, res) => {
    const name = req.params.name; // get name from route parameters
    res.send(`Hello ${name}`); // respond with a greeting
});

//  a route that greets a user by their first and last name
app.get('/hello/:name/:lname', (req, res) => {
    const name = req.params.name; // get first name from route parameters
    const lname = req.params.lname; // get last name from route parameters
    res.send(`Hello ${name} ${lname}`); // respond with a greeting
});

// route to get a list of movies
app.get('/api/movies', (req, res) => {
    const myMovies = [ // array of movie objects
        {
            "Title": "Avengers: Infinity War",
            "Year": "2018",
            "imdbID": "tt4154756",
            "Type": "movie",
            "Poster": "https://example.com/poster1.jpg"
        },
        {
            "Title": "Captain America: Civil War",
            "Year": "2016",
            "imdbID": "tt3498820",
            "Type": "movie",
            "Poster": "https://example.com/poster2.jpg"
        },
        {
            "Title": "World War Z",
            "Year": "2013",
            "imdbID": "tt0816711",
            "Type": "movie",
            "Poster": "https://example.com/poster3.jpg"
        }
    ];
    res.status(201).json({ myMovies }); // respond with the movies as JSON
});

// route to serve the 'index.html' file
app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); // send the HTML file to the client
});

// route for handling GET requests to '/name'
app.get('/name', (req, res) => {
    const firstname = req.query.firstname; // extract first name from query parameters
    const lastname = req.query.lastname; // extract last name from query parameters
    res.send(`Hello ${firstname} ${lastname}`); // respond with a greeting
});

// route for handling POST requests to '/name'
app.post('/name', (req, res) => {
    const firstname = req.body.firstname; // extract first name from request body
    const lastname = req.body.lastname; // extract last name from request body
    res.send(`Hello ${firstname} ${lastname}`); // respond with a greeting
});

// listen on the defined port
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`); // log the server URL
});
