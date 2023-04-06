import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateUserDto, UpdateUserDto, UserId } from 'src/users/dtos/user.dto';
import { UserService } from 'src/users/services/user.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private usersService: UserService) {}

    @Get()
    find() {
        return this.usersService.find();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: UserId) {
        return this.usersService.findOne(id);
    }

    @Get(':id/orders')
    findOrders(@Param('id', ParseIntPipe) id: UserId) {
        return this.usersService.findOrdersByUser(id);
    }

    @Post()
    create(@Body() payload: CreateUserDto) {
        return this.usersService.create(payload);
    }

    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: UserId,
        @Body() payload: UpdateUserDto,
    ) {
        return this.usersService.update(id, payload);
    }
}
