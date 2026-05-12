import { test } from 'node:test';
import assert from 'node:assert/strict';
import app from '../src/index.js';
import { _reset } from '../src/stores/products.js';

function startServer() {
  return new Promise((resolve) => {
    const server = app.listen(0, () => {
      const { port } = server.address();
      resolve({ server, baseUrl: `http://127.0.0.1:${port}` });
    });
  });
}

function stopServer(server) {
  return new Promise((resolve) => server.close(resolve));
}

test('GET /products returns empty list initially', async () => {
  _reset();
  const { server, baseUrl } = await startServer();
  try {
    const res = await fetch(`${baseUrl}/products`);
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.deepEqual(body, []);
  } finally {
    await stopServer(server);
  }
});

test('POST /products then GET returns the created product', async () => {
  _reset();
  const { server, baseUrl } = await startServer();
  try {
    const postRes = await fetch(`${baseUrl}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Widget', price: 9.99 }),
    });
    assert.equal(postRes.status, 201);
    const created = await postRes.json();
    assert.equal(created.name, 'Widget');
    assert.equal(created.price, 9.99);
    assert.equal(typeof created.id, 'string');
    assert.match(created.id, /^p-\d+$/);

    const getRes = await fetch(`${baseUrl}/products`);
    assert.equal(getRes.status, 200);
    const list = await getRes.json();
    assert.deepEqual(list, [created]);
  } finally {
    await stopServer(server);
  }
});

test('POST /products rejects invalid name with 400', async () => {
  _reset();
  const { server, baseUrl } = await startServer();
  try {
    const res = await fetch(`${baseUrl}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: '', price: 5 }),
    });
    assert.equal(res.status, 400);
    const body = await res.json();
    assert.equal(typeof body.error, 'string');
  } finally {
    await stopServer(server);
  }
});

test('POST /products rejects invalid price with 400', async () => {
  _reset();
  const { server, baseUrl } = await startServer();
  try {
    const res = await fetch(`${baseUrl}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Widget', price: -1 }),
    });
    assert.equal(res.status, 400);
    const body = await res.json();
    assert.equal(typeof body.error, 'string');
  } finally {
    await stopServer(server);
  }
});
