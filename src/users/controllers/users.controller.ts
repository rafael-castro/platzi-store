import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { UserId } from './../dtos/user.dto.js';
import { UserService } from './../services/user.service.js';

@Controller('users')
export class UsersController {
    private usersService: UserService;

    constructor(usersService: UserService) {
        this.usersService = usersService;
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: UserId) {
        return this.usersService.findOne(id);
    }

    @Get(':id/orders')
    findOrders(@Param('id', ParseIntPipe) id: UserId) {
        return this.usersService.findOrdersByUser(id);
    }
}
