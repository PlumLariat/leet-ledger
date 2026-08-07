import type Pattern from './PatternInterface';

// Base interface for Problem as returned by the backend. Use directly for
// fully detailed components, extend the type for narrower prop shapes with
// Pick (typescript utilities) instead of recreating interfaces.

export default interface Problem {
  // Unique pk django assigned integer ID.
  id: number;

  // Leet code problem number eg. 9 - Palindrome Number.
  // Null is allowed to accommodate for platforms that do not number problems.
  problem_no: number | null;

  // Title for a problem in leet code, this is required on the backend.
  title: string;

  // Difficulty of problem.
  difficulty: "Easy" | "Medium" | "Hard";

  // See PatternInterface.ts (no patterns is empty list []).
  patterns: Pattern[];

  // Where the problem came from "LeetCode", "NeetCode".
  // Defaults to "LeetCode" if nothing is provided.
  platform: string;

  // Big-O notation for time complexity of the problem as list by hosting site.
  optimal_time_complexity: string;
  
  // Same as above but for space complexity (both null is the empty string).
  optimal_space_complexity: string;
}
