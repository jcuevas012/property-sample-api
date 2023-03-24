import request from 'supertest';
import app from '../../app';
import { seedDb, getDataSource } from '../../dataSource';

describe('propertyRoutes CRUD endpoints GET, POST, DELETE, PUT', () => {
  beforeAll(async () => {
    const { dataSource } = getDataSource();
    await dataSource.initialize();
    await seedDb();
  });

  describe('GET /properties', () => {
    it('should return first 10 properties when not pagination params, 200 status code', async () => {
      const response = await request(app).get('/properties');

      expect(response.statusCode).toBe(200);
      expect(response.body).not.toBe([]);
      expect(response.body.length).toBe(10);
    });

    it('should return list of properties base on list and pagination params limit and offset, 200 status code', async () => {
      const response = await request(app).get(
        `/properties?offset=${5}&limit=${5}`,
      );

      expect(response.statusCode).toBe(200);
      expect(response.body).not.toBe([]);
      expect(response.body[0].id).toBeTruthy();
      expect(response.body[0].address).toBeTruthy();
      expect(response.body[0].price).toBeTruthy();
      expect(response.body[0].bathrooms).toBeTruthy();
      expect(response.body[0].bedrooms).toBeTruthy();
      expect(response.body.length).toBe(5);
    });

    it('should return list of properties base on list and pagination params with limit and without offset, 200 status code', async () => {
      const response = await request(app).get(`/properties?&limit=${10}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).not.toBe([]);
      expect(response.body[0].id).toBeTruthy();
      expect(response.body[0].address).toBeTruthy();
      expect(response.body[0].price).toBeTruthy();
      expect(response.body[0].bathrooms).toBeTruthy();
      expect(response.body[0].bedrooms).toBeTruthy();
      expect(response.body.length).toBe(10);
    });

    it('should return list of properties base on list and pagination params without limit and with offset, 200 status code', async () => {
      const response = await request(app).get(`/properties?&offset=${10}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).not.toBe([]);
      expect(response.body[0].id).toBeTruthy();
      expect(response.body[0].address).toBeTruthy();
      expect(response.body[0].price).toBeTruthy();
      expect(response.body[0].bathrooms).toBeTruthy();
      expect(response.body[0].bedrooms).toBeTruthy();
      expect(response.body.length).toBe(10);
    });
  });
});

describe('GET /properties By Id', () => {
  it('should return property base on provided id, 200 status code', async () => {
    const propertyId = 10;
    const response = await request(app).get(`/properties/${propertyId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).not.toBeFalsy();
    expect(response.body.id).toBe(propertyId);
    expect(typeof response.body.address).toBe('string');
    expect(typeof response.body.bathrooms).toBe('number');
    expect(typeof response.body.bedrooms).toBe('number');
    expect(typeof response.body.price).toBe('number');
  });

  it('should return 404 when not found property', async () => {
    const propertyId = 1377;
    const response = await request(app).get(`/properties/${propertyId}`);

    console.log(response.statusCode);

    expect(response.statusCode).toBe(404);
    expect(response.body).not.toBeFalsy();
    expect(response.body.errors).not.toBeFalsy();
    expect(response.body.errors[0]).not.toBeFalsy();
    expect(response.body.errors[0].message).toBe(
      'Not property found with provided id',
    );
  });

  describe('POST /properties', () => {
    it('should return 201 after property create', async () => {
      const newProperty = {
        address: 'Santo Domingo Norte, RD, Ciudad Modelo',
        price: 200,
        bedrooms: 1,
        bathrooms: 1,
        type: 'Condominium',
      };
      const response = await request(app).post(`/properties`).send(newProperty);

      expect(response.statusCode).toBe(201);
      expect(response.body).not.toBeFalsy();
      expect(typeof response.body.id).toBe('number');
      expect(typeof response.body.address).toBe('string');
      expect(typeof response.body.bathrooms).toBe('number');
      expect(typeof response.body.bedrooms).toBe('number');
      expect(typeof response.body.price).toBe('number');

      expect(response.body.address).toBe(newProperty.address);
      expect(response.body.bathrooms).toBe(newProperty.bathrooms);
      expect(response.body.bedrooms).toBe(newProperty.bedrooms);
      expect(response.body.price).toBe(newProperty.price);
    });

    it('should return 400 when bad request creating a property with invalid data', async () => {
      const newProperty = {
        address: 'Santo Domingo Norte, RD, Ciudad Modelo',
        price: 200,
        bedrooms: 0, // not badrooms and bedroooms
        bathrooms: 0,
        type: 'Condominium',
      };
      const response = await request(app).post(`/properties`).send(newProperty);

      expect(response.statusCode).toBe(400);
    });
  });

  describe('DELETE /properties by Id', () => {
    it('should return 200 after property delete', async () => {
      const propertyId = 1;
      const response = await request(app).delete(`/properties/${propertyId}`);

      expect(response.statusCode).toBe(200);
    });
  });

  describe('PUT /properties', () => {
    it('should return 204 after property updated not content', async () => {
      const newProperty = {
        address: 'Santo Domingo Norte, RD, Ciudad Modelo',
        price: 200,
        bedrooms: 1,
        bathrooms: 1,
        type: 'Condominium',
      };
      let propertyFound = await request(app)
        .get(`/properties/${1}`)
        .send(newProperty);

      const updateProperty = {
        ...propertyFound.body,
        ...newProperty,
      };

      const response = await request(app)
        .put(`/properties/${1}`)
        .send(updateProperty);

      expect(response.statusCode).toBe(204);

      // expect(response.body).not.toBeFalsy();
      // expect(typeof response.body.id).toBe('number');
      // expect(typeof response.body.address).toBe('string');
      // expect(typeof response.body.bathrooms).toBe('number');
      // expect(typeof response.body.bedrooms).toBe('number');
      // expect(typeof response.body.price).toBe('number');

      // expect(response.body.address).toBe(newProperty.address);
      // expect(response.body.bathrooms).toBe(newProperty.bathrooms);
      // expect(response.body.bedrooms).toBe(newProperty.bedrooms);
      // expect(response.body.price).toBe(newProperty.price);
    });

    it('should return 204 after property updated and validate updated record', async () => {
      const newProperty = {
        address: 'Santo Domingo Norte, RD, Ciudad Modelo',
        price: 200,
        bedrooms: 1,
        bathrooms: 1,
        type: 'Condominium',
      };

      const propertyId = 2;

      const getProperty = async (id: number) => {
        return await request(app).get(`/properties/${id}`);
      };

      const propertyFound = await getProperty(propertyId);

      const updateProperty = {
        ...propertyFound.body,
        ...newProperty,
      };

      const response = await request(app)
        .put(`/properties/${propertyId}`)
        .send(updateProperty);

      const propertyUpdateFound = await getProperty(propertyId);

      expect(response.statusCode).toBe(204);
      expect(response.body).not.toBeFalsy();

      expect(propertyUpdateFound.body.address).toBe(newProperty.address);
      expect(propertyUpdateFound.body.bathrooms).toBe(newProperty.bathrooms);
      expect(propertyUpdateFound.body.bedrooms).toBe(newProperty.bedrooms);
      expect(propertyUpdateFound.body.price).toBe(newProperty.price);
    });

    it('should return 400 after property updated when not valid data ', async () => {
      const newProperty = {
        address: 'Santo Domingo Norte, RD, Ciudad Modelo',
        price: 200,
        bedrooms: 0,
        bathrooms: 1,
        type: 'Condominium',
      };
      let propertyFound = await request(app)
        .get(`/properties/${1}`)
        .send(newProperty);

      const updateProperty = {
        ...propertyFound.body,
        ...newProperty,
      };

      const response = await request(app)
        .put(`/properties/${1}`)
        .send(updateProperty);

      expect(response.statusCode).toBe(400);
      expect(response.body).not.toBeFalsy();
      expect(response.body.errors).not.toBeFalsy();
      expect(response.body.errors[0]).not.toBeFalsy();
      expect(response.body.errors[0].message).toBe(
        'Property bedrooms is not valid',
      );
    });
  });
});
