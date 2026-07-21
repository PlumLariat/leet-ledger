import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../api/client";

import type ProblemDetail from "../../types/ProblemDetailsInterface"

const PROBLEM_DETAIL_URL = API_BASE_URL + '/api/problems/';

interface problemDetailProps {
  problemId : number;
}

const ProblemDetails = ({problemId} : problemDetailProps) => {
  const [problem, setProblem] = useState<ProblemDetail | null>(null);

    useEffect(() => {

    const fetchProblems = async () => {
      try {
        const response = await fetch(`${PROBLEM_DETAIL_URL}${problemId}`);
        if (!response.ok) throw new Error('Error in Problems fetch...');
        const json: ProblemDetail = await response.json();
        setProblem(json);
      } catch (error) {
        setProblem(null);
      }
    };

    fetchProblems();
  }, [problemId]);

    if (!problem) {
      return <div>Querying backend for problem</div>
    }

    return(
        <div>
          <h3>
            {problem.problem_no}. {problem.title}
          </h3>
          <p>Difficulty: {problem.difficulty}</p>
          <p>
            Patterns: {problem.patterns.map((pattern) => pattern.name).join(", ")}
          </p>
          <p>Platform: {problem.platform}</p>
          <p>
            Optimal: {problem.optimal_time_complexity} time / {problem.optimal_space_complexity} space
          </p>
        </div>
    );
}

export default ProblemDetails;