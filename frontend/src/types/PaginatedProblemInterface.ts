import type Problem from './ProblemInterface';

// The backend gives 10 results per page. Hit the previous and next endpoints
// offered to get to the next page.
export default interface PaginatedProblems {
  // number of results across all pages
  count: number;

  // the string url of the next page of results, if it exists
  next: string | null;

  // the string url of the previous page of results, if it exists
  previous: string | null;

  // A list of Problems, see ProblemInterface.ts
  results: Problem[];
}
