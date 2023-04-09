import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { Customer } from 'src/customers/entities/customer.entity';

export type CustomerId = Customer['id'];

export class CreateCustomerDto
    implements
        Omit<Customer, 'id' | 'createdAt' | 'updatedAt' | 'user' | 'orders'>
{
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    name: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    lastName: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    phone: string;
}
