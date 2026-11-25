import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { HealthStatus } from './HealthStatus';

describe('HealthStatus', () => {
  it('shows a loading message while checking', () => {
    render(<HealthStatus state="loading" />);

    expect(screen.getByRole('status')).toHaveTextContent('Verificando API…');
  });

  it('shows "API ok" when the API answers', () => {
    render(<HealthStatus state="ok" />);

    expect(screen.getByRole('status')).toHaveTextContent('API ok');
  });

  it('shows the error message when the API fails', () => {
    render(<HealthStatus state="error" message="Erro interno do servidor." />);

    expect(screen.getByRole('alert')).toHaveTextContent('API indisponível. Erro interno do servidor.');
  });
});
