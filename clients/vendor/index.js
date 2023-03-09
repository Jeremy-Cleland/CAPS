'use strict';

const { orderCreation, packageDelivered } = require('./handler');
let Chance = require('chance');
let chance = new Chance();

const { io } = require('socket.io-client');
const socket = io.connect('http://localhost:3005/caps');

socket.emit('getAll', { store: '1-800-flowers' });

socket.on('delivered', (payload) => {
  packageDelivered(payload);
  socket.emit('received', payload);
});

setInterval(() => {
  orderCreation(socket);
}, 5000);
