import { createFileRoute, useParams } from '@tanstack/react-router';
import { API_BASE_URL } from '../api/client';
import { queryOptions, useQuery } from '@tanstack/react-query';
import type Problem from '../types/ProblemInterface';
import type Attempt from '../types/AttemptInterface';

const PROBLEM_URL = API_BASE_URL + '/api/problems/';
const ATTEMPTS_URL = API_BASE_URL + '/api/attempts/';

const problemDetailQuery = (problemId: string) => {
  return queryOptions({
    queryKey: [`problem${problemId}`],
    queryFn: async (): Promise<Problem> => {
      const response = await fetch(`${PROBLEM_URL}${problemId}`);
      if (!response.ok)
        throw new Error(
          `Failed to fetch details for problem: ${response.status}`,
        );
      return (await response.json()) as Problem;
    },
  });
};

interface AttemptDetails {
  count: number;
  next: null | string;
  previous: null | string;
  results: Attempt[];
}

const attemptsQuery = (problemId: string) => {
  return queryOptions({
    queryKey: [`Attempts${problemId}`],
    queryFn: async (): Promise<AttemptDetails> => {
      const response = await fetch(
        `${ATTEMPTS_URL}?problem=${problemId}`,
      );
      if (!response.ok)
        throw new Error(`Failed to fetch attempt details for: ${problemId}`);
      return (await response.json()) as AttemptDetails;
    },
  });
};

export const Route = createFileRoute('/problems/$problemId')({
  loader: ({ context, params }) =>
    context.queryClient.ensureQueryData(problemDetailQuery(params.problemId)),
  component: ProblemDetailPage,
});

function ProblemDetailPage() {
  const frontend_param = useParams({ from: '/problems/$problemId' });
  const details: Problem = Route.useLoaderData();
  const { data: attemptsData } = useQuery(
    attemptsQuery(frontend_param.problemId),
  );

  return (
    <div>
      {/* General Problem Description */}
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

      {/* Attempts Section */}
      <h2>Attempts</h2>
      {/* Example fetch: http://localhost:8000/api/attempts/?problem=44 */}
      <ul>
        {attemptsData?.results?.map((result) => (
          <div key={result.id}>
            <p>Data: {result.date}</p>
            <p>Hints Used: {result.hints_used}</p>

            <p>
              Optimal: {result.my_time_complexity} time/{' '}
              {result.my_space_complexity} space
            </p>
            <p>Time Taken: {result.time_taken}</p>
            <p>Status: {result.status}</p>
            <p>Next Review: {result.next_review}</p>
            <p>Times Reviewed: {result.times_reviewed}</p>
            <p>Notes: {result.notes}</p>
          </div>
        ))}
      </ul>
    </div>
  );
}
