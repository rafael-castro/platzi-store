import { PartialType } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

import { Category } from './../entities/category.entity';

export type CategoryId = Category['id'];

export class CreateCategoryDto implements Omit<Category, 'id'> {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    image: string;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
