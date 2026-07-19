import { createFileRoute } from '@tanstack/react-router'
import UnderConstruction from '../components/UnderConstruction'

export const Route = createFileRoute('/stats')({
  component: RouteComponent,
})

function RouteComponent() {
  return <UnderConstruction routeName='Stats'/>
}
