import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import config from 'src/config';

@Global()
@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            inject: [config.KEY],
            useFactory: (configService: ConfigType<typeof config>) => {
                const { user, host, database, password, port } =
                    configService.postgres;
                return {
                    type: 'postgres',
                    host,
                    port,
                    username: user,
                    password,
                    database,
                    synchronize: false,
                    autoLoadEntities: true,
                };
            },
        }),
    ],
    providers: [
        {
            provide: 'API_KEY',
            useValue: process.env.NODE_ENV === 'prod' ? 'PROD' : 'DEV',
        },
    ],
    exports: ['API_KEY', TypeOrmModule],
})
export class DatabaseModule {}
