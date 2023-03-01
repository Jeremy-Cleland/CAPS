'use strict';

const { io } = require('socket.io-client');

const socket = io('http://localhost:3005/caps');

module.exports = (payload) => {
  console.log(`DRIVER: picked up ${payload.orderID}`);
  socket.emit('in-transit', payload);
};
