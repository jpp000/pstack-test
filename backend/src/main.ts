import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { configureApp } from './common/configure-app.js';
import { loadConfigFromProcess } from './config/config.js';

const config = loadConfigFromProcess();
const app = await NestFactory.create(AppModule.forRoot(config));
configureApp(app, config);
await app.listen(config.port);
