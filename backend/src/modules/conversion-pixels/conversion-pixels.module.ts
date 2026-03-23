import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConversionPixelEntity } from '../../entities/conversion-pixel.entity';
import { ConversionPixelsController } from './conversion-pixels.controller';
import { ConversionPixelsService } from './conversion-pixels.service';

@Module({
  imports: [TypeOrmModule.forFeature([ConversionPixelEntity])],
  controllers: [ConversionPixelsController],
  providers: [ConversionPixelsService],
})
export class ConversionPixelsModule {}

