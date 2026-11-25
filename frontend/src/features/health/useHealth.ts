import { useQuery } from '@tanstack/react-query';
import { apiGet } from '../../api/client';

export type HealthResponse = { status: 'ok' };

export function useHealth() {
  return useQuery({
    queryKey: ['health'],
    queryFn: () => apiGet<HealthResponse>('/health'),
  });
}
