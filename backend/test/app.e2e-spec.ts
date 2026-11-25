import { Body, Controller, Get, Post, type INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { IsInt, IsString, Min, MinLength } from 'class-validator';
import request from 'supertest';
import type { App } from 'supertest/types.js';
import { AppModule } from '../src/app.module.js';
import { configureApp } from '../src/common/configure-app.js';
import type { AppConfig } from '../src/config/config.js';

const config: AppConfig = {
  port: 0,
  databasePath: ':memory:',
  jwtSecret: 'test-secret',
  corsOrigin: 'http://localhost:5173',
};

class CreateWidgetDto {
  @IsString()
  @MinLength(1)
  name!: string;

  @IsInt()
  @Min(1)
  quantity!: number;
}

@Controller('test-only')
class TestOnlyController {
  @Post('widgets')
  create(@Body() dto: CreateWidgetDto): CreateWidgetDto {
    return dto;
  }

  @Get('boom')
  boom(): never {
    throw new Error('secret internal detail');
  }
}

describe('App (e2e)', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule.forRoot(config)],
      controllers: [TestOnlyController],
    }).compile();
    app = moduleRef.createNestApplication({ logger: false });
    configureApp(app, config);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /api/health returns ok', async () => {
    const res = await request(app.getHttpServer()).get('/api/health');

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });

  it('unknown route returns 404 in the spec-00 error format', async () => {
    const res = await request(app.getHttpServer()).get('/api/nope');

    expect(res.status).toBe(404);
    expect(res.body).toEqual({
      statusCode: 404,
      error: 'NOT_FOUND',
      message: 'Rota não encontrada: GET /api/nope',
    });
  });

  it('accepts a valid body', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/test-only/widgets')
      .send({ name: 'Caneca', quantity: 2 });

    expect(res.status).toBe(201);
    expect(res.body).toEqual({ name: 'Caneca', quantity: 2 });
  });

  it('rejects an unknown body field with VALIDATION_FAILED', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/test-only/widgets')
      .send({ name: 'Caneca', quantity: 2, isAdmin: true });

    expect(res.status).toBe(400);
    expect(res.body).toEqual({
      statusCode: 400,
      error: 'VALIDATION_FAILED',
      message: 'Os dados enviados são inválidos.',
      details: [{ field: 'isAdmin', messages: [expect.any(String)] }],
    });
  });

  it('rejects an invalid field with VALIDATION_FAILED', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/test-only/widgets')
      .send({ name: 'Caneca', quantity: 0 });

    expect(res.status).toBe(400);
    expect(res.body).toEqual({
      statusCode: 400,
      error: 'VALIDATION_FAILED',
      message: 'Os dados enviados são inválidos.',
      details: [{ field: 'quantity', messages: [expect.any(String)] }],
    });
  });

  it('hides unexpected errors behind INTERNAL_ERROR', async () => {
    const res = await request(app.getHttpServer()).get('/api/test-only/boom');

    expect(res.status).toBe(500);
    expect(res.body).toEqual({
      statusCode: 500,
      error: 'INTERNAL_ERROR',
      message: 'Erro interno do servidor.',
    });
  });

  it('answers malformed JSON in the spec-00 error format', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/test-only/widgets')
      .set('Content-Type', 'application/json')
      .send('{"name":');

    expect(res.status).toBe(400);
    expect(res.body).toEqual({
      statusCode: 400,
      error: 'BAD_REQUEST',
      message: 'Requisição inválida.',
    });
  });
});
