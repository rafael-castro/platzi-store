import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Order } from 'src/orders/entities/order.entity';
import { OrderItem } from 'src/orders/entities/order-item.entity';
import { OrdersController } from 'src/orders/controllers/orders.controller';
import { OrdersService } from 'src/orders/services/orders.service';
import { CustomersModule } from 'src/customers/customers.module';
import { ProductsModule } from 'src/products/products.module';

@Module({
    imports: [
        CustomersModule,
        ProductsModule,
        TypeOrmModule.forFeature([Order, OrderItem]),
    ],
    controllers: [OrdersController],
    providers: [OrdersService],
})
export class OrdersModule {}
