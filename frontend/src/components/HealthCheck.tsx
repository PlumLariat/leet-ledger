import { useEffect, useState } from "react";
import { getHealth } from "../api/client";

const HealthCheck = () => {
    const [health, setHealth] = useState<{status: string; database: string } | null>(null);

    useEffect(() => {
        getHealth()
            .then(setHealth)
            .catch(() => setHealth({ status: "unreachable", "database" : "unreachable"}));
    }, []);

    if (!health) {
        return <div>Querying backend...</div>
    }
    return (
        <div>
            <p>Backend Status: {health.status}</p>
            <p>Database Status: {health.database}</p>
        </div>
    )
}

export default HealthCheck;