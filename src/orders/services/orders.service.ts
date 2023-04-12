import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Order } from 'src/orders/entities/order.entity';
import { CustomersService } from 'src/customers/services/customers.service';
import { CustomerId } from 'src/customers/dtos/customer.dto';
import {
    CreateOrderDto,
    CreateOrderItemDto,
    OrderId,
} from '../dtos/orders.dto';
import { OrderItem } from 'src/orders/entities/order-item.entity';
import { ProductsService } from 'src/products/services/products.service';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order) private orderRepository: Repository<Order>,
        @InjectRepository(OrderItem)
        private orderItemRepository: Repository<OrderItem>,
        private customersService: CustomersService,
        private productsService: ProductsService,
    ) {}

    async findOrdersByCustomer(id: CustomerId): Promise<Order[]> {
        return await this.customersService.findOrdersByCustomer(id);
    }

    async findById(id: OrderId) {
        return await this.orderRepository
            .createQueryBuilder()
            .select('order')
            .from(Order, 'order')
            .where('order.id = :id', { id: id })
            .getOne();
    }

    async create(payload: CreateOrderDto) {
        const newOrder = new Order();

        if (payload.customerId) {
            newOrder.customer = await this.customersService.findOne(
                payload.customerId,
            );
        }

        return this.orderRepository.save(newOrder);
    }

    async createItem(id: OrderId, payload: CreateOrderItemDto) {
        const newOrderItem = new OrderItem();

        if (id) {
            newOrderItem.order = await this.findById(id);
        }

        if (payload.productId) {
            newOrderItem.product = await this.productsService.findById(
                payload.productId,
            );
        }

        newOrderItem.quantity = payload.quantity;

        return this.orderItemRepository.save(newOrderItem);
    }
}
