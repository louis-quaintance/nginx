'use strict';

console.log('hello');

const express = require('express');
const request = require('request');
const consul = require('consul')({
  host: process.env.CONSUL_PORT_53_TCP_ADDR
});

const app = express();

app.get('/health', (req, res) => {
  res.json({ success: true }).end();
});

app.get('/', (req, res) => {

  consul.catalog.service.nodes('app2', function(err, result) {
    if (err) throw err;

    if(!result || result.length === 0){
      res.json({ success: 'wait' });
      return;
    }

    const serviceDefinition = result[0];

    request.get(`http://${serviceDefinition.ServiceAddress}:${serviceDefinition.ServicePort}/ping`, (err, response, body) => {
        res.json({ success: body });
    })
  });
});

app.listen(3000);
