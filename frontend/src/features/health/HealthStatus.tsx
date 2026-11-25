export type HealthStatusProps =
  | { state: 'loading' }
  | { state: 'ok' }
  | { state: 'error'; message: string };

export function HealthStatus(props: HealthStatusProps) {
  switch (props.state) {
    case 'loading':
      return <p role="status">Verificando API…</p>;
    case 'ok':
      return <p role="status">API ok</p>;
    case 'error':
      return <p role="alert">API indisponível. {props.message}</p>;
  }
}
