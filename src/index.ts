import app from './app';
import { seedDb, getDataSource } from './dataSource';

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    const { dataSource } = getDataSource();
    await dataSource.initialize();

    console.log('Database connected');

    await seedDb();
    console.log('Database populated with test data');

    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start the server', error);
    process.exit(1);
  }
})();
