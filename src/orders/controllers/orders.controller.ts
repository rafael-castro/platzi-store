import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { OrdersService } from 'src/orders/services/orders.service';
import {
    CreateOrderDto,
    CreateOrderItemDto,
    OrderId,
} from 'src/orders/dtos/orders.dto';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
    constructor(private ordersService: OrdersService) {}

    @Get(':id')
    findById(@Param('id', ParseIntPipe) id: OrderId) {
        return this.ordersService.findById(id);
    }

    @Post()
    create(@Body() payload: CreateOrderDto) {
        return this.ordersService.create(payload);
    }

    @Post(':id/items')
    createItem(
        @Param('id', ParseIntPipe) id: OrderId,
        @Body() payload: CreateOrderItemDto,
    ) {
        return this.ordersService.createItem(id, payload);
    }
}
