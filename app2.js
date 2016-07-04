'use strict';

console.log('hello');

const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.json({}).end();
});

app.get('/health', (req, res) => {
  res.json({ success: true }).end();
});
app.get('/ping', (req, res) => {
  res.json({ success: 'i\'m here' }).end();
});

app.listen(3001);
