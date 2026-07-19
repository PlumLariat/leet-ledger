import { createFileRoute } from '@tanstack/react-router'
import HealthCheck from '../components/HealthCheck'

export const Route = createFileRoute('/health-check')({
  component: RouteComponent,
})

function RouteComponent() {
  return <HealthCheck />
}
