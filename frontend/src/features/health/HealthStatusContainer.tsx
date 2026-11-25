import { ApiError } from '../../api/client';
import { HealthStatus } from './HealthStatus';
import { useHealth } from './useHealth';

export function HealthStatusContainer() {
  const health = useHealth();

  if (health.isPending) {
    return <HealthStatus state="loading" />;
  }
  if (health.isError) {
    const message =
      health.error instanceof ApiError ? health.error.message : 'Não foi possível conectar à API.';
    return <HealthStatus state="error" message={message} />;
  }
  return <HealthStatus state="ok" />;
}
