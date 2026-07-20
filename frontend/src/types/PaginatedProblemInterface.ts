import type Problem from "./ProblemInterface";

export default interface PaginatedProblems {
    count: number,
    next: string | null,
    previous: string | null,
    results: Problem[],
}