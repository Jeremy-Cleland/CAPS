'use strict';

require('dotenv').config();
const { Server } = require('socket.io');
const PORT = process.env.PORT || 3005;
const server = new Server();
const caps = server.of('/caps');
const Queue = require('./lib/queue');
const eventQueue = new Queue();

const logger = (event, payload) => {
  console.log({
    event,
    time: new Date().toISOString(),
    payload,
  });
};

caps.on('connection', (socket) => {
  console.log('connected to caps namespace');

  socket.onAny((event, payload) => {
    const time = new Date().toISOString();
    console.log({ event, time, payload });
  });

  socket.on('join', (room) => {
    console.log('joining room', room);
    socket.join(room);
    console.log(`You have joined room ${room}`);
  });

  socket.on('pickup', (payload) => {
    let currentQueue = eventQueue.read('driver');
    if (!currentQueue) {
      let queueKey = eventQueue.store('driver', new Queue());
      currentQueue = eventQueue.read(queueKey);
    }
    currentQueue.store(payload.orderID, payload);
    caps.to(payload.store).emit('pickup', payload);
  });

  socket.on('in-transit', (payload) => {
    logger('in-transit', payload);
    socket.emit('in-transit', payload);
  });

  socket.on('delivered', (payload) => {
    let currentQueue = eventQueue.read(payload.store);
    if (!currentQueue) {
      let queueKey = eventQueue.store(payload.store, new Queue());
      currentQueue = eventQueue.read(queueKey);
    }
    currentQueue.remove(payload.orderID);
    caps.to(payload.store).emit('delivered', payload);
  });

  socket.on('received', (payload) => {
    console.log('Server recieved', payload);
    let id = payload.queueId ? payload.queueId : payload.store;
    let currentQueue = eventQueue.read(id);
    if (!currentQueue) {
      throw new Error('No queue found');
    }

    let recievedMessage = currentQueue.remove(payload.orderID);
    caps.emit('received', recievedMessage);
  });

  socket.on('get-all', (payload) => {
    let id = payload.queueId ? payload.queueId : payload.store;
    let currentQueue = eventQueue.read(id);
    if (currentQueue && currentQueue.data) {
      for (let key in currentQueue.data) {
        caps.emit('pickup', currentQueue.data[key]);

        console.log('emitted', currentQueue.data[key]);

        currentQueue.remove(key);

        console.log('removed', key);

        console.log('currentQueue', currentQueue);
      }
    }
  });
});

const start = () => {
  server.listen(PORT);
  console.log(`listening on port:${PORT}`);
};

start();
