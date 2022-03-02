#!/usr/bin/env node

const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const config  = require('./package.json')['server'] || { port: 9000 };

const data = {};
const app = express();

// Fix middleware magic

app.use(cors());
app.use(bodyParser.text());

app.use(express.static('./'));

// "Data API"

app.get('/data/:id', async (req, res) => {
  const requestedData = data[req.params.id];
  console.log('Sending:', requestedData || '[Nothing]');
  if ( requestedData ) res.send(requestedData);
  else                 res.status(404).end();
});

app.put('/data/:id', async (req, res) => {
  console.log('Storing:', req.body);
  data[req.params.id] = req.body;
  res.status(201).end();
});

// Start!

app.listen(config.port, () =>
  console.log(`Server is listening on port ${config.port}`));
