// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { DataSource } from 'typeorm';
import { Property } from './entities';

let dataSource: DataSource;

export const seedDb = async () => {
  const { default: data } = await import('./data/seed.json');

  const { manager } = getDataSource();

  await manager.insert(Property, data as Array<Property>);
};

export const getDataSource = () => {
  if (!dataSource) {
    dataSource = new DataSource({
      logging: false,
      type: 'sqlite',
      database: ':memory:',
      entities: [Property],
      synchronize: true, // synchronize the database schema with the entity classes
    });
  }
  return { dataSource, manager: dataSource.manager };
};
