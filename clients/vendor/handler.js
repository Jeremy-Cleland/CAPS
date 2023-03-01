
`use strict`;

const { io } = require('socket.io-client');
const socket = io('http://localhost:3005/caps');

let Chance = require('chance');
let chance = new Chance();

module.exports = (store) {
  const payload = {
    store: store,
    orderID: chance.guid(),
    customer: chance.name(),
    address: chance.address(),
  };

  socket.emit('pickup', payload);

};
