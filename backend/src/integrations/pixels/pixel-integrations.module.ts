import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PixelAdapterFactory } from './pixel-adapter.factory';
import { PixelIntegrationService } from './pixel-integration.service';
import { ProductPixelEntity } from '../../entities/product-pixel.entity';
import { PixelEventLogEntity } from '../../entities/pixel-event-log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductPixelEntity, PixelEventLogEntity])],
  providers: [PixelAdapterFactory, PixelIntegrationService],
  exports: [PixelIntegrationService],
})
export class PixelIntegrationsModule {}

