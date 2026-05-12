import { Router } from 'express';
import { add, list } from '../stores/orders.js';

const router = Router();

router.get('/', (req, res) => {
  res.status(200).json(list());
});

router.post('/', (req, res) => {
  const body = req.body ?? {};
  const { productId, qty } = body;

  if (typeof productId !== 'string' || productId.trim().length === 0) {
    return res.status(400).json({ error: 'productId must be a non-empty string' });
  }

  if (!Number.isInteger(qty) || qty < 1) {
    return res.status(400).json({ error: 'qty must be an integer >= 1' });
  }

  const order = add({ productId, qty });
  res.status(201).json(order);
});

export default router;
