import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ProductsController } from './controllers/products.controller.js';
import { CategoriesController } from './controllers/categories.controller.js';
import { BrandsController } from './controllers/brands.controller.js';
import { OrdersController } from './controllers/orders.controller.js';
import { CustomersController } from './controllers/customers.controller.js';
import { UsersController } from './controllers/users.controller.js';

@Module({
    imports: [],
    controllers: [
        AppController,
        ProductsController,
        CategoriesController,
        BrandsController,
        OrdersController,
        CustomersController,
        UsersController,
    ],
    providers: [AppService],
})
export class AppModule {}
