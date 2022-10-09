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
} from './../dtos/products.dto';
import { ParseIntPipe } from './../../common/parse-int.pipe';
import { ProductsService } from './../services/products.service';

@ApiTags('products')
@Controller('products')
export class ProductsController {
    constructor(private productService: ProductsService) {}

    @Get()
    find(
        @Query('limit', ParseIntPipe) limit = 10,
        @Query('offset', ParseIntPipe) offset = 0,
        @Query('brand') brand: string,
    ) {
        return this.productService.find();
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
}
