'use strict';

require('dotenv').config();
const { Server } = require('socket.io');
const PORT = process.env.PORT || 3005;
const server = new Server();
const caps = server.of('/caps');

const logger = (event, payload) => {
  console.log({
    event,
    time: new Date().toISOString,
    payload,
  });
};

caps.on('connection', (socket) => {
  console.log('Connected to caps with socked.id ', socket.id);

  socket.on('join', (room) => {
    console.log('joining room', room);

    socket.join(room);
    console.log(`You've joined the ${room} room`);
  });

  socket.on('pickup', (payload) => {
    logger('pickup', payload);
    caps.emit('pickup', payload);
  });

  socket.on('in-transit', (payload) => {
    logger('in-transit', payload);
    caps.emit('in-transit', payload);
  });

  socket.on('delivered', (payload) => {
    logger('delivered', payload);
    caps.emit('delivered', payload);
  });
});

const start = () => {
  server.listen(PORT);
  console.log(`listening on port:${PORT}`);
};

start();
