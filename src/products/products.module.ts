import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsController } from 'src/products/controllers/products.controller';
import { ProductsService } from 'src/products/services/products.service';
import { Product } from './entities/product.entity';
import { CategoriesController } from 'src/products/controllers/categories.controller';
import { CategoriesService } from 'src/products/services/categories.service';
import { BrandsService } from 'src/products/services/brands.service';
import { BrandsController } from 'src/products/controllers/brands.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Product])],
    controllers: [ProductsController, CategoriesController, BrandsController],
    providers: [ProductsService, CategoriesService, BrandsService],
    exports: [ProductsService],
})
export class ProductsModule {}
