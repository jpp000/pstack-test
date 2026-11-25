import type { INestApplication } from '@nestjs/common';
import type { AppConfig } from '../config/config.js';
import { ApiExceptionFilter } from './api-exception.filter.js';
import { createValidationPipe } from './validation.js';

export function configureApp(app: INestApplication, config: AppConfig): void {
  app.setGlobalPrefix('api');
  app.useGlobalPipes(createValidationPipe());
  app.useGlobalFilters(new ApiExceptionFilter());
  app.enableCors({ origin: config.corsOrigin });
}
