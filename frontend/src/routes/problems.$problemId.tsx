import { createFileRoute, useLoaderData } from '@tanstack/react-router';
import { API_BASE_URL } from '../api/client';
import type ProblemDetails from '../types/ProblemDetailsInterface';
import { queryOptions } from '@tanstack/react-query';

const PROBLEM_DETAIL_URL = API_BASE_URL + '/api/problems/';

const problemDetailQuery = (problemId: string) => {
  return queryOptions({
    queryKey: [`problem${problemId}`],
    queryFn: async (): Promise<ProblemDetails> => {
      const response = await fetch(`${PROBLEM_DETAIL_URL}${problemId}`);
      if (!response.ok)
        throw new Error(
          `Failed to fetch details for problem: ${response.status}`,
        );
      return (await response.json()) as ProblemDetails;
    },
  });
};

export const Route = createFileRoute('/problems/$problemId')({
  loader: ({ context, params }) =>
    context.queryClient.ensureQueryData(problemDetailQuery(params.problemId)),
  component: ProblemDetailPage,
});

function ProblemDetailPage() {
  const details: ProblemDetails = Route.useLoaderData();
  return (
    <div>
      <h3>
        {details.problem_no}. {details.title}
      </h3>
      <p>Difficulty: {details.difficulty}</p>
      <p>
        Patterns: {details.patterns.map((pattern) => pattern.name).join(', ')}
      </p>
      <p>Platform: {details.platform}</p>
      <p>
        Optimal: {details.optimal_time_complexity} time/{' '}
        {details.optimal_space_complexity} space
      </p>
    </div>
  );
}
