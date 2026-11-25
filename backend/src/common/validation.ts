import { HttpStatus, ValidationPipe, type ValidationError } from '@nestjs/common';
import { ApiException } from './api-error.js';

export type InvalidField = { field: string; messages: string[] };

export function createValidationPipe(): ValidationPipe {
  return new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    exceptionFactory: (errors) =>
      new ApiException(
        HttpStatus.BAD_REQUEST,
        'VALIDATION_FAILED',
        'Os dados enviados são inválidos.',
        toInvalidFields(errors),
      ),
  });
}

function toInvalidFields(errors: ValidationError[], parentPath = ''): InvalidField[] {
  return errors.flatMap((error) => {
    const field = parentPath ? `${parentPath}.${error.property}` : error.property;
    const own = error.constraints
      ? [{ field, messages: Object.values(error.constraints) }]
      : [];
    return [...own, ...toInvalidFields(error.children ?? [], field)];
  });
}
