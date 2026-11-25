import { Module, type DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import type { AppConfig } from './config/config.js';
import { prepareDatabaseOptions } from './database/database-options.js';
import { HealthModule } from './health/health.module.js';

@Module({})
export class AppModule {
  static forRoot(config: AppConfig): DynamicModule {
    return {
      module: AppModule,
      imports: [
        TypeOrmModule.forRootAsync({ useFactory: () => prepareDatabaseOptions(config) }),
        HealthModule,
      ],
    };
  }
}
