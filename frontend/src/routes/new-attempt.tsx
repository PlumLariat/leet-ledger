import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/new-attempt')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/new-attempt"!</div>
}
