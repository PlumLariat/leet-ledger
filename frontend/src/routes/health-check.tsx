import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { API_BASE_URL } from '../api/client';

interface healthCheckData {
  backend: string;
  database: string;
}

const url = API_BASE_URL + '/api/health';

const healthCheckQuery = queryOptions({
  queryKey: ['healthCheck'],
  queryFn: async (): Promise<healthCheckData> => {
    try {
      const response = await fetch(url);
      return (await response.json()) as healthCheckData;
    } catch {
      return { backend: 'Disconnected', database: 'Offline' };
    }
  },
});

export const Route = createFileRoute('/health-check')({
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(healthCheckQuery),
  component: HealthCheck,
});

function HealthCheck() {
  const { data } = useSuspenseQuery(healthCheckQuery);
  return (
    <div>
      <p>Backend Status: {data.backend}</p>
      <p>Database Status: {data.database}</p>

      <h3>Explanation</h3>
      <p>
        <b>Backend</b> is whether or not the frontend can fetch external data.
        <ul>
          <li>Ok - The backend is actively responding to fetch requests.</li>
          <li>Offline - The backend is unresponsive to fetch requests.</li>
        </ul>
      </p>

      <p>
        <b>Database</b> in this context refers to the Postgres 17 db instance
        that the backend application communicates with.
        <ul>
          <li>Connected</li>
          <li>Disconnected</li>
          <li>Unreachable</li>
        </ul>
      </p>
    </div>
  );
}
