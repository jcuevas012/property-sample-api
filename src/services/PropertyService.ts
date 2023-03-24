import { PropertyInput } from '../entities/PropertyInput';
import { PropertyRepository } from '../repository/property-reposity';

// Handle business logic here
export class PropertyService {
  dataSource: PropertyRepository;
  identifier = 'propery-service-with-sqlite-repository';

  constructor(dataSource: PropertyRepository) {
    this.dataSource = dataSource;
  }

  findAll(options: { offset: number; limit: number }) {
    try {
      return this.dataSource.findAll(options);
    } catch (error) {
      console.log(error);
      throw new Error('Something went wrong pulling property');
    }
  }

  findById(id: number) {
    try {
      return this.dataSource.findOne(id);
    } catch (error) {
      console.log(error);
      throw new Error('Something went wrong removing property');
    }
  }

  create(input: PropertyInput) {
    try {
      return this.dataSource.insert(input);
    } catch (error) {
      console.log(error);
      throw new Error('Something went wrong saving property');
    }
  }

  update(id: number, input: PropertyInput) {
    try {
      return this.dataSource.update(id, input);
    } catch (error) {
      console.log(error);
      throw new Error('Something went wrong updating property');
    }
  }

  remove(id: number) {
    try {
      return this.dataSource.delete(id);
    } catch (error) {
      console.log(error);
      throw new Error('Something went wrong removing property');
    }
  }
}
