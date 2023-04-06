import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsPositive,
    IsString,
    IsStrongPassword,
} from 'class-validator';

import { Role, User } from 'src/users/entities/user.entity';
import { CustomerId } from 'src/customers/dtos/customer.dto';

export type UserId = User['id'];

export class CreateUserDto
    implements Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'customer'>
{
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @ApiProperty()
    email: string;

    @IsNotEmpty()
    @IsString()
    @IsStrongPassword()
    @ApiProperty()
    password: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    role: Role;

    @IsOptional()
    @IsPositive()
    @ApiProperty()
    customerId: CustomerId;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
