import { test, after, before } from 'node:test';
import assert from 'node:assert/strict';
import app from '../src/index.js';

let server;
let baseUrl;

before(async () => {
  await new Promise((resolve) => {
    server = app.listen(0, () => {
      const { port } = server.address();
      baseUrl = `http://127.0.0.1:${port}`;
      resolve();
    });
  });
});

after(async () => {
  await new Promise((resolve) => server.close(resolve));
});

test('GET /orders returns empty list initially', async () => {
  const res = await fetch(`${baseUrl}/orders`);
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.deepEqual(body, []);
});

test('POST /orders creates order then GET returns it', async () => {
  const postRes = await fetch(`${baseUrl}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productId: 'p-1', qty: 2 }),
  });
  assert.equal(postRes.status, 201);
  const created = await postRes.json();
  assert.equal(created.productId, 'p-1');
  assert.equal(created.qty, 2);
  assert.match(created.id, /^o-\d+$/);

  const getRes = await fetch(`${baseUrl}/orders`);
  assert.equal(getRes.status, 200);
  const list = await getRes.json();
  assert.equal(list.length, 1);
  assert.deepEqual(list[0], created);
});

test('POST /orders rejects missing productId with 400', async () => {
  const res = await fetch(`${baseUrl}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ qty: 1 }),
  });
  assert.equal(res.status, 400);
  const body = await res.json();
  assert.ok(body.error);
});

test('POST /orders rejects non-integer qty with 400', async () => {
  const res = await fetch(`${baseUrl}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productId: 'p-2', qty: 1.5 }),
  });
  assert.equal(res.status, 400);
  const body = await res.json();
  assert.ok(body.error);
});
