import { loadConfig } from './config.js';

describe('loadConfig', () => {
  it('applies defaults when only JWT_SECRET is set', () => {
    expect(loadConfig({ JWT_SECRET: 's3cret' })).toEqual({
      port: 3000,
      databasePath: 'data/dev.sqlite',
      jwtSecret: 's3cret',
      corsOrigin: 'http://localhost:5173',
    });
  });

  it('reads every variable from the environment', () => {
    expect(
      loadConfig({
        PORT: '4000',
        DATABASE_PATH: '/tmp/shop.sqlite',
        JWT_SECRET: 's3cret',
        CORS_ORIGIN: 'http://example.test',
      }),
    ).toEqual({
      port: 4000,
      databasePath: '/tmp/shop.sqlite',
      jwtSecret: 's3cret',
      corsOrigin: 'http://example.test',
    });
  });

  it('throws when JWT_SECRET is missing', () => {
    expect(() => loadConfig({})).toThrow(/JWT_SECRET/);
  });

  it.each(['abc', '0', '70000', '3000.5'])('throws on invalid PORT %s', (port) => {
    expect(() => loadConfig({ JWT_SECRET: 's3cret', PORT: port })).toThrow(/PORT/);
  });
});
