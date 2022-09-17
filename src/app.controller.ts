import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("greetings")
  getGreetings(): string {
    return "hey";
  }

  @Get('products')
  getProducts(
    @Query('limit') limit: number = 10,
    @Query('offset') offset: number = 0,
    @Query('brand') brand: string
  ) {
    return `products: limit=${limit} offset=>${offset} brand=>${brand}`;
  }

  @Get('products/:productId')
  getProduct(@Param('productId') productId: string) {
    return productId;
  }

  @Get('products/filter')
  getProductFilter() {
    return 'filter';
  }

  @Get('categories/:id/products/:productId')
  getCategory(
    @Param('id') id: string,
    @Param('productId') productId: string
  ) {
    return `Category ${id}, Product ${productId}`;
  }


}
