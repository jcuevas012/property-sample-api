import 'express-async-errors';
import express, { Application } from 'express';
import { json } from 'body-parser';
import { propertyRoutes } from './routes';
import { NotFoundError } from './shared/errorss';
import { errorHandler } from './shared/middlewares';

const app: Application = express();

app.use(json());

app.use('/properties', propertyRoutes);

app.all('*', () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export default app;
