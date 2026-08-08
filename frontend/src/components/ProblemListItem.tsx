// Renders a row in a problems list. Only uses fields for a summary view.
// Each list item has a link to the full problem description. Make sure to
// render this within an ordered/unordered list for valid html.

import { Link } from '@tanstack/react-router';
import type Problem from '../types/ProblemInterface';

// This component only renders a subset of Problem data so we use Pick to
// specify that subset, allowing the Problem interface to be the single source
// of truth.
interface ProblemListItemProps extends Pick<
  Problem,
  'id' | 'problem_no' | 'title'
> {}

const ProblemListItem = ({ id, problem_no, title }: ProblemListItemProps) => {
  return (
    <li>
      <Link
        to="/problems/$problemId"
        params={{
          // tanstack router params are always strings, so the numeric field id
          // must be cast as a string for the link to work properly.
          problemId: String(id),
        }}
      >
        <p>
          {
            // can be null - see ProblemInterface.ts for explanation
            problem_no ?? 'N/A'
          }
          . {title}
        </p>
      </Link>
    </li>
  );
};

export default ProblemListItem;
