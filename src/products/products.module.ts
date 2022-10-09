import { Module } from '@nestjs/common';
import { CategoriesController } from './controllers/categories.controller';
import { ProductsController } from './controllers/products.controller';
import { CategoriesService } from './services/categories.service';
import { ProductsService } from './services/products.service';
import { BrandsService } from './services/brands.service';
import { BrandsController } from './controllers/brands.controller';

@Module({
    controllers: [ProductsController, CategoriesController, BrandsController],
    providers: [ProductsService, CategoriesService, BrandsService],
    exports: [ProductsService],
})
export class ProductsModule {}
