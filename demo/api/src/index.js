import express from 'express';
import usersRouter from './routes/users.js';
import productsRouter from './routes/products.js';
import ordersRouter from './routes/orders.js';

const app = express();
app.use(express.json());

app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/orders', ordersRouter);

const PORT = process.env.PORT || 3737;

const isMainModule =
  process.argv[1] !== undefined && (
    import.meta.url === `file://${process.argv[1]}` ||
    import.meta.url === `file:///${process.argv[1].replace(/\\/g, '/')}`
  );

if (isMainModule) {
  app.listen(PORT, () => {
    console.log(`API listening on http://localhost:${PORT}`);
  });
}

export default app;
