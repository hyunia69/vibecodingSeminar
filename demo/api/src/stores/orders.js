const orders = [];
let counter = 0;

export function add({ productId, qty }) {
  counter += 1;
  const order = { id: `o-${counter}`, productId, qty };
  orders.push(order);
  return order;
}

export function list() {
  return orders;
}

export default { add, list };
