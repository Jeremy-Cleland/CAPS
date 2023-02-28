'use strict';

const eventPool = require('../eventPool');

var Chance = require('chance');
var chance = new Chance();

module.exports = (store) => {
  const payload = {
    store: store,
    orderID: chance.guid(),
    customer: chance.name(),
    address: chance.address(),
  };

  eventPool.emit('pickup', payload);
};
