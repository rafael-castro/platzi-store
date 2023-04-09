import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Order } from 'src/orders/entities/order.entity';
import { OrderItem } from 'src/orders/entities/order-item.entity';

@Module({ imports: [TypeOrmModule.forFeature([Order, OrderItem])] })
export class OrdersModule {}
