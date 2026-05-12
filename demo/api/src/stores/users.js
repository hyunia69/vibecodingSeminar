const users = [];
let counter = 0;

export function add({ name, email }) {
  counter += 1;
  const user = { id: `u-${counter}`, name, email };
  users.push(user);
  return user;
}

export function list() {
  return users;
}

export default { add, list };
