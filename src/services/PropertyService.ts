import { PropertyInput } from '../entities/PropertyInput';
import { PropertyRepository } from '../repository/property-reposity';

// Handle business logic here
export class PropertyService {
  dataSource: PropertyRepository;

  constructor(dataSource: PropertyRepository) {
    this.dataSource = dataSource;
  }

  findAll(options: PropertyInput) {
    return this.dataSource.findAll(options);
  }

  findById(id: string) {
    return this.dataSource.findOne(id);
  }

  create(input: PropertyInput) {
    return this.dataSource.insert(input);
  }

  update(input: PropertyInput) {
    return this.dataSource.insert(input);
  }
}
