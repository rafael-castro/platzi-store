import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import { Client } from 'pg';

import config from 'src/config';

@Global()
@Module({
    providers: [
        {
            provide: 'API_KEY',
            useValue: process.env.NODE_ENV === 'prod' ? 'PROD' : 'DEV',
        },
        {
            provide: 'PG_CLIENT',
            useFactory: (configService: ConfigType<typeof config>) => {
                const { user, host, database, password, port } =
                    configService.postgres;
                const client = new Client({
                    user,
                    host,
                    database,
                    password,
                    port,
                });

                client.connect();

                return client;
            },
            inject: [config.KEY],
        },
    ],
    exports: ['API_KEY', 'PG_CLIENT'],
})
export class DatabaseModule {}
