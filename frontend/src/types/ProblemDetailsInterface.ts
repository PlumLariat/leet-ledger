import type Pattern from "./PatternInterface";

export default interface ProblemDetails {
  problem_no: number;
  title: string;
  difficulty: string;
  patterns: Pattern[];
  platform: string;
  optimal_time_complexity: string;
  optimal_space_complexity: string;
}