import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsController } from 'src/products/controllers/products.controller';
import { ProductsService } from 'src/products/services/products.service';
import { Product } from './entities/product.entity';
import { CategoriesController } from 'src/products/controllers/categories.controller';
import { CategoriesService } from 'src/products/services/categories.service';
import { Category } from './entities/category.entity';
import { BrandsController } from 'src/products/controllers/brands.controller';
import { BrandsService } from 'src/products/services/brands.service';
import { Brand } from './entities/brand.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Product, Brand, Category])],
    controllers: [ProductsController, CategoriesController, BrandsController],
    providers: [ProductsService, CategoriesService, BrandsService],
    exports: [ProductsService],
})
export class ProductsModule {}
