import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Put,
    Query,
    Delete,
    HttpStatus,
    HttpCode,
} from '@nestjs/common';

@Controller('products')
export class ProductsController {
    @Get()
    getProducts(
        @Query('limit') limit = 10,
        @Query('offset') offset = 0,
        @Query('brand') brand: string,
    ) {
        return {
            message: `products: limit=${limit} offset=>${offset} brand=>${brand}`,
        };
    }

    @Get(':id')
    @HttpCode(HttpStatus.ACCEPTED)
    getProduct(@Param('id') id: number) {
        return {
            message: `get product ${id}`,
        };
    }

    @Get('filter')
    getProductFilter() {
        return 'filter';
    }

    @Post()
    create(@Body() payload: any) {
        return {
            message: 'post',
            payload: payload,
        };
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() payload: any) {
        return {
            message: `put product ${id}`,
            payload: {
                ...payload,
                id,
            },
        };
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return id;
    }
}
