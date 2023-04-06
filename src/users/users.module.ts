import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsModule } from 'src/products/products.module';
import { UsersController } from 'src/users/controllers/users.controller';
import { UserService } from 'src/users/services/user.service';
import { User } from 'src/users/entities/user.entity';
import { CustomersModule } from 'src/customers/customers.module';

@Module({
    imports: [
        ProductsModule,
        CustomersModule,
        TypeOrmModule.forFeature([User]),
    ],
    controllers: [UsersController],
    providers: [UserService],
})
export class UsersModule {}
