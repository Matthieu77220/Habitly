const express = require('express');
const app = express();
const port = 4000;
const db = require('./data/db.js')
const cors = require('cors')

const corsOptions = {
    origin: '*',
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: ['Content-Type', 'Authorization']
}

app.use(cors(corsOptions));

app.use(express.json())

// Define a route for GET requests to the root URL
app.get('/', (req, res) => {
  res.send('Hello World from Express!');
});


// Start the server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});