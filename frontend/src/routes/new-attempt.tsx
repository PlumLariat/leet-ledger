import { createFileRoute } from '@tanstack/react-router'
import UnderConstruction from '../components/UnderConstruction'

export const Route = createFileRoute('/new-attempt')({
  component: RouteComponent,
})

function RouteComponent() {
  return <UnderConstruction routeName='New Attempt'/>
}
