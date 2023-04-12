import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Category } from 'src/products/entities/category.entity';
import {
    CategoryId,
    CreateCategoryDto,
    UpdateCategoryDto,
} from 'src/products/dtos/categories.dto';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,
    ) {}

    async find() {
        return await this.categoryRepository.find();
    }

    async findById(id: CategoryId): Promise<Category> {
        const category = await this.categoryRepository
            .createQueryBuilder('category')
            .where('category.id = :id', { id: id })
            .getOne();
        if (!category) {
            throw new NotFoundException(`category ${id} not found`);
        }
        return category;
    }

    async findByIds(ids: CategoryId[]): Promise<Category[]> {
        const categories = await this.categoryRepository
            .createQueryBuilder('category')
            .where('category.id IN (:...ids)', { ids: ids })
            .getMany();
        if (!categories) {
            throw new NotFoundException(`categories ${ids} not found`);
        }
        return categories;
    }

    create(payload: CreateCategoryDto) {
        const newCategory = this.categoryRepository.create(payload);
        return this.categoryRepository.save(newCategory);
    }

    async update(id: CategoryId, payload: UpdateCategoryDto) {
        const category = await this.findById(id);
        this.categoryRepository.merge(category, payload);
        return this.categoryRepository.save(category);
    }

    async delete(id: CategoryId) {
        const category = await this.findById(id);
        return this.categoryRepository.delete(category);
    }
}
