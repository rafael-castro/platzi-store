import { PartialType } from '@nestjs/swagger';
import {
    IsString,
    IsNumber,
    IsUrl,
    IsNotEmpty,
    IsPositive,
} from 'class-validator';
import { Product } from './../entities/product.entity';

export type ProductId = Product['id'];

export class CreateProductDto
    implements Omit<Product, 'id' | 'createdAt' | 'updatedAt'>
{
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsString()
    readonly description: string;

    @IsNotEmpty()
    @IsNumber({ maxDecimalPlaces: 2 })
    @IsPositive()
    readonly price: number;

    @IsNotEmpty()
    @IsNumber({ maxDecimalPlaces: 0 })
    @IsPositive()
    readonly stock: number;

    @IsNotEmpty()
    @IsUrl()
    readonly image: string;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
