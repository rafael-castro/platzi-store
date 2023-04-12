import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
    ProductId,
    CreateProductDto,
    UpdateProductDto,
} from 'src/products/dtos/products.dto';
import { Product } from 'src/products/entities/product.entity';
import { BrandsService } from './brands.service';
import { CategoriesService } from './categories.service';
import { CategoryId } from '../dtos/categories.dto';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
        private brandsService: BrandsService,
        private categoriesService: CategoriesService,
    ) {}

    find() {
        return this.productRepository.find({
            relations: ['brand', 'categories'],
        });
    }

    async findById(id: ProductId) {
        const product = await this.productRepository
            .createQueryBuilder('product')
            .where('product.id = :id', { id: id })
            .getOne();

        if (!product) {
            throw new NotFoundException(`Product ${id} not found`);
        }

        return product;
    }
    async findByIds(ids: ProductId[]): Promise<Product[]> {
        const products = await this.productRepository
            .createQueryBuilder()
            .select('product')
            .from(Product, 'product')
            .where('category.id IN (:...ids)', { ids: ids })
            .getMany();
        if (!products) {
            throw new NotFoundException(`products ${ids} not found`);
        }
        return products;
    }

    async create(payload: CreateProductDto) {
        const newProduct = this.productRepository.create(payload);
        const brand = await this.brandsService.findById(payload.brandId);
        newProduct.brand = brand;
        const categories = await this.categoriesService.findByIds(
            payload.categoriesIds,
        );

        if (categories) {
            newProduct.categories = categories;
        }

        return this.productRepository.save(newProduct);
    }

    async update(id: ProductId, payload: UpdateProductDto) {
        const product = await this.productRepository
            .createQueryBuilder('product')
            .where('product.id = :id', { id: id })
            .getOne();

        if (!product) {
            throw new NotFoundException(`Product ${id} not found`);
        }

        if (payload.brandId) {
            const brand = await this.brandsService.findById(payload.brandId);
            if (!brand) {
                throw new NotFoundException(
                    `brand ${payload.brandId} not found`,
                );
            }
            product.brand = brand;
        }

        if (payload.categoriesIds) {
            const categories = await this.categoriesService.findByIds(
                payload.categoriesIds,
            );
            if (categories) {
                product.categories = categories;
            }
        }

        this.productRepository.merge(product, payload);
        return this.productRepository.save(product);
    }

    delete(id: ProductId) {
        return this.productRepository.delete(id);
    }

    async addCategoryByProduct(productId: ProductId, categoryId: CategoryId) {
        await this.productRepository
            .createQueryBuilder('product')
            .relation(Product, 'categories')
            .of(productId)
            .add(categoryId);
        return await this.findById(productId);
    }

    async removeCategoryByProduct(
        productId: ProductId,
        categoryId: CategoryId,
    ) {
        await this.productRepository
            .createQueryBuilder('product')
            .relation(Product, 'categories')
            .of(productId)
            .remove(categoryId);
        return await this.findById(productId);
    }
}
