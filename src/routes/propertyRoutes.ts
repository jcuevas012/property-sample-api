import express, { Request, Response } from 'express';
import { PropertyService } from '../services';
import { NotFoundError } from '../shared/errorss';
import { requestValidator } from '../shared/middlewares';
import newPropertyValidator from '../shared/validators/new-property-validator';

export function usePropertyRoutes(service: PropertyService) {
  return () => {
    const routes = express.Router();

    routes.get('/', async (req: Request, res: Response) => {
      const { limit, offset } = req.query;

      const options = {
        limit: limit ? parseInt(limit as string) : 10,
        offset: offset ? parseInt(offset as string) : 0,
      };

      const data = await service.findAll(options);
      res.status(200).send(data);
    });

    routes.get('/:id', async (req, res) => {
      const id: number = parseInt(req.params.id);

      const found = await service.findById(id);

      if (!found) {
        throw new NotFoundError(`Not property found with provided id`);
      }

      res.status(200).send(found);
    });

    routes.post(
      '/',
      newPropertyValidator,
      requestValidator,
      async (req: Request, res: Response) => {
        const params = req.body;

        const data = await service.create(params);

        res.status(201).send(data);
      },
    );

    routes.put('/:id', async (req, res) => {
      const id = parseInt(req.params.id);
      const params = req.body;

      const found = service.findById(id);

      if (!found) {
        throw new NotFoundError(`Not property found with provided id`);
      }

      await service.update(id, params);

      res.status(204).send();
    });

    routes.delete('/:id', async (req, res) => {
      const id = parseInt(req.params.id);

      const data = await service.remove(id as number);

      res.status(200).send(data);
    });

    return routes;
  };
}
