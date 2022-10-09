import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule, HttpService } from '@nestjs/axios';

import { lastValueFrom } from 'rxjs';

import Joi from 'joi';

import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ProductsModule } from './products/products.module.js';
import { UsersModule } from './users/users.module.js';
import { CustomersModule } from './customers/customers.module.js';
import { OrdersModule } from './orders/orders.module.js';
import { DatabaseModule } from './database/database.module.js';

import { environments } from './environments.js';
import config from './config.js';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: environments[process.env.NODE_ENV] || '.env',
            load: [config],
            isGlobal: true,
            validationSchema: Joi.object({
                API_KEY: Joi.number().required(),
                DATABASE_NAME: Joi.string().required(),
                DATABASE_PORT: Joi.number().required(),
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
