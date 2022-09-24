import { Module } from '@nestjs/common';
import { CategoriesController } from './controllers/categories.controller.js';
import { ProductsController } from './controllers/products.controller.js';
import { CategoriesService } from './services/categories.service.js';
import { ProductsService } from './services/products.service.js';
import { BrandsService } from './services/brands.service.js';
import { BrandsController } from './controllers/brands.controller.js';

@Module({
    controllers: [ProductsController, CategoriesController, BrandsController],
    providers: [ProductsService, CategoriesService, BrandsService],
    exports: [ProductsService],
})
export class ProductsModule {}
