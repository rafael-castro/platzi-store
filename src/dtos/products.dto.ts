import { PartialType } from '@nestjs/mapped-types';
import {
    IsString,
    IsNumber,
    IsUrl,
    IsNotEmpty,
    IsPositive,
} from 'class-validator';
import { Product } from './../entities/product.entity.js';

export type ProductId = Product['id'];

export class CreateProductDto implements Omit<Product, 'id'> {
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsString()
    readonly description: string;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    readonly price: number;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    readonly stock: number;

    @IsNotEmpty()
    @IsUrl()
    readonly image: string;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
