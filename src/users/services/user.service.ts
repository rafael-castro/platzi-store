import { Injectable, NotFoundException } from '@nestjs/common';
import { Order } from './../../orders/entities/order.entity.js';
import { UserId } from './../dtos/user.dto.js';
import { Role, User } from './../entities/user.entity.js';
import { ProductsService } from './../../products/services/products.service.js';

@Injectable()
export class UserService {
    private counterId = 1;
    private users: User[] = [
        {
            id: 1,
            email: '1@test.com',
            password: '1',
            role: Role.ADMIN,
        },
    ];
    private productsService: ProductsService;

    constructor(productsService: ProductsService) {
        this.productsService = productsService;
    }

    find() {
        return this.users;
    }

    findOne(id: UserId) {
        const userIndex = this.getIndex(id);
        if (userIndex < 0) {
            throw new NotFoundException(`user ${id} not found`);
        }
        return this.users[userIndex];
    }

    findOrdersByUser(id: UserId): Order {
        const user = this.findOne(id);
        return {
            date: new Date(),
            user: user,
            products: this.productsService.find(),
        };
    }

    private getIndex(id: UserId): number {
        return this.users.findIndex((item) => item.id === id);
    }
}
