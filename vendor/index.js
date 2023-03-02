'use strict';

const eventPool = require('../eventPool');
const handler = require('./handler');

eventPool.on('VENDOR', (store) => {
  setTimeout(() => {
    handler(store);
  }, 2000);
});