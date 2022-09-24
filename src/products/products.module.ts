import { Module } from '@nestjs/common';
import { CategoriesController } from './controllers/categories.controller.js';
import { ProductsController } from './controllers/products.controller.js';
import { CategoriesService } from './services/categories.service.js';
import { ProductsService } from './services/products.service.js';

@Module({
    controllers: [ProductsController, CategoriesController],
    providers: [ProductsService, CategoriesService],
})
export class ProductsModule {}
