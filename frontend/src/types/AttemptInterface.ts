import type Problem from "./ProblemInterface";

export default interface Attempt {
  id: number;
  problem: Problem;
  date: string;
  hints_used: number;
  my_time_complexity: string;
  my_space_complexity: string;
  time_taken: string;
  status: "AC" | "WA" | "TLE" | "MLE" | "DNF";
  next_review: string | null;
  times_reviewed: number;
  notes: string;
}