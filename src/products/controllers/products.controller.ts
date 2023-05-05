import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Put,
    Query,
    Delete,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';

import {
    ProductId,
    CreateProductDto,
    UpdateProductDto,
    FilterProductsDto,
} from 'src/products/dtos/products.dto';
import { ParseIntPipe } from 'src/common/parse-int.pipe';
import { ProductsService } from 'src/products/services/products.service';
import { CategoryId } from 'src/products/dtos/categories.dto';

@ApiTags('products')
@Controller('products')
export class ProductsController {
    constructor(private productService: ProductsService) {}

    @Get()
    find(@Query() filter: FilterProductsDto) {
        return this.productService.find(filter);
    }

    @Get(':id')
    findById(@Param('id', ParseIntPipe) id: ProductId) {
        return this.productService.findById(id);
    }

    @Post()
    create(@Body() payload: CreateProductDto) {
        return this.productService.create(payload);
    }

    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: ProductId,
        @Body() payload: UpdateProductDto,
    ) {
        return this.productService.update(id, payload);
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: ProductId) {
        return this.productService.delete(id);
    }

    @Post(':id/category/:categoryId')
    async addCategoryByProduct(
        @Param('id', ParseIntPipe) id: ProductId,
        @Param('categoryId', ParseIntPipe) categoryId: CategoryId,
    ) {
        return await this.productService.addCategoryByProduct(id, categoryId);
    }

    @Delete(':id/category/:categoryId')
    async deleteCategoryByProduct(
        @Param('id', ParseIntPipe) id: ProductId,
        @Param('categoryId', ParseIntPipe) categoryId: CategoryId,
    ) {
        return await this.productService.removeCategoryByProduct(
            id,
            categoryId,
        );
    }
}
