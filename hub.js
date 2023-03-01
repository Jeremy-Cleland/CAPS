'use strict';

let eventPool = require('./eventPool');
require('./vendor');
require('./driver');
var Chance = require('chance');
var chance = new Chance();

eventPool.on('pickup', (payload) => logger('pickup', payload));

eventPool.on('in-transit', (payload) => logger('in-transit', payload));

eventPool.on('delivered', (payload) => logger('delivered', payload));

function logger(event, payload) {
  console.log({
    event,
    time: new Date().toISOString(),
    payload,
  });
}

const start = () => {
  setInterval(() => {
    let store = chance.company();
    eventPool.emit('VENDOR', store);
  }, 10000);
};

start();
