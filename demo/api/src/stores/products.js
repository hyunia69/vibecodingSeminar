const products = [];
let counter = 0;

export function add({ name, price }) {
  counter += 1;
  const product = { id: `p-${counter}`, name, price };
  products.push(product);
  return product;
}

export function list() {
  return products;
}

export function _reset() {
  products.length = 0;
  counter = 0;
}

export default { add, list, _reset };
