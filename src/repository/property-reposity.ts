import { Property } from '../entities';
import { PropertyInput } from '../entities/PropertyInput';
import BaseRepository from './base-repository';

export class PropertyRepository extends BaseRepository<
  Property,
  PropertyInput
> {
  name: string = 'property-repositoy-sqlite';

  constructor() {
    super();
    Object.setPrototypeOf(this, PropertyRepository.prototype);
  }

  insert(data: PropertyInput): Property {
    return new Property();
  }

  update(data: PropertyInput): Property {
    return new Property();
  }

  findOne(id: string): Property {
    return new Property();
  }

  findAll(data: PropertyInput): Property[] {
    const properties: Property[] = [];
    return properties;
  }

  getName(): string {
    return this.name;
  }
}
