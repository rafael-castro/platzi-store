import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Brand } from 'src/products/entities/brand.entity';
import {
    BrandId,
    CreateBrandDto,
    UpdateBrandDto,
} from 'src/products/dtos/brands.dto';

@Injectable()
export class BrandsService {
    constructor(
        @InjectRepository(Brand) private brandRepository: Repository<Brand>,
    ) {}

    async findById(id: BrandId) {
        const brand = await this.brandRepository
            .createQueryBuilder('brand')
            .leftJoinAndSelect('brand.products', 'product')
            .where('brand.id = :id', { id: id })
            .getOne();
        if (!brand) {
            throw new NotFoundException(`brand ${id} not found`);
        }
        return brand;
    }

    create(payload: CreateBrandDto) {
        const newBrand = this.brandRepository.create(payload);
        return this.brandRepository.save(newBrand);
    }

    async update(id: BrandId, payload: UpdateBrandDto) {
        const brand = await this.brandRepository
            .createQueryBuilder('brand')
            .where('brand.id = :id', { id: id })
            .getOne();
        if (!brand) {
            throw new NotFoundException(`brand ${id} not found`);
        }
        this.brandRepository.merge(brand, payload);
        return this.brandRepository.save(brand);
    }

    delete(id: BrandId) {
        return this.brandRepository.delete(id);
    }
}
