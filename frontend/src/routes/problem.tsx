import { createFileRoute } from '@tanstack/react-router'
import ProblemList from '../components/ProblemList'


export const Route = createFileRoute('/problem')({
  component: RouteComponent,
})

function RouteComponent() {
  return <ProblemList />
}
