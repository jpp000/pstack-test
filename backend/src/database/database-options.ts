import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import type { DataSourceOptions } from 'typeorm';
import type { AppConfig } from '../config/config.js';
import { entities } from './entities.js';
import { migrations } from './migrations/index.js';

export function prepareDatabaseOptions(config: AppConfig): DataSourceOptions {
  if (config.databasePath !== ':memory:') {
    mkdirSync(dirname(config.databasePath), { recursive: true });
  }
  return {
    type: 'better-sqlite3',
    database: config.databasePath,
    entities,
    migrations,
    synchronize: false,
    migrationsRun: true,
  };
}
