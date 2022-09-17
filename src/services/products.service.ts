import { Injectable } from '@nestjs/common';
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

    findAll() {
        return this.products;
    }

    findOne(id: number) {
        return this.products.find((item) => item.id === id);
    }

    create(payload: any) {
        const newProduct = {
            ...payload,
            id: this.counterId,
        };
        this.counterId = this.counterId + 1;
        this.products.push(newProduct);
        return newProduct;
    }

    update(id: number, payload: any) {
        const productIndex = this.products.findIndex((item) => item.id === id);
        this.products[productIndex] = {
            ...this.products[productIndex],
            ...payload,
        };
        return this.products[productIndex];
    }

    delete(id: number) {
        const productIndex = this.products.findIndex((item) => item.id === id);
        return this.products.splice(
            productIndex,
            1,
            this.products[productIndex],
        );
    }
}
