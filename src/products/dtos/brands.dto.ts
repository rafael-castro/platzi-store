import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { Brand } from 'src/products/entities/brand.entity';

export type BrandId = Brand['id'];

export class CreateBrandDto
    implements Omit<Brand, 'id' | 'createdAt' | 'updatedAt' | 'products'>
{
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    image: string;
}

export class UpdateBrandDto extends PartialType(CreateBrandDto) {}
