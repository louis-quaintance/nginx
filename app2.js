'use strict';

console.log('hello');

const express = require('express');

const app = express();

const amqp = require('amqp');
const queueName = 'myQueue';

app.get('/', (req, res) => {
    res.json({}).end();
});

app.get('/health', (req, res) => {
    res.json({
        success: true
    }).end();
});
app.get('/ping', (req, res) => {
    res.json({
        success: 'i\'m here'
    }).end();
});

app.get('/postToQueue', (req, res) => {

    connection.publish(queueName, { a: 'test'}, (data) => {
        console.log(data);
    });

    res.json({
        output: 'published'
    }).end();
});

app.listen(3001);

var connection = amqp.createConnection({
    host: 'rabbit1'
});

connection.on('error', function(e) {
    console.log("Error from amqp: ", e);
});

connection.on('ready', function() {
    connection.queue(queueName, function(q) {
      q.bind('#');
      q.subscribe({ack: true}, function (message, headers, deliveryInfo, messageObject) {
        console.log('Got a message with routing key ' + deliveryInfo.routingKey);
        console.log(message);
        console.log(messageObject);
        messageObject.acknowledge();
      });
    });
});
