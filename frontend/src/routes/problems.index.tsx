import { createFileRoute } from '@tanstack/react-router';
import { API_BASE_URL } from '../api/client';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { useState } from 'react';
import ProblemListItem from '../components/ProblemListItem';

import type Paginated from '../types/PaginatedInterface';
import type Problem from '../types/ProblemInterface';
const url = API_BASE_URL + '/api/problems/';

const problemListQuery = (pageUrl: string) => {
  return queryOptions({
    // key is the page url instead of a number. Recall the backend will give
    // an absolute path for previous/next because of DRF pagination.
    queryKey: ['problemList', { pageUrl }],
    queryFn: async (): Promise<Paginated<Problem>> => {
      const response = await fetch(pageUrl);
      if (!response.ok)
        throw new Error(`Failed to fetch problems: ${response.status}`);
      return (await response.json()) as Paginated<Problem>;
    },
  });
};

export const Route = createFileRoute('/problems/')({
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(problemListQuery(url)),
  component: ProblemList,
});

// Renders a paginated listing of all problem. Pagination uses complete urls
// and not something like a page number only.
function ProblemList() {
  // Uses the same url as the one passed to the loader. This allows the
  // useSuspenseQuery to load the cached data instead of a second fetch.
  const [currentURL, setCurrentURL] = useState<string>(url);
  const { data } = useSuspenseQuery(problemListQuery(currentURL));

  return (
    <div>
      <div>Total Results: {data.count}</div>

      <nav>
        <button
          disabled={!data.previous}
          // The && check is only here to satisfy typechecking. Don't remove
          // to try to simplify. Refer to PaginatedProblemInterface.ts
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
            problem_no={problem.problem_no}
            title={problem.title}
          />
        ))}
      </ul>
    </div>
  );
}
