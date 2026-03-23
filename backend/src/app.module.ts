import { Module, Controller, Get } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ProductsModule } from './modules/products/products.module';
import { PixelIntegrationsModule } from './integrations/pixels/pixel-integrations.module';
import { ConversionPixelsModule } from './modules/conversion-pixels/conversion-pixels.module';

@Controller('health')
class HealthController {
  @Get()
  status() {
    return { status: 'ok' };
  }
}

@Module({
  imports: [
    CacheModule.register({ ttl: 60, max: 1000 }),
    TypeOrmModule.forRoot(databaseConfig),
    AuthModule,
    UsersModule,
    ProductsModule,
    PixelIntegrationsModule,
    ConversionPixelsModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
