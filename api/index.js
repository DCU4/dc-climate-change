'use strict';
const express = require('express');
const http = require('http');
const cors = require('cors')
const app = express();
const server = http.createServer(app);

app.set('view engine', 'ejs')
app.use(express.json());
app.use(cors());
// app.use(express.urlencoded({ extended: true }));


app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to the API' });
});

app.get('/get-weather', (req, res) => {
  res.json({ message: 'Welcome to the API' });
});



// // Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});

module.exports = app;
