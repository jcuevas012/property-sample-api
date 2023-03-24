import { Property } from '../entities';
import { PropertyInput } from '../entities/PropertyInput';
import { getDataSource } from '../dataSource';
import { Repository } from 'typeorm';

const { dataSource } = getDataSource();

export class PropertyRepository {
  propertyRepository: Repository<Property>;
  identifier: string = 'property-repositoy-sqlite';

  constructor() {
    Object.setPrototypeOf(this, PropertyRepository.prototype);
    this.propertyRepository = dataSource.getRepository(Property);
  }

  insert(data: PropertyInput): Promise<Property> {
    const newProperty = this.buildProperty(data);
    return this.propertyRepository.save(newProperty);
  }

  async update(id: number, data: PropertyInput): Promise<Property | null> {
    const newProperty = this.buildProperty(data);

    await this.propertyRepository.update(id, newProperty);

    return this.propertyRepository.findOneBy({
      id,
    });
  }

  findOne(id: number): Promise<Property | null> {
    return this.propertyRepository.findOneBy({
      id,
    });
  }

  findAll(options: { offset: number; limit: number }) {
    const properties = this.propertyRepository
      .createQueryBuilder('property')
      .skip(options.offset)
      .take(options.limit)
      .getMany();
    return properties;
  }

  async delete(id: number) {
    this.propertyRepository.delete(id);
  }

  getName(): string {
    return this.identifier;
  }

  buildProperty(data: PropertyInput): Property {
    const property = new Property();
    property.address = data.address;
    property.bathrooms = data.bathrooms;
    property.bedrooms = data.bedrooms;
    property.price = data.price;
    property.type = data.type;
    return property;
  }
}
