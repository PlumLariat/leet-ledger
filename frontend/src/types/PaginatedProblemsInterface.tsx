interface Pattern {
  id: number;
  name: string;
}

interface Problem {
  id: number;
  problem_no: number;
  title: string;
  difficulty: string;
  patterns: Pattern[];
  platform: string;
  optimal_time_complexity: string;
  optimal_space_complexity: string;
}

export default interface PaginatedProblems {
    count: number,
    next: string | null,
    previous: string | null,
    results: Problem[],
}