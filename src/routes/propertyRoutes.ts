import express from 'express';
import { PropertyService } from '../services';
import { PropertyRepository } from '../repository/property-reposity';

const dataSource = new PropertyRepository();
const service = new PropertyService(dataSource);

export const propertyRoutes = express.Router();

propertyRoutes.get('/', async (req, res) => {
  res.send('GET all properties');
});

propertyRoutes.get('/:id', async (req, res) => {
  res.send('GET property by id');
});

propertyRoutes.post('/', async (req, res) => {
  res.send('Create property');
});

propertyRoutes.put('/', async (req, res) => {
  res.send('Update property');
});

propertyRoutes.delete('/', async (req, res) => {
  res.send('Delete property');
});
