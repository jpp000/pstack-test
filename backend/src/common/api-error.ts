import { HttpException } from '@nestjs/common';

export type ApiErrorBody = {
  statusCode: number;
  error: string;
  message: string;
  details?: unknown;
};

export class ApiException extends HttpException {
  constructor(status: number, error: string, message: string, details?: unknown) {
    const body: ApiErrorBody = { statusCode: status, error, message };
    if (details !== undefined) {
      body.details = details;
    }
    super(body, status);
  }

  getBody(): ApiErrorBody {
    return this.getResponse() as ApiErrorBody;
  }
}
