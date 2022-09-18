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
import { CreateProductDto, UpdateProductDto } from './../dtos/products.dto.js';
import { ParseIntPipe } from './../common/parse-int.pipe.js';
import { ProductsService } from './../services/products.service.js';

@Controller('products')
export class ProductsController {
    constructor(private productService: ProductsService) {}

    @Get()
    getProducts(
        @Query('limit', ParseIntPipe) limit = 10,
        @Query('offset', ParseIntPipe) offset = 0,
        @Query('brand') brand: string,
    ) {
        return this.productService.findAll();
    }

    @Get(':id')
    getProduct(@Param('id', ParseIntPipe) id: number) {
        return this.productService.findOne(id);
    }

    @Get('filter')
    getProductFilter() {
        return 'filter';
    }

    @Post()
    create(@Body() payload: CreateProductDto) {
        return this.productService.create(payload);
    }

    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() payload: UpdateProductDto,
    ) {
        return this.productService.update(id, payload);
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.productService.delete(id);
    }
}
