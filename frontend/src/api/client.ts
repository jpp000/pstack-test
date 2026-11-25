export type ApiErrorBody = {
  statusCode: number;
  error: string;
  message: string;
  details?: unknown;
};

export class ApiError extends Error {
  readonly statusCode: number;
  readonly error: string;
  readonly details?: unknown;

  constructor(body: ApiErrorBody) {
    super(body.message);
    this.name = 'ApiError';
    this.statusCode = body.statusCode;
    this.error = body.error;
    this.details = body.details;
  }
}

export async function apiGet<T>(path: string): Promise<T> {
  const response = await fetch(`/api${path}`, { headers: { Accept: 'application/json' } });
  if (!response.ok) {
    throw await toApiError(response);
  }
  return (await response.json()) as T;
}

async function toApiError(response: Response): Promise<ApiError> {
  const body: unknown = await response.json().catch(() => null);
  if (isApiErrorBody(body)) {
    return new ApiError(body);
  }
  return new ApiError({
    statusCode: response.status,
    error: 'UNEXPECTED_RESPONSE',
    message: 'A API não respondeu como esperado. Verifique se o backend está rodando.',
  });
}

function isApiErrorBody(value: unknown): value is ApiErrorBody {
  if (typeof value !== 'object' || value === null) {
    return false;
  }
  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate.statusCode === 'number' &&
    typeof candidate.error === 'string' &&
    typeof candidate.message === 'string'
  );
}
