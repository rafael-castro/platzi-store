import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { ParseIntPipe } from './../../common/parse-int.pipe';
import {
    CategoryId,
    CreateCategoryDto,
    UpdateCategoryDto,
} from './../dtos/categories.dto';
import { CategoriesService } from './../services/categories.service';

@Controller('categories')
export class CategoriesController {
    constructor(private categoriesService: CategoriesService) {}

    @Get()
    find() {
        return this.categoriesService.find();
    }

    @Get(':id')
    findById(@Param('id', ParseIntPipe) id: CategoryId) {
        return this.categoriesService.findById(id);
    }

    @Post()
    create(@Body() payload: CreateCategoryDto) {
        return this.categoriesService.create(payload);
    }

    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: CategoryId,
        @Body() payload: UpdateCategoryDto,
    ) {
        return this.categoriesService.update(id, payload);
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: CategoryId) {
        return this.categoriesService.delete(id);
    }
}
