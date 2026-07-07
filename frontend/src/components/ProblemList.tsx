import { useEffect, useState } from "react";
import { getProblemList } from "../api/client";
import type Problem from "../interfaces/ProblemListInterface";


const ProblemList = () => {
  const [problems, setProblems] = useState<Problem[]| null>(null);

  useEffect(() => {
    getProblemList()
      .then(setProblems)
      .catch(() => setProblems(null))
  }, []);
  if (!problems){
    return <div>Querying backend for problems...</div>
  }
  return (
    <div>
      {problems.map((problem) => (
        <div key={problem.id}>
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
      ))}
    </div>
  );
};

export default ProblemList;