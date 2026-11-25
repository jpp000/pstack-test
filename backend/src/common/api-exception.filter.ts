import {
  Catch,
  HttpException,
  HttpStatus,
  Logger,
  NotFoundException,
  type ArgumentsHost,
  type ExceptionFilter,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { ApiException, type ApiErrorBody } from './api-error.js';

type ErrorDescription = { error: string; message: string };

const ERRORS_BY_STATUS: Partial<Record<number, ErrorDescription>> = {
  [HttpStatus.BAD_REQUEST]: { error: 'BAD_REQUEST', message: 'Requisição inválida.' },
  [HttpStatus.UNAUTHORIZED]: { error: 'UNAUTHORIZED', message: 'Autenticação necessária.' },
  [HttpStatus.FORBIDDEN]: { error: 'FORBIDDEN', message: 'Você não tem permissão para esta ação.' },
  [HttpStatus.CONFLICT]: { error: 'CONFLICT', message: 'A operação conflita com o estado atual.' },
  [HttpStatus.PAYLOAD_TOO_LARGE]: {
    error: 'PAYLOAD_TOO_LARGE',
    message: 'O corpo da requisição é grande demais.',
  },
  [HttpStatus.INTERNAL_SERVER_ERROR]: { error: 'INTERNAL_ERROR', message: 'Erro interno do servidor.' },
};

const FALLBACK: ErrorDescription = { error: 'HTTP_ERROR', message: 'Não foi possível processar a requisição.' };

@Catch()
export class ApiExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(ApiExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const http = host.switchToHttp();
    const request = http.getRequest<Request>();
    const body = this.toBody(exception, request);
    http.getResponse<Response>().status(body.statusCode).json(body);
  }

  private toBody(exception: unknown, request: Request): ApiErrorBody {
    if (exception instanceof ApiException) {
      return exception.getBody();
    }
    if (!(exception instanceof HttpException)) {
      this.logger.error(exception instanceof Error ? exception.stack : exception);
      return describe(HttpStatus.INTERNAL_SERVER_ERROR);
    }
    if (exception instanceof NotFoundException) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        error: 'NOT_FOUND',
        message: `Rota não encontrada: ${request.method} ${request.baseUrl}${request.path}`,
      };
    }
    return describe(exception.getStatus());
  }
}

function describe(status: number): ApiErrorBody {
  return { statusCode: status, ...(ERRORS_BY_STATUS[status] ?? FALLBACK) };
}
