import { Router } from 'express';
import { add, list } from '../stores/users.js';

const router = Router();

function isNonEmptyString(v) {
  return typeof v === 'string' && v.trim().length > 0;
}

router.get('/', (req, res) => {
  res.status(200).json(list());
});

router.post('/', (req, res) => {
  const body = req.body ?? {};
  const { name, email } = body;
  if (!isNonEmptyString(name)) {
    return res.status(400).json({ error: 'name must be a non-empty string' });
  }
  if (!isNonEmptyString(email)) {
    return res.status(400).json({ error: 'email must be a non-empty string' });
  }
  const user = add({ name, email });
  return res.status(201).json(user);
});

export default router;
