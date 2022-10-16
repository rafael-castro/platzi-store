import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule, HttpService } from '@nestjs/axios';

import { lastValueFrom } from 'rxjs';

import Joi from 'joi';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { CustomersModule } from './customers/customers.module';
import { OrdersModule } from './orders/orders.module';
import { DatabaseModule } from './database/database.module';

import { environments } from './environments';
import config from './config';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: environments[process.env.NODE_ENV] || '.api.env',
            load: [config],
            isGlobal: true,
            validationSchema: Joi.object({
                API_KEY: Joi.number().required(),
                DATABASE_NAME: Joi.string().required(),
                DATABASE_PORT: Joi.number().required(),
                PG_DATABASE: Joi.string().required(),
                PG_USER: Joi.string().required(),
                PG_PASSWORD: Joi.string().required(),
                PG_PORT: Joi.number().required(),
                PG_HOST: Joi.string().required(),
            }),
        }),
        HttpModule,
        ProductsModule,
        UsersModule,
        CustomersModule,
        OrdersModule,
        DatabaseModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: 'TASKS',
            inject: [HttpService],
            useFactory: async (httpService: HttpService) => {
                const source$ = httpService.get(
                    'https://jsonplaceholder.typicode.com/todos',
                );
                const task = await lastValueFrom(source$);
                return task.data;
            },
        },
    ],
    exports: ['TASKS'],
})
export class AppModule {}
