import { Module, Controller, Get } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';

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
  ],
  controllers: [HealthController],
})
export class AppModule {}
