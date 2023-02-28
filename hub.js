'use strict';

let eventPool = require('./eventPool');
require('./vendor');
require('./driver');
var Chance = require('chance');
var chance = new Chance();

eventPool.on('pickup', (payload) => {
  console.log({
    event: 'pickup',
    time: new Date().toISOString(),
    payload: payload,
  });
});

eventPool.on('in-transit', (payload) => {
  setTimeout(() => {
    console.log({
      event: 'in-transit',
      time: new Date().toISOString(),
      payload: payload,
    });
    eventPool.emit('delivered', payload);
  }, 2000);
});

eventPool.on('delivered', (payload) => {
  setTimeout(() => {
    console.log(`DRIVER: delivered ${payload.orderID}`);
    console.log(`VENDOR: Thank you for delivering ${payload.orderID}`);
    console.log({
      event: 'delivered',
      time: new Date().toISOString(),
      payload: payload,
    });
  }, 2000);
});

const start = () => {
  setInterval(() => {
    let store = chance.company();
    eventPool.emit('VENDOR', store);
  }, 10000);
};

start();
