import { Injectable, NotFoundException } from '@nestjs/common';
import { Order } from './../../orders/entities/order.entity';
import { UserId } from './../dtos/user.dto';
import { Role, User } from './../entities/user.entity';
import { ProductsService } from './../../products/services/products.service';

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

    constructor(private productsService: ProductsService) {}

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
