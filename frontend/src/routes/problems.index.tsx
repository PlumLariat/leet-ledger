import { createFileRoute } from '@tanstack/react-router';
import { API_BASE_URL } from '../api/client';
import type PaginatedProblems from '../types/PaginatedProblemInterface';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { useState } from 'react';
import ProblemListItem from '../components/ProblemListItem';

const url = API_BASE_URL + '/api/problems/';

const problemListQuery = (url: string) => {
  return queryOptions({
    queryKey: ['problemList', { url }],
    queryFn: async (): Promise<PaginatedProblems> => {
      const response = await fetch(url);
      if (!response.ok)
        throw new Error(`Failed to fetch problems: ${response.status}`);
      return (await response.json()) as PaginatedProblems;
    },
  });
};

export const Route = createFileRoute('/problems/')({
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(problemListQuery(url)),
  component: ProblemList,
});

function ProblemList() {
  const [currentURL, setCurrentURL] = useState<string>(url);
  const { data } = useSuspenseQuery(problemListQuery(currentURL));

  return (
    <div>
      <div>Total Results: {data.count ? data.count : 0}</div>

      <nav>
        <button
          disabled={!data.previous}
          onClick={() => data.previous && setCurrentURL(data.previous)}
        >
          Previous
        </button>

        <button
          disabled={!data.next}
          onClick={() => data.next && setCurrentURL(data.next)}
        >
          Next
        </button>
      </nav>

      <ul>
        {data.results.map((problem) => (
          <ProblemListItem
            key={problem.id}
            id={problem.id}
            problemNumber={problem.problem_no}
            problemTitle={problem.title}
          />
        ))}
      </ul>
    </div>
  );
}
