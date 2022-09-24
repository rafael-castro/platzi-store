import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from './../entities/category.entity.js';
import {
    CategoryId,
    CreateCategoryDto,
    UpdateCategoryDto,
} from './../dtos/categories.dto.js';

@Injectable()
export class CategoriesService {
    private categoryId = 0;
    private categories: Category[] = [];

    find(): Category[] {
        return this.categories;
    }

    findById(id: CategoryId): Category {
        const categoryIndex = this.getCategoryIndex(id);
        if (categoryIndex < 0) {
            throw new NotFoundException(`category ${id} not found`);
        }
        return this.categories[categoryIndex];
    }

    create(categoryDto: CreateCategoryDto): Category {
        this.categoryId = this.categoryId + 1;
        const category = {
            ...categoryDto,
            id: this.categoryId,
        };
        this.categories.push(category);
        return category;
    }

    update(id: CategoryId, categoryDto: UpdateCategoryDto): Category {
        const categoryIndex = this.getCategoryIndex(id);
        if (categoryIndex < 0) {
            throw new NotFoundException(`category ${id} not found`);
        }
        this.categories[categoryIndex] = {
            ...this.categories[categoryIndex],
            ...categoryDto,
        };
        return this.categories[categoryIndex];
    }

    delete(id: CategoryId): Category[] {
        const categoryIndex = this.getCategoryIndex(id);
        if (categoryIndex < 0) {
            throw new NotFoundException(`category ${id} not found`);
        }
        return this.categories.splice(categoryIndex, 1);
    }

    private getCategoryIndex(id: CategoryId): number {
        return this.categories.findIndex((item) => item.id === id);
    }
}
