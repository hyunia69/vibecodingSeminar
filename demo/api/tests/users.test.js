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

test('GET /users returns empty list initially', async () => {
  const res = await fetch(`${baseUrl}/users`);
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.deepEqual(body, []);
});

test('POST /users creates user, then GET returns it', async () => {
  const res = await fetch(`${baseUrl}/users`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ name: 'Alice', email: 'alice@example.com' }),
  });
  assert.equal(res.status, 201);
  const created = await res.json();
  assert.equal(created.name, 'Alice');
  assert.equal(created.email, 'alice@example.com');
  assert.match(created.id, /^u-\d+$/);

  const listRes = await fetch(`${baseUrl}/users`);
  assert.equal(listRes.status, 200);
  const listBody = await listRes.json();
  assert.ok(listBody.some((u) => u.id === created.id && u.name === 'Alice'));
});

test('POST /users rejects missing fields with 400', async () => {
  const res = await fetch(`${baseUrl}/users`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ name: 'Bob' }),
  });
  assert.equal(res.status, 400);
  const body = await res.json();
  assert.ok(typeof body.error === 'string' && body.error.length > 0);
});
