import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
    ArrayMinSize,
    ArrayNotEmpty,
    IsNotEmpty,
    IsPositive,
} from 'class-validator';

import { CustomerId } from 'src/customers/dtos/customer.dto';
import { Order } from 'src/orders/entities/order.entity';
import { ProductId } from 'src/products/dtos/products.dto';
import { OrderItem } from '../entities/order-item.entity';

export type OrderId = Order['id'];

export class CreateOrderDto
    implements
        Omit<Order, 'id' | 'createdAt' | 'updatedAt' | 'items' | 'customer'>
{
    @IsPositive()
    @IsNotEmpty()
    @ApiProperty()
    customerId: CustomerId;
}

export class UpdateOrderDto extends PartialType(CreateOrderDto) {}

export class CreateOrderItemDto
    implements
        Omit<OrderItem, 'id' | 'createdAt' | 'updatedAt' | 'product' | 'order'>
{
    @IsPositive()
    @IsNotEmpty()
    @ApiProperty()
    quantity: number;

    @IsPositive()
    @IsNotEmpty()
    @ApiProperty()
    productId: ProductId;
}

export class UpdateOrderItemDto extends PartialType(CreateOrderItemDto) {}
