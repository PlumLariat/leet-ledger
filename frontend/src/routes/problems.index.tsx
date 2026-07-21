import { createFileRoute } from '@tanstack/react-router'
import  ProblemList from "../components/problem/ProblemList"


export const Route = createFileRoute('/problems/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <ProblemList />
}
