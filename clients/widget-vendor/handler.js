`use strict`;

let Chance = require('chance');
let chance = new Chance();

const orderCreation = (socket, payload = null) => {
  if (!payload) {
    payload = {
      store: 'Acme Widgets',
      orderID: chance.guid(),
      customer: chance.name(),
      address: chance.address(),
    };
  }

  console.log('VENDOR: Order ready for pickup.');
  socket.emit('JOIN', payload.store);
  socket.emit('pickup', payload);
};

const packageDelivered = (payload) => {
  console.log(
    `VENDOR: Thank you for delivering ${payload.orderID} to ${payload.customer}}`
  );
};

module.exports = { orderCreation, packageDelivered };
