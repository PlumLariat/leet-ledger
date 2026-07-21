import { createFileRoute } from '@tanstack/react-router'
import ProblemDetails from '../components/problem/ProblemDetails'


export const Route = createFileRoute('/problems/$problemId')({
  component: ProblemDetailPage,
})

function ProblemDetailPage() {
    const { problemId } = Route.useParams()
  return <ProblemDetails problemId={Number(problemId)}/>
}
