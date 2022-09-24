import { Module } from '@nestjs/common';
import { ProductsModule } from './../products/products.module.js';
import { UsersController } from './controllers/users.controller.js';
import { UserService } from './services/user.service.js';

@Module({
    imports: [ProductsModule],
    controllers: [UsersController],
    providers: [UserService],
})
export class UsersModule {}
