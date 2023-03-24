import request from 'supertest';
import app from '../../app';
import { seedDb, getDataSource } from '../../dataSource';

describe('propertyRoutes', () => {
  beforeAll(async () => {
    const { dataSource } = getDataSource();
    await dataSource.initialize();

    await dataSource.initialize();
    await seedDb();
  });

  describe('GET /properties', () => {
    it('should return all properties', async () => {
      const response = await request(app).get('/properties');

      expect(response.text).toBe('GET all properties');
    });
  });
});
