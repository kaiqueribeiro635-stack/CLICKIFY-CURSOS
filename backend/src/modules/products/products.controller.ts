import { Controller, Get, Query, Param } from '@nestjs/common';
import { ProductsService, Product } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll(@Query('category') category?: string): Product[] {
    return this.productsService.findAll(category);
  }

  @Get('counts')
  getCounts() {
    return this.productsService.getCounts();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Product {
    return this.productsService.findOne(id);
  }
}
