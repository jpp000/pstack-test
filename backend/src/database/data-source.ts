import { DataSource } from 'typeorm';
import { loadConfigFromProcess } from '../config/config.js';
import { prepareDatabaseOptions } from './database-options.js';

export default new DataSource({
  ...prepareDatabaseOptions(loadConfigFromProcess()),
  migrationsRun: false,
});
