'use strict';
const express = require('express');
const http = require('http');
const cors = require('cors')
const app = express();
const server = http.createServer(app);
const fs = require('fs');
let credentials;
if (fs.existsSync('./credentials.json')) {
  credentials = JSON.parse(fs.readFileSync('./credentials.json'));
}

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.json({ message: 'DC climate change app up' });
});

app.get('/stations', async (req, res) => {
  const dc = 'FIPS:11';
  const token = credentials ? credentials.NOAA_TOKEN : process.env.NOAA_TOKEN;
  const url = `https://www.ncdc.noaa.gov/cdo-web/api/v2/stations?locationid=${dc}`;
  try {
    const response = await fetch(url, { headers: { token } });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch stations' });
  }
});

app.get('/datasets', async (req, res) => {
  const { station } = req.query;
  const token = credentials ? credentials.NOAA_TOKEN : process.env.NOAA_TOKEN;
  if (!station) {
    return res.status(400).json({ error: 'Missing station parameter' });
  }
  const url = `https://www.ncdc.noaa.gov/cdo-web/api/v2/datasets?stationid=${station}`;
  try {
    const response = await fetch(url, { headers: { token } });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch datasets' });
  }
});

app.get('/weather-data', async (req, res) => {
  const { station, datasetid, startdate, enddate, type } = req.query;
  const token = credentials ? credentials.NOAA_TOKEN : process.env.NOAA_TOKEN;
  if (!station || !datasetid || !startdate || !enddate || !type) {
    return res.status(400).json({ error: 'Missing required query parameters' });
  }
  const url = `https://www.ncdc.noaa.gov/cdo-web/api/v2/data?stationid=${station}&datasetid=${datasetid}&startdate=${startdate}&enddate=${enddate}&units=standard&limit=1000&datatypeid=${type}`;
  try {
    const response = await fetch(url, { headers: { token } });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});


// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});

module.exports = app;
