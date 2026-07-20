type listItemInfo = {
    id: number;
    problemNumber: number | null;
    problemTitle: string | null;    
}

const ProblemListItem = ({id, problemNumber, problemTitle} : listItemInfo) => {
 return(
    <li>
        <div>
            <p>{problemNumber ?? "N/A"}. {problemTitle ?? "N/A"}</p>
        </div>
    </li>
 );   
}

export default ProblemListItem