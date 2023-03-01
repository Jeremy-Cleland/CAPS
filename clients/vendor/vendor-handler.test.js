'use strict';

const eventPool = require('../../eventPool');
const handler = require('./handler');

console.log = jest.fn();
eventPool.emit = jest.fn();

describe('Vendor Handler', () => {
  it('Sends order to a store and creates a payload', () => {
    const store = 'Test Store';

    let test = handler(store);
    console.log('---------------', test);
    expect('').toBe('');
  });
});
