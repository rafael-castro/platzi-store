import { Module } from '@nestjs/common';
import { ProductsModule } from './../products/products.module';
import { UsersController } from './controllers/users.controller';
import { UserService } from './services/user.service';

@Module({
    imports: [ProductsModule],
    controllers: [UsersController],
    providers: [UserService],
})
export class UsersModule {}
