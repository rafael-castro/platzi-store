import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ProductsModule } from './products/products.module.js';
import { UsersModule } from './users/users.module.js';
import { CustomersModule } from './customers/customers.module.js';
import { OrdersModule } from './orders/orders.module.js';
import { HttpModule, HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Module({
    imports: [
        HttpModule,
        ProductsModule,
        UsersModule,
        CustomersModule,
        OrdersModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: 'API_KEY',
            useValue: process.env.NODE_ENV === 'prod' ? 'PROD' : 'DEV',
        },
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
})
export class AppModule {}
