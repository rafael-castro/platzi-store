import { Injectable, NotFoundException } from '@nestjs/common';
import {
    ProductId,
    CreateProductDto,
    UpdateProductDto,
} from './../dtos/products.dto.js';
import { Product } from './../entities/product.entity.js';

@Injectable()
export class ProductsService {
    private counterId = 1;
    private products: Product[] = [
        {
            id: 1,
            name: '1',
            description: '1',
            price: 1,
            stock: 1,
            image: '1',
        },
    ];

    find() {
        return this.products;
    }

    findById(id: ProductId) {
        const product = this.products.find((item) => item.id === id);
        if (!product) {
            throw new NotFoundException(`Product ${id} not found`);
        }
        return product;
    }

    create(payload: CreateProductDto) {
        this.counterId = this.counterId + 1;
        const newProduct = {
            ...payload,
            id: this.counterId,
        };
        this.products.push(newProduct);
        return newProduct;
    }

    update(id: ProductId, payload: UpdateProductDto) {
        const productIndex = this.products.findIndex((item) => item.id === id);
        if (productIndex < 0) {
            throw new NotFoundException(`Product ${id} not found`);
        }
        this.products[productIndex] = {
            ...this.products[productIndex],
            ...payload,
        };
        return this.products[productIndex];
    }

    delete(id: ProductId) {
        const productIndex = this.products.findIndex((item) => item.id === id);
        if (productIndex < 0) {
            throw new NotFoundException(`Product ${id} not found`);
        }
        return this.products.splice(productIndex, 1);
    }
}
