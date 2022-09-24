import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller.js';

@Module({
    controllers: [UsersController],
})
export class UsersModule {}
