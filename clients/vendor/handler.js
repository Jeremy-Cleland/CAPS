`use strict`;

let Chance = require('chance');
let chance = new Chance();

const orderCreation = (socket, payload = null) => {
  if (!payload) {
    payload = {
      store: store,
      orderID: chance.guid(),
      customer: chance.name(),
      address: chance.address(),
    };
  }
  socket.emit('JOIN', payload.store);
  console.log('VENDOR: Order ready for pickup.');
  socket.emit('pickup', payload);
};

const packageDelivered = (payload) => {
  console.log(`VENDOR: Thank you for delivering ${payload.orderID}`);
};

module.exports = { orderCreation, packageDelivered };
