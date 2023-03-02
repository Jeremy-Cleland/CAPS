'use strict';

const { io } = require('socket.io-client');
const socket = io.connect('http://localhost:3003/caps');

socket.emit('getAll', { queueId: 'DRIVER' });

socket.on('pickup', (payload) => {
  setTimeout(() => {
    console.log(`DRIVER: picked up ${payload.orderID}`);
    socket.emit('received', { queueId: 'DRIVER' });
    socket.emit('in-transit', payload);
  }, 2000);
});

socket.on('in-transit', (payload) => {
  setTimeout(() => {
    socket.emit('delivered', payload);
  }, 2000);
});

socket.on('delivered', (payload) => {
  console.log(`DRIVER: delivered up ${payload.orderID}`);
  socket.emit('delivered', payload);
});
