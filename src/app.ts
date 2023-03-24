import 'express-async-errors';
import express, { Application } from 'express';
import { json } from 'body-parser';

import { NotFoundError } from './shared/errorss';
import { errorHandler } from './shared/middlewares';

import { usePropertyRoutes } from './routes';
import { PropertyService } from './services';
import { PropertyRepository } from './repository/property-reposity';

const app: Application = express();

app.use(json());

app.get('/health', (_req, res) => {
  res.status(200).send({ success: true });
});

const propertyService = new PropertyService(new PropertyRepository());
const propertyRoutes = usePropertyRoutes(propertyService);

app.use('/properties', propertyRoutes());

app.all('*', () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export default app;
