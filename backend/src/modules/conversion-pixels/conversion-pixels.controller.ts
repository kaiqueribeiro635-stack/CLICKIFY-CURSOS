import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { ConversionPixelsService } from './conversion-pixels.service';
import { UpsertConversionPixelsDto } from './dto/upsert-conversion-pixels.dto';

@Controller('products/:productId/conversion-pixels')
export class ConversionPixelsController {
  constructor(private readonly service: ConversionPixelsService) {}

  @Get()
  async list(@Param('productId') productId: string) {
    return this.service.list(productId);
  }

  @Put()
  async upsert(@Param('productId') productId: string, @Body() body: UpsertConversionPixelsDto) {
    await this.service.replaceForProduct(productId, body.pixels || []);
    return { ok: true };
  }
}

