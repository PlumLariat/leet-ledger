import { useEffect, useState } from "react";
import type PaginatedProblems from "../../types/PaginatedProblemInterface";
import { API_BASE_URL } from "../../api/client";
import ProblemListItem from "./ProblemListItem";

const PROBLEM_URL = API_BASE_URL + '/api/problems/';

const ProblemList = () => {
  const [problems, setProblems] = useState<PaginatedProblems | null>(null);
  const [currentURL, setCurrentURL] = useState<string>(PROBLEM_URL);

  useEffect(() => {

    const fetchProblems = async () => {
      try {
        const response = await fetch(currentURL);
        if (!response.ok) throw new Error('Error in Problems fetch...');
        const json: PaginatedProblems = await response.json();
        setProblems(json);
      } catch (error) {
        setCurrentURL(PROBLEM_URL);
        setProblems(null);
      }
    };

    fetchProblems();
  }, [currentURL]);

  if (!problems){
    return <div>Querying backend for problems...</div>
  }

  return (
    <div>
      
      <div>
        Total Results: {problems.count ? problems.count : 0}
      </div>

      <div>
        {problems && problems.previous && (
          <button onClick={() => {
              if (problems.previous)
              setCurrentURL(problems.previous)
            }
          }>
            Previous
          </button> 
        )}

        {problems && problems.next && (
          <button onClick={() => {
            if (problems.next)
              setCurrentURL(problems.next)
          }}>
            Next
          </button>
        )}
      </div>

      {problems && problems.results.map((problem) => (
        <ProblemListItem
          id={problem.id}
          problemNumber={problem.problem_no}
          problemTitle={problem.title}
        />
      ))}


    </div>
  );
};

export default ProblemList;