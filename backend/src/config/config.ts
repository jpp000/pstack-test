import { existsSync } from 'node:fs';

export type AppConfig = {
  port: number;
  databasePath: string;
  jwtSecret: string;
  corsOrigin: string;
};

export function loadConfig(env: NodeJS.ProcessEnv): AppConfig {
  const jwtSecret = env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error('JWT_SECRET is not set. Define it in backend/.env (see backend/.env.example).');
  }
  return {
    port: parsePort(env.PORT || '3000'),
    databasePath: env.DATABASE_PATH || 'data/dev.sqlite',
    jwtSecret,
    corsOrigin: env.CORS_ORIGIN || 'http://localhost:5173',
  };
}

export function loadConfigFromProcess(): AppConfig {
  if (existsSync('.env')) {
    process.loadEnvFile('.env');
  }
  return loadConfig(process.env);
}

function parsePort(raw: string): number {
  const port = Number(raw);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error(`PORT must be an integer between 1 and 65535, got "${raw}".`);
  }
  return port;
}
