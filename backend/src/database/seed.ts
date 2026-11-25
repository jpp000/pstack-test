import { DataSource } from 'typeorm';
import { loadConfigFromProcess } from '../config/config.js';
import { prepareDatabaseOptions } from './database-options.js';

export function seed(_dataSource: DataSource): Promise<void> {
  return Promise.resolve();
}

if (import.meta.main) {
  const dataSource = await new DataSource(prepareDatabaseOptions(loadConfigFromProcess())).initialize();
  try {
    await seed(dataSource);
    console.log('Seed concluído.');
  } finally {
    await dataSource.destroy();
  }
}
