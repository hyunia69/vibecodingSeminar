import { Router } from 'express';
import { add, list } from '../stores/products.js';

const router = Router();

router.get('/', (req, res) => {
  res.status(200).json(list());
});

router.post('/', (req, res) => {
  const { name, price } = req.body ?? {};

  if (typeof name !== 'string' || name.trim().length === 0) {
    return res.status(400).json({ error: 'name must be a non-empty string' });
  }

  if (typeof price !== 'number' || !(price >= 0)) {
    return res.status(400).json({ error: 'price must be a number >= 0' });
  }

  const product = add({ name, price });
  return res.status(201).json(product);
});

export default router;
