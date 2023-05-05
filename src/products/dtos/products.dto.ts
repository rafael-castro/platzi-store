import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
    IsString,
    IsNumber,
    IsUrl,
    IsNotEmpty,
    IsPositive,
    IsArray,
    ArrayNotEmpty,
    ArrayMinSize,
    IsOptional,
    isPositive,
} from 'class-validator';

import { Product } from 'src/products/entities/product.entity';
import { BrandId } from 'src/products/dtos/brands.dto';
import { CategoryId } from 'src/products/dtos/categories.dto';

export type ProductId = Product['id'];

export class CreateProductDto
    implements
        Omit<
            Product,
            'id' | 'createdAt' | 'updatedAt' | 'brand' | 'categories'
        >
{
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly description: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber({ maxDecimalPlaces: 2 })
    @IsPositive()
    readonly price: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber({ maxDecimalPlaces: 0 })
    @IsPositive()
    readonly stock: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsUrl()
    readonly image: string;

    @IsNotEmpty()
    @IsPositive()
    @ApiProperty()
    readonly brandId: BrandId;

    @IsArray()
    @ArrayNotEmpty()
    @ArrayMinSize(1)
    @ApiProperty()
    readonly categoriesIds: CategoryId[];
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}

export class FilterProductsDto {
    @IsOptional()
    @IsNumber()
    @ApiProperty()
    limit?: number;

    @IsOptional()
    @IsNumber()
    @ApiProperty()
    offset?: number;
}
