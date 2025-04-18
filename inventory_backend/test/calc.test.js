// inventory_backend/test/calc.test.js
const { test } = require('node:test');
const assert = require('assert');
const { add } = require('../utils/calc');

test('adds two numbers', () => {
  assert.strictEqual(add(2, 3), 5);
});