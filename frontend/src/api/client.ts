// client.ts

// Constant that represents the backend url for use in forming fetch requests,
// append to this string to access other backend endpoints.
export const API_BASE_URL: string =
  // Try to import an environmental variable located in roots .env first.
  import.meta.env.VITE_API_BASE_URL ||
  // If that doesn't exist, fall back to local dev backend at port 8000.
  'http://localhost:8000';
