export default interface HealthResponse {
    status: "ok" | "degraded";
    database: "connected" | "unreachable";
}