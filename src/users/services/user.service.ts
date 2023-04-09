import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Order } from 'src/orders/entities/order.entity';
import { CreateUserDto, UpdateUserDto, UserId } from 'src/users/dtos/user.dto';
import { User } from 'src/users/entities/user.entity';
import { ProductsService } from 'src/products/services/products.service';
import { CustomersService } from 'src/customers/services/customers.service';
import { CustomerId } from 'src/customers/dtos/customer.dto';

@Injectable()
export class UserService {
    constructor(
        private productsService: ProductsService,
        private customersService: CustomersService,
        @InjectRepository(User) private userRepository: Repository<User>,
    ) {}

    async find() {
        return await this.userRepository.find({ relations: ['customer'] });
    }

    async findOne(id: UserId) {
        const user = await this.userRepository
            .createQueryBuilder('user')
            .where('user.id = :id', { id: id })
            .getOne();
        if (!user) {
            throw new NotFoundException(`user ${id} not found`);
        }
        return user;
    }

    async findOrdersByUser(id: UserId): Promise<Order[]> {
        return await this.customersService.findOrdersByCustomer(
            id as CustomerId,
        );
    }

    async create(payload: CreateUserDto) {
        const newUser = this.userRepository.create(payload);
        if (payload.customerId) {
            const customer = await this.customersService.findOne(
                payload.customerId,
            );
            newUser.customer = customer;
        }
        return this.userRepository.save(newUser);
    }

    async update(id: UserId, payload: UpdateUserDto) {
        const user = await this.userRepository
            .createQueryBuilder('user')
            .where('user.id = :id', { id: id })
            .getOne();
        if (!user) {
            throw new NotFoundException(`User ${id} not found`);
        }
        if (payload.customerId) {
            const customer = await this.customersService.findOne(
                payload.customerId,
            );
            user.customer = customer;
        }
        this.userRepository.merge(user, payload);
        return this.userRepository.save(user);
    }

    delete(id: UserId) {
        return this.userRepository.delete(id);
    }
}
