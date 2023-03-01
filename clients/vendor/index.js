'use strict';

const handler = require('./handler');
let Chance = require('chance');
let chance = new Chance();

const { io } = require('socket.io-client');
const socket = io.connect('http://localhost:3005/caps');

let store = chance.company();

socket.emit('join', store);

setInterval(() => {
  handler(store);
}, 5000);

socket.on('delivered', (payload) => {
  console.log(`VENDOR: Thank you for delivering ${payload.orderID}`);
  process.exit(0);
});
