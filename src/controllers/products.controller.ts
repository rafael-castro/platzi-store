import { Controller, Get, Param, Query } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  @Get()
  getProducts(
    @Query('limit') limit: number = 10,
    @Query('offset') offset: number = 0,
    @Query('brand') brand: string
  ) {
    return `products: limit=${limit} offset=>${offset} brand=>${brand}`;
  }

  @Get(':productId')
  getProduct(@Param('productId') productId: string) {
    return productId;
  }

  @Get('filter')
  getProductFilter() {
    return 'filter';
  }
}
