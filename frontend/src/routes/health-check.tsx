import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { API_BASE_URL } from "../api/client";

interface healthCheckData {
    status: string;
    database: string;
};

const url = API_BASE_URL + "/api/health"

const healthCheckQuery = queryOptions({
  queryKey: ['healthCheck'],
  queryFn: async (): Promise<healthCheckData> => {
    const response = await fetch(url)
    return (await response.json()) as healthCheckData
  }
});

export const Route = createFileRoute('/health-check')({
  loader: ({ context }) => context.queryClient.ensureQueryData(healthCheckQuery),
  component: HealthCheck,
})

function HealthCheck() {
  const { data } = useSuspenseQuery(healthCheckQuery)
  return(
  <div>
    <p>Database Status: {data.database}</p>
    <p>Connection Status: {data.status}</p>
  </div>
)}
