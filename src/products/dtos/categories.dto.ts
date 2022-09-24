import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsNotEmpty } from 'class-validator';

import { Category } from './../entities/category.entity.js';

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
