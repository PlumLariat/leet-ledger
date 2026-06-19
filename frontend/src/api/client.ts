interface HealthResponse {
    status: "ok" | "degraded";
    database: "connected" | "unreachable";
}

const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export async function getHealth(): Promise<HealthResponse> {
    const res = await fetch(`${API_BASE_URL}/api/health/`);
    return res.json() as Promise<HealthResponse>;
}