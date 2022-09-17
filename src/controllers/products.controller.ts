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

@Controller('products')
export class ProductsController {
    @Get()
    getProducts(
        @Query('limit') limit: number = 10,
        @Query('offset') offset: number = 0,
        @Query('brand') brand: string,
    ) {
        return {
            message: `products: limit=${limit} offset=>${offset} brand=>${brand}`,
        };
    }

    @Get(':id')
    getProduct(@Param('id') productId: number) {
        return productId;
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
