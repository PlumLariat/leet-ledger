import type HealthResponse from "../interfaces/HealthResponseInterface";
import type Problem from "../interfaces/ProblemListInterface" 

const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export async function getHealth(): Promise<HealthResponse> {
    const res = await fetch(`${API_BASE_URL}/api/health/`);
    return res.json() as Promise<HealthResponse>;
}

export async function getProblemList(): Promise<Problem[]> {
    const res = await fetch(`${API_BASE_URL}/api/problems/`);
    return res.json() as Promise<Problem[]>;
}