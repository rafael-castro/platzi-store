import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { BrandsService } from 'src/products/services/brands.service';
import {
    BrandId,
    CreateBrandDto,
    UpdateBrandDto,
} from 'src/products/dtos/brands.dto';

@ApiTags('brands')
@Controller('brands')
export class BrandsController {
    constructor(private brandsService: BrandsService) {}

    @Get(':id')
    findById(@Param('id', ParseIntPipe) id: BrandId) {
        return this.brandsService.findById(id);
    }

    @Post()
    create(@Body() payload: CreateBrandDto) {
        return this.brandsService.create(payload);
    }

    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: BrandId,
        @Body() payload: UpdateBrandDto,
    ) {
        return this.brandsService.update(id, payload);
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: BrandId) {
        return this.brandsService.delete(id);
    }
}
