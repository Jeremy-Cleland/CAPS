'use strict';

const eventPool = require('../../eventPool');
const handler = require('./handler');

console.log = jest.fn();
eventPool.emit = jest.fn();

describe('Driver', () => {
  it('emits an event', () => {
    let payload = {
      store: 'Mcdonalds',
      orderID: '6783',
      customer: 'Ronald',
      address: 'Ronalds Moms house',
    };
    handler(payload);
    expect(payload.store).toBe('Mcdonalds');
    expect(console.log).toHaveBeenCalledWith(
      `DRIVER: picked up ${payload.orderID}`
    );
  });
});
