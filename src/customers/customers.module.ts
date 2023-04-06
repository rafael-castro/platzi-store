import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CustomersService } from 'src/customers/services/customers.service';
import { Customer } from 'src/customers/entities/customer.entity';
import { CustomersController } from 'src/customers/controllers/customers.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Customer])],
    providers: [CustomersService],
    controllers: [CustomersController],
    exports: [CustomersService],
})
export class CustomersModule {}
