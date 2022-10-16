import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
    return {
        database: {
            name: process.env.DATABASE_NAME,
            port: process.env.DATABASE_PORT,
        },
        postgres: {
            database: process.env.PG_DATABASE,
            user: process.env.PG_USER,
            password: process.env.PG_PASSWORD,
            port: parseInt(process.env.PG_PORT, 10),
            host: process.env.PG_HOST,
        },
        apiKey: process.env.API_KEY,
    };
});
