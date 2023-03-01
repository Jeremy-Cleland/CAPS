'use strict';

const handler = require('./handler');
const { io } = require('socket.io-client');
const socket = io.connect('http://localhost:3003/caps');

socket.on('pickup', (payload) => {
  setTimeout(() => {
    handler(payload);
  }, 2000);
});

socket.on('in-transit', (payload) => {
  setTimeout(() => {
    handler(payload);
  }, 2000);
});

socket.on('delivered', (payload) => {
  console.log(`DRIVER: delivered up ${payload.orderID}`);
  socket.emit('delivered', payload);
});
