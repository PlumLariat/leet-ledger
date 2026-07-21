import { Link } from '@tanstack/react-router'

type listItemInfo = {
    id: number;
    problemNumber: number | null;
    problemTitle: string | null;    
}

const ProblemListItem = ({id, problemNumber, problemTitle} : listItemInfo) => {
 return(
    <li>
        <div>
            <Link
                to="/problems/$problemId"
                params={{problemId: String(id)}}
            >
                <p>{problemNumber ?? "N/A"}. {problemTitle ?? "N/A"}</p>
            </Link>
        </div>
    </li>
 );   
}

export default ProblemListItem