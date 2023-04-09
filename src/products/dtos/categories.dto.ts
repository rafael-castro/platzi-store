import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

import { Category } from 'src/products/entities/category.entity';

export type CategoryId = Category['id'];

export class CreateCategoryDto
    implements Omit<Category, 'id' | 'createdAt' | 'updatedAt' | 'products'>
{
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
