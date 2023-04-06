import { DataSource } from 'typeorm';

// Using environment variables
import dotenv from 'dotenv';
dotenv.config();

const dataSource = new DataSource({
    type: process.env.TYPEORM_CONNECTION as any,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT as any,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    entities: [process.env.TYPEORM_ENTITIES],
    migrations: [process.env.TYPEORM_MIGRATIONS],
    migrationsTableName: process.env.TYPEORM_MIGRATIONS_TABLE_NAME,
});

dataSource
    .initialize()
    .then(() => {
        console.log(`Data Source has been initialized`);
    })
    .catch((err) => {
        console.error(`Data Source initialization error`, err);
    });

export default dataSource;
