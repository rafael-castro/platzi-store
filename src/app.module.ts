import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ProductsModule } from './products/products.module.js';
import { UsersModule } from './users/users.module.js';
import { CustomersModule } from './customers/customers.module.js';
import { OrdersModule } from './orders/orders.module.js';

@Module({
    imports: [ProductsModule, UsersModule, CustomersModule, OrdersModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
