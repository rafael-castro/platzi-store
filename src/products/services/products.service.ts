import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
    ProductId,
    CreateProductDto,
    UpdateProductDto,
} from 'src/products/dtos/products.dto';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
    ) {}

    find() {
        return this.productRepository.find();
    }

    async findById(id: ProductId) {
        const product = await this.productRepository.findOneBy({ id });
        if (!product) {
            throw new NotFoundException(`Product ${id} not found`);
        }
        return product;
    }

    create(payload: CreateProductDto) {
        const newProduct = this.productRepository.create(payload);
        return this.productRepository.save(newProduct);
    }

    async update(id: ProductId, payload: UpdateProductDto) {
        const product = await this.productRepository.findOneBy({ id });
        if (!product) {
            throw new NotFoundException(`Product ${id} not found`);
        }
        this.productRepository.merge(product, payload);
        return this.productRepository.save(product);
    }

    delete(id: ProductId) {
        return this.productRepository.delete(id);
    }
}
