/*
    {
        "id": 13,
        "problem_no": 11,
        "title": "Container With Most Water",
        "difficulty": "Medium",
        "patterns": [
            {
                "id": 20,
                "name": "Two pointer"
            }
        ],
        "platform": "LeetCode",
        "optimal_time_complexity": "O(n)",
        "optimal_space_complexity": "O(1)"
    },
*/
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

const placeholder: Problem[] = [
  {
    id: 13,
    problem_no: 11,
    title: "Container With Most Water",
    difficulty: "Medium",
    patterns: [{ id: 20, name: "Two pointer" }],
    platform: "LeetCode",
    optimal_time_complexity: "O(n)",
    optimal_space_complexity: "O(1)",
  },
];

const ProblemList = () => {
  return (
    <div>
      {placeholder.map((problem) => (
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